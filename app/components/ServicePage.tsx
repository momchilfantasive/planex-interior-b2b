import Image from 'next/image';
import Link from 'next/link';
import { ContactBand, SiteFooter, SiteHeader } from './SiteChrome';

type ServiceProject = { title: string; place: string; image: string };
type Service = {
  title: string;
  subtitle: string;
  intro: string[];
  scopeTitle: string;
  pointsTitle: string;
  points: string[];
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
        <h2 id="service-scope-title">{data.scopeTitle}</h2>
        <p data-reveal>{data.pointsTitle}</p>
      </div>
      <ol>{data.points.map((point, index) => <li key={point} data-reveal><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><p>{point}</p></li>)}</ol>
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
