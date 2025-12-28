import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BlogHero, BlogList } from "@/components/blog";
import { getAllPosts } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "Blog | Floor2Feed - Real Estate Marketing Insights",
  description:
    "Expert strategies, AI innovations, and proven tactics to transform your property marketing and accelerate sales.",
  openGraph: {
    title: "Blog | Floor2Feed",
    description:
      "Expert strategies and AI innovations for real estate marketing.",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  // Serialize posts for client component (remove content function)
  const serializedPosts = posts.map((post) => ({
    slug: post.slug,
    entry: {
      title: post.entry.title,
      excerpt: post.entry.excerpt,
      featuredImage: post.entry.featuredImage,
      publishedAt: post.entry.publishedAt,
      readTime: post.entry.readTime,
      category: post.entry.category,
    },
  }));

  return (
    <main className="min-h-screen bg-white">
      <BlogHero />
      <section className="py-16">
        <Container>
          <BlogList posts={serializedPosts} />
        </Container>
      </section>
    </main>
  );
}
