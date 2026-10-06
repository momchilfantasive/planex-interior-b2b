import { defineQuery } from 'next-sanity';

export const portfolioProjectsQuery = defineQuery(`
  *[_type == "portfolioProject" && defined(title) && defined(category) && defined(location) && defined(mainImage.asset)]
    | order(order asc, _createdAt desc) {
      _id,
      title,
      category,
      location,
      order,
      mainImage,
      gallery
    }
`);
