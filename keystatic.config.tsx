import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'Short description for previews (max 300 characters)',
          multiline: true,
          validation: { length: { max: 300 } },
        }),
        publishedAt: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' },
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        featuredImage: fields.image({
          label: 'Featured Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        author: fields.relationship({
          label: 'Author',
          collection: 'authors',
        }),
        category: fields.relationship({
          label: 'Category',
          collection: 'categories',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value || 'New Tag',
          }
        ),
        readTime: fields.integer({
          label: 'Read Time (minutes)',
          defaultValue: 5,
          validation: { min: 1, max: 60 },
        }),
        seo: fields.object({
          metaTitle: fields.text({
            label: 'SEO Title',
            description: 'Max 60 characters',
            validation: { length: { max: 60 } },
          }),
          metaDescription: fields.text({
            label: 'SEO Description',
            description: 'Max 160 characters',
            multiline: true,
            validation: { length: { max: 160 } },
          }),
          ogImage: fields.image({
            label: 'Open Graph Image',
            directory: 'public/images/blog/og',
            publicPath: '/images/blog/og/',
          }),
        }),
        content: fields.mdx({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
          },
        }),
      },
    }),
    categories: collection({
      label: 'Categories',
      slugField: 'name',
      path: 'content/categories/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        color: fields.text({
          label: 'Color',
          description: 'Hex color code (e.g., #D4A574)',
          defaultValue: '#D4A574',
        }),
      },
    }),
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'content/authors/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role' }),
        bio: fields.text({
          label: 'Bio',
          multiline: true,
        }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/images/authors',
          publicPath: '/images/authors/',
        }),
        social: fields.object({
          twitter: fields.text({ label: 'Twitter URL' }),
          linkedin: fields.text({ label: 'LinkedIn URL' }),
          website: fields.text({ label: 'Website URL' }),
        }),
      },
    }),
  },
});
