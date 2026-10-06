import { ContactBand, SiteFooter, SiteHeader } from '@/app/components/SiteChrome';
import PortfolioGallery from '@/app/components/PortfolioGallery';
import { getPortfolioProjects } from '@/app/lib/portfolio';

export const metadata = { title: 'Портфолио | Планекс Интериор', description: 'Реализирани интериорни проекти на Планекс Инвест – офиси, жилища и търговски пространства.' };
export const revalidate = 60;

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return <main className="innerPage">
    <SiteHeader />
    <section className="portfolioPage" aria-labelledby="portfolio-title">
      <div className="portfolioIntro"><h1 id="portfolio-title">Портфолио</h1><p>Всеки проект започва с нуждите на хората, които ще използват пространството. Поемаме цялостното изпълнение или отделни етапи – от интериорната концепция до довършването и обзавеждането.</p></div>
      <PortfolioGallery projects={projects} />
    </section>
    <ContactBand />
    <SiteFooter />
  </main>;
}
