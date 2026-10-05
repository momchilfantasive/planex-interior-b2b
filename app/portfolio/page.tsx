import Image from 'next/image';
import { ContactBand, PageFrame } from '@/app/components/SiteChrome';

export const metadata = { title: 'Портфолио | Планекс Интериор', description: 'Реализирани интериорни проекти на Планекс Инвест – офиси, жилища и търговски пространства.' };

const projects = [
  { title: 'Офис, кв. Витоша', place: 'София', kind: 'Офис интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/titul-ofis-sofiya__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Тристаен апартамент', place: 'Варна, център', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/1-v2__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Двустаен апартамент', place: 'Варна, кв. Бриз', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/DSC_1246__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Офис КРЗ Одесос АД', place: 'Варна', kind: 'Офис интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/PJP_9038_39_40_q__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Офис Явлена', place: 'Варна', kind: 'Офис интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/PJP_9125_6_7_q__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Тристаен апартамент', place: 'Варна', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/s21-1-2-lead__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Еднофамилна къща', place: 'Варна', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/Oreshak-1__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Двустаен апартамент', place: 'Варна, кв. Бриз', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/PJP_8936_7_8111__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Двустаен апартамент', place: 'Варна', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/PJP_9011_2_3_q__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Офис', place: 'Варна', kind: 'Офис интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/PJP_9116_7_8_q__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Апартамент', place: 'Варна', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/BR4A2904_5_6_fused_resize_q__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Двустаен апартамент', place: 'Варна', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/4_1_q__FillMaxWzc3MCw4MDBd.jpeg' },
  { title: 'Двустаен апартамент', place: 'Варна', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/5_5_q__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Апартамент', place: 'Варна', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/4_q__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Тристаен апартамент', place: 'Варна', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/3_1_q__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Тристаен апартамент', place: 'Варна', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/2_2_q__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Апартамент', place: 'Каварна', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/IMG_1312_q__FillMaxWzc3MCw4MDBd.jpg' },
  { title: 'Апартамент', place: 'Каварна', kind: 'Жилищен интериор', image: 'https://planexinterior.bg/assets/Uploads/projects/IMG_1194_q__FillMaxWzc3MCw4MDBd.jpg' },
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
