import { ContactBand, PageFrame } from '@/app/components/SiteChrome';

export const metadata = { title: 'Контакти | Планекс Интериор', description: 'Свържете се с екипа на Планекс Инвест във Варна и София.' };

const offices = [
  { city: 'Варна', phones: [['088 749 9888', 'tel:+359887499888'], ['052 600 936', 'tel:+35952600936']], email: 'interior@planexinvest.bg' },
  { city: 'София', phones: [['088 247 3433', 'tel:+359882473433'], ['02 958 1001', 'tel:+35929581001']], email: 'interiorsofia@planexinvest.bg' },
];

export default function ContactPage() {
  return <PageFrame eyebrow="Контакти" title="Обсъдете проекта си с нашия екип" intro="Свържете се с офис във Варна или София. Работим от понеделник до петък, 08:30–17:30.">
    <section className="contactPageGrid">{offices.map(office => <article className="contactOffice" key={office.city}><p className="kicker">Офис</p><h2>{office.city}</h2><div>{office.phones.map(([text, href]) => <a href={href} key={href}>{text}</a>)}</div><a href={`mailto:${office.email}`}>{office.email}</a><span>Понеделник–петък · 08:30–17:30</span></article>)}</section>
    <ContactBand />
  </PageFrame>;
}
