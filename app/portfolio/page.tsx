import { ContactBand, PageFrame } from '@/app/components/SiteChrome';
import PortfolioGallery from '@/app/components/PortfolioGallery';

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
      <PortfolioGallery projects={projects} />
    </section>
    <ContactBand />
  </PageFrame>;
}
