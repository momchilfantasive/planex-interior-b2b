import Image from 'next/image';
import { ContactBand, SiteFooter, SiteHeader } from './SiteChrome';

type ServiceProject = { title: string; place: string; image: string };
type Service = {
  title: string;
  subtitle: string;
  intro: string[];
  pointsTitle: string;
  points: string[];
  closing?: string;
  images: string[];
  projects: ServiceProject[];
};

function Pin() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
}

export function ServicePage({ data }: { data: Service }) {
  return <main className="innerPage servicePage">
    <SiteHeader />
    <section className="serviceHero">
      <div className="serviceHeroHeading">
        <p className="kicker"><span>Услуги</span><span aria-hidden="true">/</span><span>Интериор и реализация</span></p>
        <h1>{data.title}</h1>
      </div>
      <div className="serviceHeroImage">
        <Image src={data.images[0]} alt={`${data.title} – реализирано пространство`} fill priority sizes="100vw" />
        <span className="serviceHeroImageLabel">Планекс Инвест <i aria-hidden="true">·</i> Интериор</span>
      </div>
      <div className="serviceHeroBottom">
        <p>{data.subtitle}</p>
        <a className="serviceAnchor" href="#service-overview">Разгледайте услугата <span aria-hidden="true">↓</span></a>
      </div>
    </section>

    <section className="serviceStatement" id="service-overview">
      <div className="serviceSectionLabel"><span>01</span><span>Нашият подход</span></div>
      <div className="serviceStatementText">
        <h2>{data.intro[0]}</h2>
        {data.intro.slice(1).map(text => <p key={text}>{text}</p>)}
      </div>
    </section>

    <section className="serviceImageEssay" aria-label={`Детайли за ${data.title}`}>
      {data.images.slice(1).map((image, index) => <div className={`serviceEssayImage essay${index + 1}`} key={image}>
        <Image src={image} alt={`${data.title} – детайл от интериорния проект ${index + 1}`} fill sizes="(max-width: 760px) 100vw, 50vw" />
      </div>)}
      <div className="serviceEssayNote"><span>01 — 02</span><p>Материали, пропорции и детайли, подбрани според имота и начина, по който ще бъде използван.</p></div>
    </section>

    <section className="serviceScope">
      <div className="serviceScopeHeading"><div className="serviceSectionLabel"><span>02</span><span>Обхват на услугата</span></div><h2>{data.pointsTitle}</h2></div>
      <ol>{data.points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, '0')}</span><p>{point}</p><b aria-hidden="true">↗</b></li>)}</ol>
    </section>

    {data.closing && <section className="serviceClosing"><p className="serviceSectionLabel"><span>03</span><span>Гъвкав обхват</span></p><p>{data.closing}</p></section>}

    <section className="serviceProjects">
      <div className="serviceProjectsHeading"><div><div className="serviceSectionLabel"><span>{data.closing ? '04' : '03'}</span><span>Избрани реализации</span></div><h2>Проекти от нашето портфолио</h2></div><a href="/portfolio/">Всички проекти <span aria-hidden="true">↗</span></a></div>
      <div className="serviceProjectsGrid">{data.projects.map(project => <article className="serviceProjectCard" key={project.title + project.place}>
        <a href="/portfolio/" aria-label={`Вижте проекта ${project.title}`}>
          <div className="serviceProjectImage"><Image src={project.image} alt={`${project.title}, ${project.place}`} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
          <div className="serviceProjectCaption"><h3>{project.title}</h3><span><Pin />{project.place}</span></div>
        </a>
      </article>)}</div>
    </section>

    <ContactBand />
    <SiteFooter />
  </main>;
}
