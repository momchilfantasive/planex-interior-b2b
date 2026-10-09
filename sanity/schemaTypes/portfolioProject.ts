import { defineField, defineType } from 'sanity';

export const portfolioProject = defineType({
  name: 'portfolioProject',
  title: 'Проект в портфолиото',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Име',
      type: 'string',
      validation: rule => rule.required().min(2),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          { title: 'Жилищен интериор', value: 'Жилищен интериор' },
          { title: 'Офис интериор', value: 'Офис интериор' },
          { title: 'Търговски интериор', value: 'Търговски интериор' },
        ],
        layout: 'radio',
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Локация',
      type: 'string',
      validation: rule => rule.required().min(2),
    }),
    defineField({
      name: 'mainImage',
      title: 'Основна снимка',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt описание',
          type: 'string',
          description: 'Кратко описание на снимката за достъпност и търсачки.',
          validation: rule => rule.required().min(4),
        }),
      ],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Останали снимки',
      type: 'array',
      description: 'Допълнителни снимки от същия проект. Показват се в карусела след основната снимка.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt описание',
              type: 'string',
              description: 'Кратко описание на снимката за достъпност и търсачки.',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Подредба',
      type: 'number',
      description: 'По-малките числа се показват по-напред в /portfolio/.',
      initialValue: 0,
      validation: rule => rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Подредба',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }, { field: '_createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      location: 'location',
      order: 'order',
      media: 'mainImage',
    },
    prepare({ title, category, location, order, media }) {
      return {
        title,
        subtitle: [order != null ? `#${order}` : null, category, location].filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
