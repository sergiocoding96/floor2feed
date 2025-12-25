import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { BlogHero, BlogList } from '@/components/blog'
import type { Post, Media, Author, Category } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Blog | Floor2Feed',
  description:
    'Insights on real estate marketing, AI technology, and strategies for Spanish developers to stand out in a competitive market.',
  openGraph: {
    title: 'Blog | Floor2Feed',
    description:
      'Insights on real estate marketing, AI technology, and strategies for Spanish developers.',
    type: 'website',
  },
}

type PostWithRelations = Post & {
  featuredImage: Media
  author: Author
  categories?: Category[]
}

async function getPosts(): Promise<PostWithRelations[]> {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    depth: 2,
  })

  return docs as PostWithRelations[]
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Floor2Feed Blog',
            description:
              'Insights on real estate marketing and AI technology for Spanish developers.',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
            publisher: {
              '@type': 'Organization',
              name: 'Floor2Feed',
              logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
              },
            },
          }),
        }}
      />

      <BlogHero />

      <section className="py-16 md:py-24 bg-pearl">
        <div className="container mx-auto px-4">
          <BlogList posts={posts} />
        </div>
      </section>
    </main>
  )
}
