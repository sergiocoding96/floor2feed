import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

export const reader = createReader(process.cwd(), config);

export async function getAllPosts() {
  const posts = await reader.collections.posts.all();
  return posts
    .filter((post) => post.entry.status === 'published')
    .sort((a, b) => {
      const dateA = new Date(a.entry.publishedAt || '').getTime();
      const dateB = new Date(b.entry.publishedAt || '').getTime();
      return dateB - dateA;
    });
}

export async function getPostBySlug(slug: string) {
  const post = await reader.collections.posts.read(slug);
  return post;
}

export async function getAllCategories() {
  return reader.collections.categories.all();
}

export async function getCategoryBySlug(slug: string) {
  return reader.collections.categories.read(slug);
}

export async function getAllAuthors() {
  return reader.collections.authors.all();
}

export async function getAuthorBySlug(slug: string) {
  return reader.collections.authors.read(slug);
}

export async function getPostsByCategory(categorySlug: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.entry.category === categorySlug);
}

export async function getPostsByTag(tag: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.entry.tags?.includes(tag));
}
