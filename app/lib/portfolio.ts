import type { PortfolioImage, PortfolioProject } from '@/app/components/PortfolioGallery';
import { fallbackPortfolioProjects } from '@/app/data/fallbackPortfolio';
import { sanityClient } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { portfolioProjectsQuery } from '@/sanity/lib/queries';

type SanityImage = {
  alt?: string;
  asset?: { _ref: string; _type: string };
};

type SanityPortfolioProject = {
  _id: string;
  title?: string;
  category?: string;
  location?: string;
  mainImage?: SanityImage;
  gallery?: SanityImage[] | null;
};

function isSameProject(left: PortfolioProject, right: PortfolioProject) {
  return left.title === right.title && left.place === right.place;
}

function mapSanityImage(image?: SanityImage): PortfolioImage | null {
  const src = image ? urlFor(image)?.width(1600).quality(80).auto('format').url() : '';
  if (!src) return null;
  return { src, alt: image?.alt?.trim() || undefined };
}

function mapSanityProject(project: SanityPortfolioProject): PortfolioProject | null {
  const title = project.title?.trim();
  const kind = project.category?.trim();
  const place = project.location?.trim();
  const main = mapSanityImage(project.mainImage);

  if (!title || !kind || !place || !main) return null;

  return {
    id: project._id,
    title,
    kind,
    place,
    image: main.src,
    alt: main.alt,
    gallery: (project.gallery ?? []).map(mapSanityImage).filter((image): image is PortfolioImage => image !== null && image.src !== main.src),
  };
}

export function mergePortfolioProjects(published: PortfolioProject[], fallback = fallbackPortfolioProjects) {
  const remainingFallback = fallback.filter(item => !published.some(project => isSameProject(project, item)));
  return [...published, ...remainingFallback];
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  if (!sanityClient) return fallbackPortfolioProjects;

  try {
    const published = await sanityClient.fetch<SanityPortfolioProject[]>(
      portfolioProjectsQuery,
      {},
      { next: { revalidate: 60, tags: ['portfolio'] } },
    );
    return mergePortfolioProjects((published ?? []).map(mapSanityProject).filter((project): project is PortfolioProject => project !== null));
  } catch (error) {
    console.error('Unable to load portfolio projects from Sanity:', error);
    return fallbackPortfolioProjects;
  }
}
