"use client";

import Image from "next/image";
import ContactForm from "@/app/components/ContactForm";
import OfficeCarousel from "@/app/components/OfficeCarousel";

const services = [
  {
    image: "/images/service-concept-1.jpg",
    title: "Интериорна концепция",
    href: "/uslugi/interiorna-kontseptsiya/",
    text: "Цялостна интериорна концепция, съобразена със стила на живот и работа, цветовите предпочитания, функционалността и удобството.",
  },
  {
    image: "/images/service-finishing-1.jpg",
    title: "Довършителни работи",
    href: "/uslugi/dovrshitelni-raboti/",
    text: "Цялостна организация, планиране и контрол на строителните работи, доставките, обзавеждането и монтажа.",
  },
  {
    image: "/images/service-renovation-2.jpg",
    title: "Ремонтни дейности",
    href: "/uslugi/remontni-deynosti/",
    text: "Цялостен или частичен ремонт на жилища и офиси, включително инсталации, настилки, стени, кухни, бани и обзавеждане.",
  },
];
export type HomePageProject = { id: string; image: string; title: string; place: string };
type HomePageContentProps = { homes: HomePageProject[]; offices: HomePageProject[] };
const steps = [
  "Анализ на обекта и задание",
  "Интериорна концепция и материали",
  "Бюджет, договори и график",
  "Ремонт, доставки и монтаж",
  "Контрол, почистване и предаване",
];
const benefits = [
  [
    "Един отговорен екип",
    "Комуникирате с един екип от заданието до предаването на готовия обект.",
  ],
  [
    "Прозрачен бюджет",
    "Получавате детайлна оферта и ясна рамка за разходите преди началото на работата.",
  ],
  [
    "Контролиран график",
    "Планираме етапите, доставките и работата на всички специалисти.",
  ],
  [
    "Проверени изпълнители",
    "Работим с доказани майстори, производители и доставчици.",
  ],
  [
    "Работа по готов проект",
    "Можем да поемем реализацията и когато концепцията е създадена от друг екип.",
  ],
  [
    "Готов за използване обект",
    "Завършваме с монтаж, детайлно почистване и предаване на ключ.",
  ],
];

function LocationPin() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function HomePageContent({ homes, offices }: HomePageContentProps) {
  return (
    <main>
      <section className="hero" id="top">
        <header className="nav">
          <a className="brand" href="#top" aria-label="Planex Interior">
            <Image
              src="/planex-interior-logo-approved.svg"
              alt="Planex Interior"
              width={827}
              height={229}
              priority
            />
          </a>
          <nav className="desktopNavigation" aria-label="Основна навигация">
            <a href="#services">Услуги</a>
            <a href="/portfolio/">Портфолио</a>
            <a href="#about">За нас</a>
            <a href="#contact">Контакти</a>
          </nav>
          <details className="homeMobileNavigation">
            <summary aria-label="Отворете менюто">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <nav aria-label="Мобилна навигация">
              <a
                href="#services"
                onClick={(event) => {
                  const menu = event.currentTarget.closest("details");
                  if (menu) menu.open = false;
                }}
              >
                Услуги
              </a>
              <a href="/portfolio/">Портфолио</a>
              <a
                href="#about"
                onClick={(event) => {
                  const menu = event.currentTarget.closest("details");
                  if (menu) menu.open = false;
                }}
              >
                За нас
              </a>
              <a
                href="#contact"
                onClick={(event) => {
                  const menu = event.currentTarget.closest("details");
                  if (menu) menu.open = false;
                }}
              >
                Контакти
              </a>
            </nav>
          </details>
          <a className="navCta" href="#contact">
            <span className="ctaFull">Изпратете запитване</span>
            <span className="ctaShort">Запитване</span>
          </a>
        </header>
        <video
          className="heroVideo"
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster="/images/project-office.jpg"
          aria-hidden="true"
        >
          <source src="/videos/planex-interior-hero-v2.mp4" type="video/mp4" />
        </video>
        <div className="heroShade" />
        <div className="heroContent">
          <h1>
            Цялостно завършване, ремонт и обзавеждане на жилища, офиси и
            търговски площи
          </h1>
          <p className="heroText">
            Независимо дали ви предстои да завършите и обзаведете нов дом или да
            ремонтирате и обновите настоящото си жилище или офис, организираме
            целия процес до готов за използване имот.
          </p>
        </div>
        <div className="scrollNote">
          София и Варна · Над 70 000 м² завършени и обзаведени имоти{" "}
          <span>↓</span>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="sectionIntro editorialIntro">
          <h2>От интериорната концепция до готовия имот</h2>
          <p className="leadText">
            Създаването на уютни, функционални и красиви пространства за живот и
            работа е комплексен процес. Той изисква знания за материалите и
            технологиите, добра организация и координация на дизайнери, майстори
            и специалисти.
          </p>
        </div>
        <div className="serviceGrid">
          {services.map((s) => (
            <article className="serviceCard" key={s.title}>
              <a href={s.href} aria-label={`Научете повече за ${s.title}`}>
                <div className="serviceImage" data-parallax>
                  <div
                    className="homeParallaxLayer"
                    data-parallax-layer
                    style={{ backgroundImage: `url('${s.image}')` }}
                  />
                </div>
              </a>
              <h3>
                <a href={s.href}>{s.title}</a>
              </h3>
              <p>{s.text}</p>
              <a className="textLink" href={s.href}>
                Научете повече
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="numbers section lightSection"
        aria-label="Планекс Инвест в числа"
      >
        <div className="numbersTop">
          <p className="kicker">Опит в числа</p>
          <h2>Опит в завършването и обзавеждането на различни видове имоти</h2>
        </div>
        <div className="numberGrid">
          <article>
            <strong>70 000 м²</strong>
            <p>Общо завършени и обзаведени имоти</p>
          </article>
          <article>
            <strong>40 000 м²</strong>
            <p>Жилищни имоти</p>
            <small>Градски, ваканционни и семейни жилища</small>
          </article>
          <article className="accentStat">
            <strong>30 000 м²</strong>
            <p>Бизнес имоти</p>
            <small>Офиси, магазини и търговски площи</small>
          </article>
          <article>
            <strong>800+</strong>
            <p>Клиенти</p>
            <small>Физически лица и компании</small>
          </article>
          <article>
            <strong>300 000+ м²</strong>
            <p>Построени площи</p>
            <small>Жилищни, офисни, търговски и обществени сгради</small>
          </article>
        </div>
      </section>

      <section className="homes section lightSection" id="projects">
        <div className="sectionHeader">
          <div>
            <p className="kicker">Жилищни пространства</p>
            <h2>Домове с индивидуален характер и цялостно изпълнение</h2>
          </div>
          <p className="sectionNote">
            Завършване, ремонт и обзавеждане на градски, ваканционни и семейни
            жилища.
          </p>
        </div>
        <div className="homeGrid">
          {homes.map((p) => (
            <article className="homeCard" key={p.id}>
              <div className="projectImage" data-parallax>
                <div
                  className="homeParallaxLayer"
                  data-parallax-layer
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
                <span className="category">Жилищен интериор</span>
              </div>
              <div className="projectDetails">
                <h3>{p.title}</h3>
                <span className="projectLocation">
                  <LocationPin />
                  {p.place}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects section">
        <OfficeCarousel offices={offices} />
        <div className="projectsFooter">
          <a className="simpleLink" href="/portfolio/">
            Всички проекти
          </a>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="aboutPhoto" data-parallax>
          <div
            className="homeParallaxLayer"
            data-parallax-layer
            style={{ backgroundImage: "url('/images/project-office.jpg')" }}
          />
        </div>
        <div className="aboutCopy">
          <p className="kicker">За Планекс Инвест</p>
          <h2>Строителен опит зад всеки интериор</h2>
          <p>
            „Планекс Инвест“ е инвестиционно-консултантска компания в сферата на
            строителството, недвижимите имоти, поддръжката и управлението на
            сгради. Построили сме над 300 000 м² жилищни, офисни, търговски и
            обществени площи.
          </p>
          <p>
            Предлагаме цялостно довършване и обзавеждане на различни видове
            имоти. Услугите могат да бъдат възложени цялостно или частично,
            включително изпълнение по готов интериорен проект.
          </p>
          <a className="pill" href="/za-nas/">
            Научете повече за компанията
          </a>
        </div>
      </section>

      <section className="process section lightSection" id="process">
        <div className="processTitle">
          <p className="kicker">Етапи на работа</p>
          <h2>Ясен процес от първия оглед до предаването</h2>
          <p>
            Организираме проектирането, офертите, поръчките, доставките,
            строителните дейности, монтажа и финалното почистване.
          </p>
        </div>
        <div className="stepList">
          {steps.map((s, i) => (
            <div className="step" key={s}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{s}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="benefits section">
        <div className="benefitsIntro">
          <p className="kicker">Управление на проекта</p>
          <h2>Как организираме изпълнението</h2>
        </div>
        <div className="benefitGrid">
          {benefits.map(([title, text], i) => (
            <article key={title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section darkContact" id="contact">
        <div className="contactPitch">
          <p className="kicker">Свържете се с нас</p>
          <h2>Разкажете ни за вашия проект</h2>
          <p>
            Изпратете ни информация за имота и услугите, от които се нуждаете.
            Ще се свържем с вас, за да обсъдим следващите стъпки.
          </p>
          <div className="officeContacts">
            <article>
              <b>Офис София</b>
              <a href="tel:+359882473433">088 247 3433</a>
              <a href="tel:+35929581001">02 958 1001</a>
              <a href="mailto:interiorsofia@planexinvest.bg">
                interiorsofia@planexinvest.bg
              </a>
              <span>Понеделник до петък · 08:30 до 17:30</span>
            </article>
            <article>
              <b>Офис Варна</b>
              <a href="tel:+359887499888">088 749 9888</a>
              <a href="tel:+35952600936">052 600 936</a>
              <a href="mailto:interior@planexinvest.bg">
                interior@planexinvest.bg
              </a>
              <span>Понеделник до петък · 08:30 до 17:30</span>
            </article>
          </div>
        </div>
        <ContactForm />
      </section>

      <footer>
        <div className="footerNav">
          <a href="#services">Услуги</a>
          <a href="/portfolio/">Портфолио</a>
          <a href="#about">За нас</a>
          <a href="#process">Процес</a>
          <a href="#contact">Контакти</a>
        </div>
        <div className="groupLinks">
          <a href="https://realtyplanex.com/" target="_blank" rel="noopener noreferrer">Продажба на имоти</a>
          <a href="https://plhome.net/" target="_blank" rel="noopener noreferrer">Поддръжка на сгради</a>
          <a href="https://myvacation.bg/" target="_blank" rel="noopener noreferrer">Ваканция на море</a>
          <a href="https://mamaiaz.bg/" target="_blank" rel="noopener noreferrer">Детски център „Мама и аз“</a>
        </div>
        <div className="footerBottom">
          <a
            className="brand footerLogo"
            href="#top"
            aria-label="Planex Interior"
          >
            <Image
              src="/planex-interior-logo-approved.svg"
              alt="Planex Interior"
              width={827}
              height={229}
            />
          </a>
          <p>ISO 9001:2015 · DNV GL · София и Варна</p>
          <p>© 2026 Планекс Инвест ООД</p>
        </div>
      </footer>
    </main>
  );
}
