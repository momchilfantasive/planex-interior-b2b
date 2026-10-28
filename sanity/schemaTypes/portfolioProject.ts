import { defineField, defineType } from 'sanity';
import { apiVersion } from '../env';

export const portfolioProject = defineType({
  name: 'portfolioProject',
  title: 'Проект в портфолиото',
  type: 'document',
  fieldsets: [{ name: 'homepage', title: 'Показване на началната страница', options: { collapsible: true, collapsed: false } }],
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
    defineField({
      name: 'showOnHomeHomes',
      title: 'Домове с индивидуален характер и цялостно изпълнение',
      type: 'boolean',
      description: 'Показва проекта в жилищната секция на началната страница. Максимум два проекта.',
      initialValue: false,
      fieldset: 'homepage',
      validation: rule => rule.custom(async (value, context) => {
        if (!value) return true;
        if (context.document?.category !== 'Жилищен интериор') {
          return 'Тази секция е предназначена за проекти с категория „Жилищен интериор“.';
        }
        const id = context.document?._id;
        if (!id) return true;
        const publishedId = id.replace(/^drafts\./, '');
        const draftId = `drafts.${publishedId}`;
        const client = context.getClient({ apiVersion });
        const selectedCount = await client.fetch<number>(
          '*[_type == "portfolioProject" && showOnHomeHomes == true && _id != $publishedId && _id != $draftId] | count',
          { publishedId, draftId },
        );
        return selectedCount < 2 || 'На началната страница могат да се изберат най-много два жилищни проекта.';
      }),
    }),
    defineField({
      name: 'showOnHomeBusiness',
      title: 'Офиси и търговски площи с цялостна реализация',
      type: 'boolean',
      description: 'Показва проекта в секцията за офиси и търговски площи на началната страница.',
      initialValue: false,
      fieldset: 'homepage',
      validation: rule => rule.custom((value, context) => {
        if (!value) return true;
        return ['Офис интериор', 'Търговски интериор'].includes(String(context.document?.category))
          || 'Тази секция е предназначена за офисни и търговски проекти.';
      }),
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
