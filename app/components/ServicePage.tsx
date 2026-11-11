import Image from 'next/image';
import Link from 'next/link';
import { ContactBand, SiteFooter, SiteHeader } from './SiteChrome';

type ServiceProject = { title: string; place: string; image: string };
const scopeIconPaths = {
  ruler: 'M3 16 16 3l5 5L8 21zM7 12l2 2m1-5 2 2m1-5 2 2',
  sliders: 'M6 3v7m0 4v7M12 3v11m0 4v3m6-18v3m0 4v11M3 10h6m0 8h6m0-12h6',
  layout: 'M3 3h18v18H3zM3 10h18M10 10v11',
  layers: 'm12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5',
  calendar: 'M4 6h16v15H4zM8 3v6m8-6v6M4 11h16m-12 4h3m3 0h2',
  team: 'M14 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 20v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2m-1-15a3 3 0 0 1 0 6m3 3a4 4 0 0 1 2 4v2',
  truck: 'M2 5h13v12H9m6 0h2m-2-8h4l3 4v4h-1M2 5v12h3m4 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
  check: 'M9 4H5v17h14V4h-4M9 3h6v4H9zm-1 11 3 3 5-6',
  window: 'M3 3h18v18H3zM12 3v18M3 12h18',
  paint: 'M3 4h14v6H3zM17 7h4v6h-9v4m-2 0h4v4h-4z',
  fixture: 'M3 14h18m-16 0v2a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-2M7 14V6a3 3 0 0 1 6 0v1m0 3v1',
  sofa: 'M6 11V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M6 19v2m12-2v2M3 13a2 2 0 1 1 4 0v2h10v-2a2 2 0 1 1 4 0v6H3z',
};

type ServiceScopeTopic = {
  icon: keyof typeof scopeIconPaths;
  title: string;
  description: string;
};
type Service = {
  title: string;
  subtitle: string;
  intro: string[];
  scopeTitle: string | readonly [string, string];
  scopeIntro: string;
  scopeTopics: ServiceScopeTopic[];
  imageCaption: string;
  closing?: string;
  images: string[];
  projects: ServiceProject[];
};

function Pin() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
}

function ServiceImage({ src, alt, hero = false }: { src: string; alt: string; hero?: boolean }) {
  return <div className={hero ? 'serviceHeroImage' : 'serviceEssayImage'} data-parallax>
    <div className="serviceImageLayer" data-parallax-layer>
      <Image src={src} alt={alt} fill priority={hero} sizes={hero ? '100vw' : '(max-width: 700px) 100vw, 50vw'} />
    </div>
  </div>;
}

export function ServicePage({ data }: { data: Service }) {
  const introSentences = data.intro[0].split(/(?<=[.!?])\s+/);
  const statementTitle = introSentences[0];
  const statementBody = [introSentences.slice(1).join(' '), ...data.intro.slice(1), data.imageCaption].filter(Boolean);

  return <main className="innerPage servicePage">
    <SiteHeader />
    <section className="serviceHero" aria-labelledby="service-title">
      <div className="serviceHeroHeading">
        <h1 id="service-title">{data.title}</h1>
        <p data-reveal>{data.subtitle}</p>
      </div>
      <ServiceImage src={data.images[0]} alt={data.title} hero />
    </section>

    <section className="serviceStatement" id="service-overview" aria-labelledby="service-statement-title">
      <div className="serviceStatementText">
        <h2 id="service-statement-title">{statementTitle}</h2>
        <div className="serviceBodyCopy">{statementBody.map(text => <p key={text} data-reveal>{text}</p>)}</div>
      </div>
    </section>

    <section className="serviceImageEssay" aria-label={`Снимки за ${data.title}`}>
      <div className="serviceEssayGrid">{data.images.slice(1).map((image, index) => <ServiceImage src={image} alt={`${data.title}, детайл ${index + 1}`} key={image} />)}</div>
    </section>

    <section className="serviceScope" aria-labelledby="service-scope-title">
      <div className="serviceScopeHeading">
        <h2 id="service-scope-title">
          {typeof data.scopeTitle === 'string' ? data.scopeTitle : <>
            <span className="serviceScopeTitleLine">{data.scopeTitle[0]}</span>{' '}<br />
            <span className="serviceScopeTitleLine">{data.scopeTitle[1]}</span>
          </>}
        </h2>
        <p data-reveal>{data.scopeIntro}</p>
      </div>
      <ul className="serviceScopeTopics" role="list">
        {data.scopeTopics.map(topic => <li key={topic.title}>
          <svg className="serviceScopeIcon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={scopeIconPaths[topic.icon]} />
          </svg>
          <h3>{topic.title}</h3>
          <p>{topic.description}</p>
        </li>)}
      </ul>
    </section>

    {data.closing && <section className="serviceClosing" aria-labelledby="service-closing-title"><h2 id="service-closing-title">Изпълнение по ваш проект</h2><p data-reveal>{data.closing}</p></section>}

    <section className="serviceProjects" aria-labelledby="service-projects-title">
      <div className="serviceProjectsHeading"><h2 id="service-projects-title">Реализирани проекти</h2><p data-reveal>Жилищни и бизнес пространства от нашето портфолио.</p></div>
      <div className="serviceProjectsGrid">{data.projects.map(project => <article className="serviceProjectCard" key={project.title + project.place}>
        <Link href="/portfolio/" aria-label={`Разгледайте портфолиото: ${project.title}`}>
          <div className="serviceProjectImage" data-parallax><div className="serviceImageLayer" data-parallax-layer><Image src={project.image} alt={`${project.title}, ${project.place}`} fill sizes="(max-width: 700px) 100vw, 33vw" /></div></div>
          <div className="serviceProjectCaption"><h3>{project.title}</h3><span><Pin />{project.place}</span></div>
        </Link>
      </article>)}</div>
      <Link className="servicePortfolioLink" href="/portfolio/">Разгледайте всички проекти</Link>
    </section>

    <ContactBand />
    <SiteFooter />
  </main>;
}
