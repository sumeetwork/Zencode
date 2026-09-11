import { defineField, defineType } from 'sanity';

// Keep in sync with the filter buttons in app/components/PortfolioGrid.tsx —
// adding a new category there requires a matching code change on the site.
const CATEGORIES = ['Design', 'Development', 'eCommerce', 'SEO & Optimisation', 'AI'];

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the project URL, e.g. /work/your-slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: CATEGORIES.map((c) => ({ title: c, value: c })),
        layout: 'tags',
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Technologies & tools shown on the project page',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short Description',
      description: 'Shown on the portfolio grid card',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullDesc',
      title: 'Full Description',
      description: 'Shown on the project detail page',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Screenshots',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'siteUrl',
      title: 'Live Site URL',
      type: 'url',
    }),
    defineField({
      name: 'siteText',
      title: 'Site Link Text',
      type: 'string',
    }),
    defineField({
      name: 'gridSize',
      title: 'Grid Size',
      type: 'string',
      options: {
        list: [
          { title: 'Large', value: 'large' },
          { title: 'Medium', value: 'medium' },
          { title: 'Small', value: 'small' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      description: 'Lower numbers appear first. Leave gaps (10, 20, 30…) so future reordering is easier.',
      type: 'number',
      initialValue: 999,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'thumbnail' },
  },
});
