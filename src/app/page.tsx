'use client';

import { useEffect, useState, useRef } from 'react';
import Modal from '@/components/Modal';
import { translations, type Lang } from '@/lib/translations';

const projectData = {
  kiosco: {
    video: 'https://youtu.be/KoxgLab4NHc',
    images: ['assets/kiosco-login.png', 'assets/kiosco-ventas.png', 'assets/kiosco-reporte.png', 'assets/kiosco-stock.png'],
  },
  web: {
    video: 'https://youtu.be/ODgjQiNtad0',
    images: ['assets/web/web-1.png', 'assets/web/web-2.png', 'assets/web/web-3.png', 'assets/web/web-4.png'],
  },
  php: {
    video: null,
    images: ['assets/php/php-1.png', 'assets/php/php-2.png', 'assets/php/php-3.png'],
  },
};

export type ProjectId = keyof typeof projectData;

export default function Home() {
  const [lang, setLang] = useState<Lang>('es');
  const [openProject, setOpenProject] = useState<ProjectId | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  // Cursor
  useEffect(() => {
    let rx = 0, ry = 0, mx = 0, my = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);
    let raf: number;
    const animate = () => {
      if (cursorRef.current) { cursorRef.current.style.left = mx + 'px'; cursorRef.current.style.top = my + 'px'; }
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px'; }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Saved lang
  useEffect(() => {
    const saved = localStorage.getItem('preferred-language') as Lang | null;
    if (saved) setLang(saved);
  }, []);

  const switchLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem('preferred-language', l);
  };

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* NAV */}
      <nav className="navbar">
        <div className="nav-logo"><span>J</span>OAQUÍN PÉREZ ROMERO</div>
        <div className="nav-links">
          <a href="#skills">{t['nav-skills']}</a>
          <a href="#xp">{t['nav-work']}</a>
          <a href="#projects">{t['nav-projects']}</a>
          <a href="#contact" className="nav-hire">{t['nav-hire']}</a>
          <div className="lang-switch">
            <button className={`lang-btn${lang === 'es' ? ' active' : ''}`} onClick={() => switchLang('es')}>ES</button>
            <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => switchLang('en')}>EN</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="about" className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-accent-circle" />
        <div className="hero-inner">
          <div className="hero-badge">{t['hero-badge']}</div>
          <div className="hero-name">
            <div>{t['hero-hello']}</div>
            <div className="outline">JOAQUÍN</div>
            <div className="accent">PÉREZ ROMERO</div>
          </div>
          <div className="hero-subtitle-row">
            <h3>{t['hero-subtitle']}</h3>
            <div className="hero-line" />
            <span className="hero-location">Buenos Aires, AR</span>
          </div>
          <p className="hero-desc">{t['hero-description']}</p>
          <div className="hero-btns">
            <a href="#projects" className="btn-primary">{t['hero-projects-btn']}</a>
            <a href="https://github.com/maxomart" target="_blank" rel="noreferrer" className="btn-ghost">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/joaquín-pérez-romero-273894300/" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn ↗</a>
          </div>
        </div>
        <div className="hero-scroll-hint">{t['scroll-hint']}</div>
        <div className="hero-counter">
          {[{ num: '3+', label: t['stat-projects'] }, { num: '5+', label: t['stat-tech'] }, { num: '1+', label: t['stat-years'] }].map(s => (
            <div key={s.label} className="hero-stat">
              <div className="hero-stat-num">{s.num}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-header reveal">
          <div>
            <div className="section-num">01 — {t['nav-skills']}</div>
            <h2 className="section-title">{t['skills-title']} <span className="outline">{t['skills-title-2']}</span></h2>
          </div>
          <p className="section-desc">{t['skills-desc']}</p>
        </div>
        <div className="skills-grid reveal">
          {[
            { title: t['skills-frontend'], items: ['JavaScript', 'TypeScript', 'React', 'Angular', 'HTML / CSS', 'Tailwind CSS'] },
            { title: t['skills-backend'], items: ['Node.js', 'PHP', 'Laravel', 'REST APIs', 'Supabase', 'Next.js'] },
            { title: t['skills-databases'], items: ['SQL Server', 'SQLite', 'PostgreSQL', 'ORM / Query Builder'] },
            { title: t['skills-tools'], items: ['Git / GitHub', 'AWS', 'Electron', 'Postman', 'Figma', 'Vercel'] },
          ].map(col => (
            <div key={col.title} className="skill-col">
              <div className="skill-col-title">{col.title}</div>
              {col.items.map(item => <div key={item} className="skill-item">{item}</div>)}
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="xp" style={{ background: 'var(--bg)' }}>
        <div className="section-header reveal">
          <div>
            <div className="section-num">02 — {t['nav-work']}</div>
            <h2 className="section-title">EXPERIENCE <span className="outline">{t['xp-log']}</span></h2>
          </div>
          <p className="section-desc">{t['xp-desc']}</p>
        </div>
        <div className="xp-list">
          {[
            { year: '2024 — 2025', title: t['xp-degree'], company: 'UCES', desc: t['xp-degree-desc'], icon: '🎓' },
            { year: '2024 — 2025', title: t['xp-personal'], company: t['xp-personal-subtitle'], desc: t['xp-personal-desc'], icon: '🧠' },
          ].map(xp => (
            <div key={xp.title} className="xp-item reveal">
              <div className="xp-year">{xp.year}</div>
              <div className="xp-content">
                <h4>{xp.title}</h4>
                <div className="xp-company">{xp.company}</div>
                <p>{xp.desc}</p>
              </div>
              <div className="xp-icon">{xp.icon}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-header reveal">
          <div>
            <div className="section-num">03 — {t['nav-projects']}</div>
            <h2 className="section-title">{t['projects-selected']} <span className="accent">{t['projects-works']}</span></h2>
          </div>
          <p className="section-desc">{t['projects-desc']}</p>
        </div>
        <div className="projects-grid">
          {([
            { id: 'kiosco' as ProjectId, bg: 'linear-gradient(135deg,#0f0f0f,#1a1a0a)', bgText: 'KIOSCO', icon: '🏪', num: '01', titleKey: 'project1-title', descKey: 'project1-desc', tags: ['Node.js','Electron','SQLite'] },
            { id: 'web' as ProjectId, bg: 'linear-gradient(135deg,#0a0f0a,#0a1a10)', bgText: 'WEB', icon: '⚡', num: '02', titleKey: 'project3-title', descKey: 'project3-desc', tags: ['React','TypeScript'] },
            { id: 'php' as ProjectId, bg: 'linear-gradient(135deg,#0a0a0f,#100a1a)', bgText: 'PHP', icon: '🔧', num: '03', titleKey: 'project-php-title', descKey: 'project-php-desc', tags: ['PHP','Laravel','Angular','SQL Server'] },
          ] as const).map(p => (
            <div key={p.id} className="project-card reveal" onClick={() => setOpenProject(p.id)}>
              <div className="project-thumb" style={{ background: p.bg }}>
                <div className="project-thumb-bg">{p.bgText}</div>
                <div className="project-thumb-icon">{p.icon}</div>
                <div className="project-thumb-line" />
              </div>
              <div className="project-body">
                <div className="project-num">PROJECT / {p.num}</div>
                <h4>{t[p.titleKey as keyof typeof t]}</h4>
                <p>{t[p.descKey as keyof typeof t]}</p>
                <div className="project-tags">
                  {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
              <div className="project-footer">
                <span className="project-cta">{t['view-project']}</span>
                <span className="project-arrow">↗</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: 'var(--bg)' }}>
        <div className="contact-inner">
          <div className="reveal">
            <div className="section-num">04 — {t['nav-contact']}</div>
            <h2 className="contact-heading">
              {t['footer-title-1']}<br />
              <span className="outline">{t['footer-title-2']}</span><br />
              {t['footer-title-3']}<br />
              <span className="accent">{t['footer-title-4']}</span>
            </h2>
          </div>
          <div className="reveal">
            <p style={{ fontSize: '15px', color: 'var(--fg2)', lineHeight: 1.7, marginBottom: '40px' }}>{t['footer-subtitle']}</p>
            <div className="contact-links">
              {[
                { href: 'mailto:joaco4084@gmail.com', label: 'joaco4084@gmail.com', tag: 'Email ↗' },
                { href: 'https://github.com/maxomart', label: 'github.com/maxomart', tag: 'GitHub ↗' },
                { href: 'https://www.linkedin.com/in/joaquín-pérez-romero-273894300/', label: 'LinkedIn', tag: '↗' },
              ].map(link => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="contact-link">
                  <span>{link.label}</span>
                  <span>{link.tag}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-copy">© 2025 — <span>JOAQUÍN PÉREZ ROMERO</span></div>
        <div className="footer-copy">{t['footer-made']}</div>
      </footer>

      {/* MODAL */}
      {openProject && (
        <Modal
          projectId={openProject}
          lang={lang}
          projectData={projectData}
          onClose={() => setOpenProject(null)}
        />
      )}
    </>
  );
}