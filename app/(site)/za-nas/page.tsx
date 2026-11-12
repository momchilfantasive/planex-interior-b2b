import Image from 'next/image';
import { ContactBand, SiteFooter, SiteHeader } from '@/app/components/SiteChrome';

export const metadata = {
  title: 'За нас | Планекс Интериор',
  description: 'Повече за Планекс Инвест и екипа за довършване и обзавеждане на имоти.',
};

const responsibilities = [
  'Изготвят цялостна интериорна концепция, съобразена със стила на живот и работа, цветовите предпочитания, функционалността и удобствата.',
  'Планират, организират и контролират всички ремонтни дейности и доставки.',
  'Разработват детайлен план на строителните работи, като спазват изискванията към технологиите и материалите.',
  'Поддържат редовна комуникация с клиента относно хода на довършителните работи.',
  'Приключват работата в срок и предават ключа за готовия за обитаване имот.',
];

export default function AboutPage() {
  return (
    <main className="innerPage aboutPage">
      <SiteHeader />

      <section className="aboutBrandHero" aria-labelledby="about-title">
        <div className="aboutBrandHeroImage" data-parallax>
          <div className="aboutBrandHeroLayer" data-parallax-layer>
            <Image src="/images/about-hero.jpg" alt="" fill priority sizes="100vw" />
          </div>
        </div>
        <div className="aboutBrandHeroShade" />
        <div className="aboutWrap aboutBrandContent">
          <Image
            className="aboutBrandLogo"
            src="/planex-invest-logo.svg"
            alt="Планекс Инвест"
            width={546}
            height={149}
            priority
          />
          <h1 id="about-title">Опит в строителството. Внимание към всеки интериор.</h1>
        </div>
      </section>

      <section className="aboutPageIntro" aria-labelledby="about-intro-title">
        <div className="aboutWrap aboutIntroLayout">
          <div className="aboutIntroCopy">
            <h2 id="about-intro-title">Строителство и интериори</h2>
            <p>„Планекс Инвест“ е инвестиционно-консултантска компания в сферата на строителството, недвижимите имоти, поддръжката и управлението на сгради.</p>
            <p>Строим жилищни и ваканционни комплекси, офис центрове и търговски сгради с прилежащите към тях съоръжения и инсталации. Предлагаме и цялостно довършване и обзавеждане на имоти.</p>
          </div>
          <div className="aboutPageImage" data-parallax>
            <div className="serviceImageLayer" data-parallax-layer>
              <Image
                src="/images/about-team-plans.webp"
                alt="Екип обсъжда чертежи и планове на работна маса"
                fill
                sizes="(max-width: 760px) 88vw, (max-width: 1500px) 49vw, 710px"
              />
            </div>
          </div>
        </div>

        <dl className="aboutWrap aboutFigures" aria-label="Опит в числа">
          <div>
            <dt>Разгъната застроена площ на построените сгради</dt>
            <dd>300&nbsp;000&nbsp;м²+</dd>
          </div>
          <div>
            <dt>
              Завършени и обзаведени имоти
              <span className="aboutFigureDetail">40&nbsp;000&nbsp;м² жилищни и 30&nbsp;000&nbsp;м² бизнес имоти</span>
            </dt>
            <dd>70&nbsp;000&nbsp;м²+</dd>
          </div>
          <div>
            <dt>Индивидуални и корпоративни клиенти</dt>
            <dd>800+</dd>
          </div>
        </dl>
      </section>

      <section className="aboutResponsibilities" aria-labelledby="about-work-title">
        <div className="aboutWrap aboutTextLayout">
          <div className="aboutWorkIntro">
            <h2 id="about-work-title">Как работим</h2>
            <p>Нашите специалисти по довършителни работи и вътрешен дизайн съдействат на клиентите през целия проект.</p>
          </div>
          <ul role="list">
            {responsibilities.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="companyStory" aria-labelledby="about-history-title">
        <div className="aboutStoryMark" aria-hidden="true">
          <div className="aboutStoryMarkLayer" data-about-mark />
        </div>
        <div className="aboutWrap aboutTextLayout">
          <h2 id="about-history-title">История на компанията</h2>
          <div className="aboutStoryCopy">
            <p>„Планекс Инвест“ е основана през 2004 г. с предмет на дейност проектиране и строеж на жилищни, промишлени и обществени сгради и съоръжения и реализация на инвестиционни проекти в областта на строителството и имотите.</p>
            <p>Компанията предлага цялостно управление на проекти и контрол върху процесите по проектиране и строителство, продажба на имоти, поддръжка на сгради и управление на собствеността.</p>
            <p>Нашият успех е резултат от правилно изградена концепция, професионална организация на инвестиционния процес и високо качество на крайния продукт.</p>
            <p className="isoNote">
              <strong>ISO 9001:2015</strong>
              <span>Сертифицирана от DNV GL Business Assurance<br />Сертификат № 175212-2015-AQ-BGR-RvA</span>
            </p>
          </div>
        </div>
      </section>

      <ContactBand />
      <SiteFooter />
    </main>
  );
}
