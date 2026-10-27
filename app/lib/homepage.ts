import type { HomePageProject } from '@/app/components/HomePageContent';
import { sanityClient } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { homepageBusinessProjectsQuery, homepageHomesQuery } from '@/sanity/lib/queries';

const fallbackHomes: HomePageProject[] = [
  { id: 'fallback-home-varna-center', image: '/images/project-varna.jpg', title: 'Тристаен апартамент', place: 'Варна, център' },
  { id: 'fallback-home-varna-briz', image: '/images/service-renovation-v2.jpg', title: 'Двустаен апартамент', place: 'Варна, кв. Бриз' },
];

const fallbackOffices: HomePageProject[] = [
  { id: 'fallback-office-vitosha', image: '/images/project-office.jpg', title: 'Офис, кв. Витоша', place: 'София' },
  { id: 'fallback-office-krz', image: '/images/office-krz.jpg', title: 'Офис КРЗ Одесос АД', place: 'Варна' },
  { id: 'fallback-office-yavlena', image: '/images/office-yavlena.jpg', title: 'Офис Явлена', place: 'Варна' },
  { id: 'fallback-office-corporate', image: '/images/office-varna.jpg', title: 'Корпоративен офис', place: 'Варна' },
];

type SanityHomepageProject = {
  _id: string;
  title?: string;
  location?: string;
  mainImage?: { asset?: { _ref: string; _type: string } };
};

function mapHomepageProject(project: SanityHomepageProject): HomePageProject | null {
  const image = project.mainImage ? urlFor(project.mainImage).width(1600).quality(80).auto('format').url() : '';
  if (!project.title?.trim() || !project.location?.trim() || !image) return null;
  return { id: project._id, image, title: project.title.trim(), place: project.location.trim() };
}

export async function getHomepageProjects() {
  if (!sanityClient) return { homes: fallbackHomes, offices: fallbackOffices };

  try {
    const options = { next: { revalidate: 60, tags: ['portfolio'] } };
    const [homes, offices] = await Promise.all([
      sanityClient.fetch<SanityHomepageProject[]>(homepageHomesQuery, {}, options),
      sanityClient.fetch<SanityHomepageProject[]>(homepageBusinessProjectsQuery, {}, options),
    ]);
    return {
      homes: homes.map(mapHomepageProject).filter((project): project is HomePageProject => project !== null),
      offices: offices.map(mapHomepageProject).filter((project): project is HomePageProject => project !== null),
    };
  } catch (error) {
    console.error('Unable to load homepage projects from Sanity:', error);
    return { homes: fallbackHomes, offices: fallbackOffices };
  }
}
