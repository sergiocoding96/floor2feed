import { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { Container } from "@/components/layout/container";
import { BlogHero, BlogList } from "@/components/blog";
import type { Post } from "@/payload-types";

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

export const dynamic = "force-dynamic";

async function getPosts(): Promise<Post[]> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "posts",
      where: {
        status: {
          equals: "published",
        },
      },
      sort: "-publishedAt",
      limit: 50,
      depth: 2,
    });

    return result.docs as Post[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white">
      <BlogHero />
      <section className="py-16">
        <Container>
          <BlogList posts={posts} />
        </Container>
      </section>
    </main>
  );
}
