import Image from 'next/image';
import { ContactBand, PageFrame } from './SiteChrome';

type Service = { title: string; subtitle: string; intro: string[]; pointsTitle: string; points: string[]; closing?: string; images: string[] };

export function ServicePage({ data }: { data: Service }) {
  return <PageFrame eyebrow="Услуги" title={data.title} intro={data.subtitle}>
    <section className="editorialBody">
      <div className="editorialCopy">{data.intro.map(text => <p key={text}>{text}</p>)}</div>
      <div className="serviceGallery">{data.images.map((image, i) => <div className={`serviceGalleryImage image${i + 1}`} key={image}><Image src={image} alt={`${data.title} – ${i === 0 ? 'интериорен детайл' : 'реализиран обект'}`} fill sizes="(max-width: 700px) 100vw, 50vw" /></div>)}</div>
      <div className="serviceDetails"><div><p className="kicker">Как работим</p><h2>{data.pointsTitle}</h2></div><ul>{data.points.map(point => <li key={point}>{point}</li>)}</ul></div>
      {data.closing && <p className="editorialClosing">{data.closing}</p>}
    </section>
    <ContactBand />
  </PageFrame>;
}
