import Image from 'next/image';
import { ContactBand, SiteFooter, SiteHeader } from '@/app/components/SiteChrome';

export const metadata = { title: 'За нас | Планекс Интериор', description: 'Повече за Планекс Инвест и екипа за довършване и обзавеждане на имоти.' };

const responsibilities = [
  'Изготвят цялостна интериорна концепция, съобразена със стила на живот и работа, цветовите предпочитания, функционалността и удобствата.',
  'Планират, организират и контролират всички ремонтни дейности и доставки.',
  'Разработват детайлен план на строителните работи, като спазват изискванията към технологиите и материалите.',
  'Поддържат редовна комуникация с клиента относно хода на довършителните работи.',
  'Приключват работата в срок и предават ключа за готовия за обитаване имот.',
];

export default function AboutPage() {
  return <main className="innerPage aboutPage">
    <SiteHeader />
    <section className="aboutBrandHero" aria-label="Планекс Инвест">
      <div className="aboutBrandHeroImage" data-parallax>
        <div className="aboutBrandHeroLayer" data-parallax-layer>
          <Image src="/images/about-hero.jpg" alt="Съвременна стъклена фасада" fill priority sizes="100vw" />
        </div>
      </div>
      <div className="aboutBrandHeroShade" />
      <Image className="aboutBrandLogo" src="/planex-invest-logo.svg" alt="Планекс Инвест" width={546} height={149} priority />
    </section>
    <section className="aboutPageIntro">
      <p className="kicker">За Планекс Инвест</p>
      <h1>Опит в строителството. Внимание към всеки интериор.</h1>
      <p>„Планекс Инвест“ е инвестиционно-консултантска компания в сферата на строителството, недвижимите имоти, поддръжката и управлението на сгради.</p>
    </section>
    <section className="editorialBody aboutPageBody">
      <div className="aboutPageImage" data-parallax><div className="serviceImageLayer" data-parallax-layer><Image src="/images/project-office.jpg" alt="Завършен офис интериор" fill sizes="(max-width: 700px) 100vw, 50vw" /></div></div>
      <div className="editorialCopy">
        <p>Сградите, които сме построили до момента, са с разгъната застроена площ над 300 000 кв.м и обхващат цяла палитра от недвижими имоти: жилищни и ваканционни комплекси, офис центрове, търговски сгради и прилежащите към тях специализирани съоръжения и инсталации.</p>
        <p>„Планекс Инвест“ предлага на своите клиенти цялостно довършване и обзавеждане на различни видове имоти. До ключ сме завършили и обзавели около 70 000 кв.м: 40 000 кв.м жилищни и 30 000 кв.м бизнес имоти. Имаме над 800 индивидуални и корпоративни клиенти.</p>
      </div>
    </section>
    <section className="aboutResponsibilities"><div><p className="kicker">Един екип, всички етапи</p><h2>Нашите специалисти по довършителни работи и вътрешен дизайн съдействат на клиентите като:</h2></div><ul>{responsibilities.map(item => <li key={item}>{item}</li>)}</ul></section>
    <section className="companyStory"><div><p className="kicker">От 2004 г.</p><h2>Професионална организация на инвестиционния процес</h2></div><div><p>„Планекс Инвест“ е основана през 2004 г. с предмет на дейност проектиране и строеж на жилищни, промишлени и обществени сгради и съоръжения и реализация на инвестиционни проекти в областта на строителството и имотите.</p><p>Компанията предлага цялостно управление на проекти и контрол върху процесите по проектиране и строителство, продажба на имоти, поддръжка на сгради и управление на собствеността.</p><p>Нашият успех е резултат от правилно изградена концепция, професионална организация на инвестиционния процес и високо качество на крайния продукт.</p><p className="isoNote"><strong>ISO 9001:2015</strong><span>Сертифицирана от DNV GL – Business Assurance<br/>Сертификат № 175212-2015-AQ-BGR-RvA</span></p></div></section>
    <ContactBand />
    <SiteFooter />
  </main>;
}
