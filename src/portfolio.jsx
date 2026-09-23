import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Download, ExternalLink, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import './styles.css';

const projects = [
  { number: '01', type: 'Product + ML', title: 'Zor! Health', description: 'A digital health startup where I translated a clinical need into a roadmap, data model, and investor-ready product vision.', result: 'Roadmap ownership · 50+ users · 10+ person team', tags: ['Product strategy', 'PostgreSQL', 'Deep learning'], href: 'https://zor.llc/', cta: 'Visit product' },
  { number: '02', type: 'Applied AI', title: 'Behavioral annotation pipeline', description: 'An end-to-end Vid-LLM workflow that turns messy behavioral video into structured labels researchers can trust.', result: '92% less manual labeling · ~90% accuracy · 1,000+ segments', tags: ['LLM evaluation', 'Automation', 'Research ops'], href: 'https://github.com/CaiLab-neuro', cta: 'View lab work' },
  { number: '03', type: 'Data storytelling', title: 'MBTA rail ridership', description: 'An interactive visual analysis of Boston transit patterns designed to make service planning insights legible at a glance.', result: 'Interactive dashboards · Python · Plotly + Altair', tags: ['Data visualization', 'Python', 'User insight'], href: 'https://github.com/ibabaig/ds4200-final', cta: 'View on GitHub' },
];

const skills = [
  ['Product thinking', 'Roadmaps, agile delivery, user-centered problem framing'],
  ['Technical fluency', 'Python, SQL, JavaScript, PostgreSQL, ML systems'],
  ['Communication', 'Investor narratives, research translation, clear documentation'],
];

function TeaMark() {
  return <span className="tea-mark" aria-hidden="true"><span className="steam steam-one" /><span className="steam steam-two" /><span className="cup"><span className="tea-line" /></span><span className="cup-handle" /></span>;
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'work', 'writing'];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

  return <div className="site-shell">
    <header className="topbar">
      <a className="brand" href="#home" onClick={() => scrollTo('home')} aria-label="Iba Baig home"><TeaMark /><span>iba baig<span className="brand-dot">.</span></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
        {['about', 'work', 'writing'].map((item) => <a key={item} className={activeSection === item ? 'active' : ''} href={`#${item}`} onClick={() => scrollTo(item)}>{item}</a>)}
        <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">resume <Download size={14} /></a>
      </nav>
    </header>

    <main>
      <section id="home" className="hero section-pad">
        <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" /> product-minded builder · nyc / boston</p><h1>I turn complex<br /><em>systems</em> into clear<br />next steps.</h1><p className="hero-intro">I’m Iba — a product manager and AI practitioner who likes sitting at the intersection of people, data, and the details that make a product feel inevitable.</p><div className="hero-actions"><a className="button button-dark" href="#work" onClick={() => scrollTo('work')}>See selected work <ArrowUpRight size={16} /></a><a className="text-link" href="mailto:ib2657@columbia.edu">Let’s talk <span>↗</span></a></div></div>
        <div className="hero-note" aria-label="A note about Iba"><div className="note-pin" /><p className="note-kicker">currently steeping</p><p className="note-title">MS in AI<br />at Columbia</p><p className="note-body">Building the bridge between technical possibility and useful product decisions.</p><div className="note-rule" /><p className="note-small">Always curious about: health tech, applied AI, and the best tea in the city.</p></div><div className="hero-stamp">IB<br /><span>PM / AI</span></div>
      </section>

      <div className="marquee" aria-hidden="true"><div>PRODUCT STRATEGY <span>✳</span> APPLIED AI <span>✳</span> DATA STORYTELLING <span>✳</span> PRODUCT STRATEGY <span>✳</span> APPLIED AI <span>✳</span> DATA STORYTELLING <span>✳</span></div></div>

      <section id="about" className="about section-pad section-grid"><div className="section-label"><span>01</span><span>about</span></div><div className="about-content"><h2>Good products begin with better questions.</h2><div className="about-columns"><p>I’ve worked across digital health, academic research, and data visualization — translating between domain experts, designers, engineers, and the people who ultimately use what we build.</p><p>My edge is technical fluency with a human center. I can go deep on a data model, then come back up to explain why it matters, what to build next, and how we’ll know it worked.</p></div><div className="skill-list">{skills.map(([title, copy]) => <div className="skill-row" key={title}><Check size={16} /><div><strong>{title}</strong><span>{copy}</span></div></div>)}</div></div></section>

      <section id="work" className="work section-pad section-grid"><div className="section-label"><span>02</span><span>selected work</span></div><div className="work-content"><div className="section-heading-row"><h2>From first question<br /><em>to shipped thing.</em></h2><p className="section-aside">A few places I’ve practiced turning ambiguity into momentum.</p></div><div className="project-list">{projects.map((project) => <article className="project-card" key={project.number}><div className="project-number">{project.number}</div><div className="project-main"><p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><p className="project-result">{project.result}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.cta}: ${project.title}`}><span>{project.cta}</span><ArrowUpRight size={18} /></a></article>)}</div></div></section>

      <section id="writing" className="writing section-pad section-grid"><div className="section-label"><span>03</span><span>writing & research</span></div><div className="writing-content"><div className="writing-intro"><h2>I like making<br /><em>the complex legible.</em></h2><p>Outside of product work, I write about science, technology, and the ideas that make the future feel a little more understandable.</p></div><div className="writing-links"><a href="https://nuscimagazine.com/predicting-the-unpredictable-the-next-frontier-in-managing-epilepsy/" target="_blank" rel="noreferrer"><span><small>NU Sci Magazine · health / neuroscience</small>Predicting the unpredictable: the next frontier in managing epilepsy</span><ExternalLink size={17} /></a><a href="https://nuscimagazine.com/3d-printing-the-brain-is-this-the-new-way-to-treat-brain-injuries/" target="_blank" rel="noreferrer"><span><small>NU Sci Magazine · technology</small>3D-printing the brain: is this the new way to treat brain injuries?</span><ExternalLink size={17} /></a><a href="/NeuroBoston%20Poster.pdf" target="_blank" rel="noreferrer"><span><small>Research poster · Northeastern University</small>NeuroBoston — research presentation</span><ExternalLink size={17} /></a></div></div></section>

      <section className="contact section-pad"><div className="contact-card"><div><p className="eyebrow">have a problem worth solving?</p><h2>Let’s make something<br /><em>useful.</em></h2></div><a className="button button-light" href="mailto:ib2657@columbia.edu">Start a conversation <ArrowUpRight size={16} /></a></div></section>
    </main>

    <footer className="footer section-pad"><a className="brand footer-brand" href="#home" onClick={() => scrollTo('home')}><TeaMark /><span>iba baig<span className="brand-dot">.</span></span></a><p>Built with care, curiosity, and probably too much tea.</p><div className="footer-links"><a href="mailto:ib2657@columbia.edu" aria-label="Email Iba"><Mail size={17} /></a><a href="https://www.linkedin.com/in/ibabaig" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://github.com/ibabaig" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a></div></footer>
  </div>;
}

export default Portfolio;
