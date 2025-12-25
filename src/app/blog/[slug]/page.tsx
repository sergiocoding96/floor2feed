import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { RichText, BlogAuthor, ShareButtons, RelatedPosts } from '@/components/blog'
import type { Post, Media, Author, Category } from '@/payload-types'

type PostWithRelations = Post & {
  featuredImage: Media
  author: Author & { avatar?: Media | null }
  categories?: Category[]
}

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<PostWithRelations | null> {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2,
    limit: 1,
  })

  return (docs[0] as PostWithRelations) || null
}

async function getRelatedPosts(
  currentId: string,
  categoryIds: string[]
): Promise<PostWithRelations[]> {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { id: { not_equals: currentId } },
        { status: { equals: 'published' } },
        ...(categoryIds.length > 0
          ? [{ categories: { in: categoryIds } }]
          : []),
      ],
    },
    sort: '-publishedAt',
    depth: 2,
    limit: 3,
  })

  return docs as PostWithRelations[]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Floor2Feed',
    }
  }

  const ogImage = post.meta?.ogImage || post.featuredImage

  return {
    title: post.meta?.title || `${post.title} | Floor2Feed`,
    description: post.meta?.description || post.excerpt,
    keywords: post.meta?.keywords?.split(',').map((k) => k.trim()),
    openGraph: {
      title: post.meta?.title || post.title,
      description: post.meta?.description || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      authors: [post.author.name],
      images: ogImage && typeof ogImage !== 'string' ? [ogImage.url || ''] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta?.title || post.title,
      description: post.meta?.description || post.excerpt,
    },
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
    },
    limit: 100,
  })

  return docs.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const categoryIds = post.categories?.map((c) => c.id) || []
  const relatedPosts = await getRelatedPosts(post.id, categoryIds)

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`

  return (
    <main>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.featuredImage?.url,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            author: {
              '@type': 'Person',
              name: post.author.name,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Floor2Feed',
              logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': postUrl,
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-midnight py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <span
                  key={category.id}
                  className="px-3 py-1 text-xs font-medium rounded-full text-white"
                  style={{ backgroundColor: category.color || '#D4A574' }}
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            <div className="flex items-center gap-3">
              {post.author.avatar &&
                typeof post.author.avatar !== 'string' &&
                post.author.avatar.url && (
                  <Image
                    src={post.author.avatar.url}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
              <span className="text-white">{post.author.name}</span>
            </div>

            {publishedDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {publishedDate}
              </span>
            )}

            {post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative -mt-8 mb-12">
          <div className="container mx-auto px-4">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={post.featuredImage.url || ''}
                alt={post.featuredImage.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Share Buttons */}
            <div className="mb-8 pb-8 border-b border-silver">
              <ShareButtons url={postUrl} title={post.title} />
            </div>

            {/* Rich Text Content */}
            <RichText data={post.content} />

            {/* Author Card */}
            <div className="mt-12 pt-12 border-t border-silver">
              <BlogAuthor author={post.author} />
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />
    </main>
  )
}
