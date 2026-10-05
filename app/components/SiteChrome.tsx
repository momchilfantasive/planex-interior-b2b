import Image from 'next/image';
import Link from 'next/link';

const links = [
  ['За нас', '/za-nas/'],
  ['Интериорна концепция', '/uslugi/interiorna-kontseptsiya/'],
  ['Довършителни работи', '/uslugi/dovrshitelni-raboti/'],
  ['Ремонтни дейности', '/uslugi/remontni-deynosti/'],
  ['Портфолио', '/portfolio/'],
  ['Контакти', '/kontakti/'],
];

export function SiteHeader() {
  return <header className="siteHeader">
    <Link className="brand" href="/" aria-label="Planex Interior – Начало"><Image src="/planex-interior-logo-approved.svg" alt="Planex Interior" width={827} height={229} priority /></Link>
    <nav aria-label="Основна навигация">{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
    <Link className="navCta" href="/#contact">Изпратете запитване</Link>
  </header>;
}

export function SiteFooter() {
  return <footer className="siteFooter">
    <div className="footerTop"><div><p className="kicker">Планекс Инвест</p><h2>Пространства, създадени да работят за вас.</h2></div><Link className="pill" href="/#contact">Обсъдете проекта <span aria-hidden="true">↗</span></Link></div>
    <nav className="footerNav" aria-label="Навигация във футъра">{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
    <div className="groupLinks"><a href="https://realtyplanex.com/">Продажба на имоти</a><a href="https://plhome.net/">Поддръжка на сгради</a><a href="https://myvacation.bg/">Ваканция на море в България</a><a href="https://mamaiaz.bg/">Детски център „Мама и аз“</a></div>
    <div className="footerBottom"><Link className="brand footerLogo" href="/" aria-label="Planex Interior – Начало"><Image src="/planex-interior-logo-approved.svg" alt="Planex Interior" width={827} height={229} /></Link><div className="footerContacts"><span>Варна <a href="tel:+359887499888">088 749 9888</a> · <a href="mailto:interior@planexinvest.bg">interior@planexinvest.bg</a></span><span>София <a href="tel:+359882473433">088 247 3433</a> · <a href="mailto:interiorsofia@planexinvest.bg">interiorsofia@planexinvest.bg</a></span></div><p>ISO 9001:2015 · DNV GL<br />© 2026 „Планекс Инвест“ ООД</p></div>
  </footer>;
}

export function PageFrame({ eyebrow, title, intro, children, light = false }: { eyebrow: string; title: string; intro?: string; children: React.ReactNode; light?: boolean }) {
  return <main className="innerPage"><SiteHeader/><section className={`innerHero${light ? ' innerHeroLight' : ''}`}><p className="kicker">{eyebrow}</p><h1>{title}</h1>{intro && <p className="innerLead">{intro}</p>}</section>{children}<SiteFooter/></main>;
}

export function ContactBand() {
  return <section className="contactBand"><div><p className="kicker">Следваща стъпка</p><h2>Разкажете ни за вашия проект</h2><p>Свържете се с екипа ни във Варна или София, за да обсъдим имота и възможностите за изпълнение.</p></div><Link className="pill" href="/#contact">Изпратете запитване <span aria-hidden="true">↗</span></Link></section>;
}
