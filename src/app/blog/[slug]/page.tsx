import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { MDXContent, ShareButtons } from "@/components/blog";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { reader, getAllPosts, getAuthorBySlug, getCategoryBySlug } from "@/lib/keystatic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post) {
    return {
      title: "Post Not Found | Floor2Feed",
    };
  }

  const seoTitle = post.seo?.metaTitle || post.title;
  const seoDescription = post.seo?.metaDescription || post.excerpt;
  const ogImage = post.seo?.ogImage || post.featuredImage;

  return {
    title: `${seoTitle} | Floor2Feed Blog`,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription || undefined,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription || undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  // Get related data
  const category = post.category ? await getCategoryBySlug(post.category) : null;
  const author = post.author ? await getAuthorBySlug(post.author) : null;

  // Get MDX content - Keystatic returns raw MDX string
  const mdxContent = await post.content();

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://floor2feed.com";
  const postUrl = `${siteUrl}/blog/${slug}`;

  const categoryName = category?.name
    ? category.name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : null;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-pearl to-white">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-midnight/60 hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {categoryName && (
            <span className="inline-block px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">
              {categoryName}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight mb-6 max-w-4xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-midnight/60 mb-8">
            {formattedDate && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
            )}
          </div>

          <ShareButtons url={postUrl} title={post.title} />
        </Container>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="pb-8">
          <Container>
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Container>
        </section>
      )}

      {/* Content */}
      <section className="py-8 md:py-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            <MDXContent source={mdxContent} />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-silver">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-silver/50 text-midnight/70 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author */}
            {author && (
              <div className="mt-12 p-6 bg-pearl/50 rounded-xl">
                <h3 className="text-sm font-medium text-midnight/60 mb-4">
                  Written by
                </h3>
                <div className="flex items-center gap-4">
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-midnight">{author.name}</p>
                    {author.role && (
                      <p className="text-sm text-midnight/60">{author.role}</p>
                    )}
                  </div>
                </div>
                {author.bio && (
                  <p className="mt-4 text-midnight/70 text-sm">{author.bio}</p>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
