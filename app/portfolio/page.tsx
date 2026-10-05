import Image from 'next/image';
import { ContactBand, PageFrame } from '@/app/components/SiteChrome';

export const metadata = { title: 'Портфолио | Планекс Интериор', description: 'Реализирани интериорни проекти на Планекс Инвест – офиси, жилища и търговски пространства.' };

const projects = [
  { title: 'Офис, кв. Витоша', place: 'София', kind: 'Офис интериор', image: '/images/project-office.jpg' },
  { title: 'Тристаен апартамент', place: 'Варна, център', kind: 'Жилищен интериор', image: '/images/project-varna.jpg' },
  { title: 'Двустаен апартамент', place: 'Варна, кв. Бриз', kind: 'Жилищен интериор', image: '/images/project-briz.jpg' },
  { title: 'Офис КРЗ Одесос АД', place: 'Варна', kind: 'Офис интериор', image: '/images/office-krz.jpg' },
  { title: 'Офис Явлена', place: 'Варна', kind: 'Офис интериор', image: '/images/office-yavlena.jpg' },
  { title: 'Тристаен апартамент', place: 'Варна', kind: 'Жилищен интериор', image: '/images/service-renovation-v2.jpg' },
  { title: 'Еднофамилна къща', place: 'Варна', kind: 'Жилищен интериор', image: '/images/service-concept-editorial.png' },
  { title: 'Двустаен апартамент', place: 'Варна, кв. Бриз', kind: 'Жилищен интериор', image: '/images/service-finishing-editorial.png' },
  { title: 'Двустаен апартамент', place: 'Варна', kind: 'Жилищен интериор', image: '/images/service-renovation-editorial.png' },
  { title: 'Офис', place: 'Варна', kind: 'Офис интериор', image: '/images/office-varna.jpg' },
  { title: 'Апартамент', place: 'Варна', kind: 'Жилищен интериор', image: '/images/service-concept-v2.jpg' },
  { title: 'Двустаен апартамент', place: 'Варна', kind: 'Жилищен интериор', image: '/images/project-briz.jpg' },
  { title: 'Двустаен апартамент', place: 'Варна', kind: 'Жилищен интериор', image: '/images/project-varna.jpg' },
  { title: 'Апартамент', place: 'Варна', kind: 'Жилищен интериор', image: '/images/service-finishing-v2.jpg' },
  { title: 'Тристаен апартамент', place: 'Варна', kind: 'Жилищен интериор', image: '/images/service-renovation-v2.jpg' },
  { title: 'Тристаен апартамент', place: 'Варна', kind: 'Жилищен интериор', image: '/images/project-varna.jpg' },
  { title: 'Апартамент', place: 'Каварна', kind: 'Жилищен интериор', image: '/images/project-briz.jpg' },
  { title: 'Апартамент', place: 'Каварна', kind: 'Жилищен интериор', image: '/images/service-concept-editorial.png' },
];

export default function PortfolioPage() {
  return <PageFrame eyebrow="Избрани реализации" title="Портфолио" intro="Офисни и жилищни интериори, реализирани от екипа на Планекс Инвест.">
    <section className="portfolioPage">
      <div className="portfolioIntro"><p>Всеки проект започва с нуждите на хората, които ще използват пространството. Поемаме цялостното изпълнение или отделни етапи – от интериорната концепция до довършването и обзавеждането.</p><span>{projects.length} проекта</span></div>
      <div className="portfolioGrid">{projects.map((project, index) => <article className="portfolioCard" key={`${project.title}-${project.place}-${index}`}><div className="portfolioImage"><Image src={project.image} alt={`${project.kind}: ${project.title}, ${project.place}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={index < 3}/><span className="portfolioTag">{project.kind}</span></div><div className="portfolioCaption"><h2>{project.title}</h2><span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>{project.place}</span></div></article>)}</div>
    </section>
    <ContactBand />
  </PageFrame>;
}
