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

export const homepageHomesQuery = defineQuery(`
  *[_type == "portfolioProject" && showOnHomeHomes == true && category == "Жилищен интериор"]
    | order(order asc, _createdAt desc)[0...2] {
      _id,
      title,
      location,
      mainImage
    }
`);

export const homepageBusinessProjectsQuery = defineQuery(`
  *[_type == "portfolioProject" && showOnHomeBusiness == true && category in ["Офис интериор", "Търговски интериор"]]
    | order(order asc, _createdAt desc) {
      _id,
      title,
      location,
      mainImage
    }
`);
