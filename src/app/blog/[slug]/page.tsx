import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";
import { Container } from "@/components/layout/container";
import { BlogAuthor, RichText, ShareButtons, RelatedPosts } from "@/components/blog";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Post, Media, Category, Author } from "@/payload-types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "posts",
      where: {
        slug: { equals: slug },
        status: { equals: "published" },
      },
      depth: 2,
      limit: 1,
    });

    return result.docs[0] as Post | null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function getRelatedPosts(categoryId: string, currentPostId: string): Promise<Post[]> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "posts",
      where: {
        and: [
          { category: { equals: categoryId } },
          { id: { not_equals: currentPostId } },
          { status: { equals: "published" } },
        ],
      },
      limit: 3,
      depth: 2,
    });

    return result.docs as Post[];
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Floor2Feed",
    };
  }

  const featuredImage = post.featuredImage as Media | undefined;
  const seoTitle = post.seo?.metaTitle || post.title;
  const seoDescription = post.seo?.metaDescription || post.excerpt;
  const ogImage = (post.seo?.ogImage as Media)?.url || featuredImage?.url;

  return {
    title: `${seoTitle} | Floor2Feed Blog`,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = post.featuredImage as Media | undefined;
  const category = post.category as Category | undefined;
  const author = post.author as Author | undefined;
  const categoryId = typeof post.category === "string" ? post.category : post.category?.id;

  const relatedPosts = categoryId ? await getRelatedPosts(categoryId, post.id) : [];

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://floor2feed.com";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

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

          {category && (
            <span className="inline-block px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">
              {category.name}
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
      {featuredImage?.url && (
        <section className="pb-8">
          <Container>
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt || post.title}
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
            <RichText content={post.content} />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-silver">
                {post.tags.map(
                  (tagItem, index) =>
                    tagItem.tag && (
                      <span
                        key={index}
                        className="px-3 py-1 bg-silver/50 text-midnight/70 text-sm rounded-full"
                      >
                        #{tagItem.tag}
                      </span>
                    )
                )}
              </div>
            )}

            {/* Author */}
            {author && (
              <div className="mt-12">
                <h3 className="text-sm font-medium text-midnight/60 mb-4">
                  Written by
                </h3>
                <BlogAuthor author={author} />
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-8 md:py-12 bg-pearl/50">
          <Container>
            <RelatedPosts posts={relatedPosts} />
          </Container>
        </section>
      )}
    </main>
  );
}
