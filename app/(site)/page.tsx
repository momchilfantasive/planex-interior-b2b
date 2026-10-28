import HomePageContent from '@/app/components/HomePageContent';
import { getHomepageProjects } from '@/app/lib/homepage';

export default async function Home() {
  const projects = await getHomepageProjects();
  return <HomePageContent homes={projects.homes} offices={projects.offices} />;
}
