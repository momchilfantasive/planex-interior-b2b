const services = [
  { image:'/images/project-office.jpg', title:'Интериорна концепция', text:'Стратегия, функционално планиране и дизайн за ефективна работна среда.' },
  { image:'/images/project-varna.jpg', title:'Цялостно изпълнение', text:'Координация на екипи, доставки и график от първата идея до готовия обект.' },
  { image:'/images/project-briz.jpg', title:'Ремонт и обзавеждане', text:'Довършителни работи, мебели, осветление, техника и финално предаване.' },
];
const projects = [
  { image:'/images/project-office.jpg', category:'Офис пространства', title:'Съвременен офис за фокус и сътрудничество', place:'кв. Витоша, София', area:'650 м²' },
  { image:'/images/project-varna.jpg', category:'Инвестиционни имоти', title:'Завършен градски апартамент до последния детайл', place:'Център, Варна', area:'180 м²' },
  { image:'/images/project-briz.jpg', category:'Премиум резиденции', title:'Светъл дом с панорама към морето', place:'кв. Бриз, Варна', area:'145 м²' },
];
const values = [
  ['45 000+ м²','Реализирани площи','Опит в жилищни, офисни и търговски пространства.'],
  ['600+','Доволни клиенти','Дългосрочни отношения, изградени върху ясна комуникация.'],
  ['ISO 9001','Контрол на качеството','Сертифициран процес и единна отговорност за изпълнението.'],
];
const steps = ['Анализ и задание','Концепция и бюджет','Организация и изпълнение','Контрол и предаване'];

export default function Home(){return <main>
  <section className="hero" id="top">
    <header className="nav"><a className="brand" href="#top" aria-label="Планекс Инвест"><span className="brandMark">P</span><span>PLANEX <b>INVEST</b></span></a><nav aria-label="Основна навигация"><a href="#services">Какво правим</a><a href="#projects">Проекти</a><a href="#about">За нас</a><a href="#contact">Контакти</a></nav><a className="navCta" href="#contact">Започнете проект <span>●</span></a></header>
    <div className="heroPhoto"/><div className="heroShade"/><div className="heroContent"><p className="eyebrow">Интериорни решения от идея до реализация</p><h1>Пространства, създадени за успешен бизнес</h1><p className="heroText">Проектираме, управляваме и реализираме офиси, търговски площи и инвестиционни имоти с една точка на отговорност.</p></div><div className="scrollNote">Над 20 години опит в създаването на пространства <span>↓</span></div>
  </section>

  <section className="services section" id="services"><div className="sectionIntro"><p className="kicker">Какво правим</p><h2>Цялостни интериорни решения за бизнес и инвестиционни имоти</h2></div><div className="serviceGrid">{services.map((s,i)=><article className="serviceCard" key={s.title}><div className="serviceImage" style={{backgroundImage:`url('${s.image}')`}}><span>{String(i+1).padStart(2,'0')}</span><a href="#contact" aria-label={s.title}>+</a></div><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>

  <section className="about section" id="about"><div className="aboutPhoto"/><div className="aboutCopy"><p className="kicker">Един партньор. Пълна отговорност.</p><h2>По-малко сложност. Повече контрол върху проекта.</h2><p>Обединяваме дизайнери, инженери, изпълнители и доставчици в един координиран екип. Така защитаваме бюджета, срока и качеството — без размиване на отговорността.</p><a className="pill" href="#process">Нашият подход <span>●</span></a></div></section>

  <section className="projects section" id="projects"><div className="sectionHeader"><div><p className="kicker">Избрани проекти</p><h2>Резултати, които се виждат</h2></div><a className="simpleLink" href="#contact">Обсъдете вашия проект <span>●</span></a></div><div className="projectGrid">{projects.map((p,i)=><article className={`projectCard project${i+1}`} key={p.title}><div className="projectImage" style={{backgroundImage:`url('${p.image}')`}}><a href="#contact" aria-label={p.title}>+</a></div><p className="category">{p.category}</p><h3>{p.title}</h3><ul><li>{p.place}</li><li>{p.area}</li></ul></article>)}</div></section>

  <section className="contact section" id="contact"><div className="contactPitch"><p className="kicker">Готови за следващия проект?</p><h2>Нека създадем пространство, което работи за вас.</h2><p>Разкажете ни за обекта, срока и целите си. Ще се свържем с вас до един работен ден.</p><div className="quickContacts"><div><b>Обадете ни се</b><a href="tel:+359882473433">088 247 3433 — София</a><a href="tel:+359887499888">088 749 9888 — Варна</a></div><div><b>Изпратете имейл</b><a href="mailto:interior@planexinvest.bg">interior@planexinvest.bg</a></div></div></div><form action="mailto:interior@planexinvest.bg" method="post" encType="text/plain"><h3>Свържете се с нас</h3><div className="formRow"><label>Име<input name="name" required/></label><label>Фамилия<input name="surname"/></label></div><div className="formRow"><label>Телефон<input name="phone" type="tel"/></label><label>Служебен e-mail<input name="email" type="email" required/></label></div><label>Тип проект<select name="project"><option>Изберете</option><option>Офис пространство</option><option>Търговска площ</option><option>Инвестиционен имот</option><option>Жилищен интериор</option></select></label><label>Съобщение<textarea name="message" required/></label><label className="check"><input type="checkbox" required/><span>Приемам политиката за поверителност.</span></label><button type="submit">Изпратете запитване <span>●</span></button></form></section>

  <section className="values section">{values.map((v,i)=><article key={v[1]}><div className="valueVisual" style={{backgroundImage:`url('${projects[i].image}')`}}><strong>{v[0]}</strong></div><h3>{v[1]}</h3><p>{v[2]}</p></article>)}</section>

  <section className="process section" id="process"><div className="processTitle"><p className="kicker">Ясен процес</p><h2>От първата среща до готовия обект</h2><p>Всяка стъпка има конкретен резултат, отговорник и срок.</p></div><div className="stepList">{steps.map((s,i)=><div className="step" key={s}><span>{String(i+1).padStart(2,'0')}</span><h3>{s}</h3><b>+</b></div>)}</div></section>

  <footer><div className="footerTop"><h2>Готови за следващия проект? <a href="#contact">Свържете се с нас</a></h2><div className="footerNav"><a href="#services">Какво правим</a><a href="#projects">Проекти</a><a href="#about">За нас</a><a href="#process">Процес</a><a href="#contact">Контакти</a></div></div><div className="footerBottom"><a className="brand" href="#top"><span className="brandMark">P</span><span>PLANEX <b>INVEST</b></span></a><p>ISO 9001:2015 · София и Варна</p><p>© 2026 Планекс Инвест ООД</p></div><div className="footerWord">Planex</div></footer>
</main>}
