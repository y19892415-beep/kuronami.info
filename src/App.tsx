import { type PointerEvent, useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowRight, Menu, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { projects, setupItems, worlds } from './data'

function Brand() {
  return <a className="brand" href="#top" aria-label="Kuronami, retour à l’accueil"><span className="brand-mark">黒</span><span>KURONAMI</span><i>/</i><span>黒波王</span></a>
}

function Header({ sound, toggleSound, reduced, toggleReduced }: { sound: boolean; toggleSound: () => void; reduced: boolean; toggleReduced: () => void }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <header className="header">
    <Brand />
    <button className="icon-btn menu-btn" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label="Ouvrir le menu">{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Navigation principale">
      <a href="#about" onClick={close}>À propos</a><a href="#univers" onClick={close}>Univers</a><a href="#projects" onClick={close}>Créations</a><a href="#setup" onClick={close}>Setup</a><a href="#gallery" onClick={close}>Galerie</a>
      <div className="nav-controls">
        <button className="icon-btn" onClick={toggleReduced} aria-pressed={reduced} title="Réduire les animations">{reduced ? <Play /> : <Pause />}</button>
        <button className="icon-btn" onClick={toggleSound} aria-pressed={sound} title={sound ? 'Couper le son' : 'Activer le son'}>{sound ? <Volume2 /> : <VolumeX />}</button>
      </div>
    </nav>
  </header>
}

function useAmbientSound() {
  const [sound, setSound] = useState(false)
  const audio = useRef<AudioContext | null>(null)
  const nodes = useRef<AudioNode[]>([])
  const toggle = () => {
    if (sound) { nodes.current.forEach(node => node.disconnect()); nodes.current = []; void audio.current?.close(); audio.current = null; setSound(false); return }
    const ctx = new AudioContext(); const gain = ctx.createGain(); gain.gain.value = 0.025; gain.connect(ctx.destination)
    ;[55, 82.5, 110].forEach((frequency, i) => { const osc = ctx.createOscillator(); const filter = ctx.createBiquadFilter(); osc.type = i === 1 ? 'sine' : 'triangle'; osc.frequency.value = frequency; filter.type = 'lowpass'; filter.frequency.value = 240; osc.connect(filter).connect(gain); osc.start(); nodes.current.push(osc, filter) })
    audio.current = ctx; setSound(true)
  }
  useEffect(() => () => { void audio.current?.close() }, [])
  return [sound, toggle] as const
}

function Loader() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => { const timer = window.setTimeout(() => setHidden(true), 1700); return () => clearTimeout(timer) }, [])
  return <div className={hidden ? 'loader done' : 'loader'} aria-hidden={hidden}><div className="loader-wave"><span>黒</span></div><p>KURONAMI</p><div className="loader-line"><i /></div></div>
}

function Hero() {
  return <section className="hero" id="top">
    <img className="hero-art" src={`${import.meta.env.BASE_URL}assets/wave-eclipse.png`} alt="Vague noire abstraite sous une éclipse turquoise" />
    <div className="hero-shade" />
    <div className="particles" aria-hidden="true" />
    <div className="hero-content reveal">
      <h1>KURONAMI</h1><p className="kanji">黒波王</p><p className="tagline">King of the Black Wave</p>
      <div className="hero-actions"><a className="button primary" href="#univers">Explorer mon univers <ArrowDownRight /></a><a className="button secondary" href="#projects">Voir mes projets <ArrowRight /></a></div>
    </div>
    <a className="scroll-cue" href="#about"><span>Défiler</span><ArrowDownRight /></a>
  </section>
}

function About() {
  return <section className="about section" id="about"><span className="section-number">01</span><div className="section-label">À propos</div><h2>Là où l’obscurité<br />devient création.</h2><div className="about-copy"><p><strong>Kuronami / 黒波王</strong> est un univers personnel façonné par la nuit, le jeu et l’imaginaire japonais.</p><p>Chaque projet est une vague : singulière, mouvante, prête à laisser une trace lumineuse dans l’obscurité.</p></div><div className="seal">黒<br /><small>波王</small></div></section>
}

function Worlds() {
  const [active, setActive] = useState(0); const world = worlds[active]
  return <section className="worlds section" id="univers">
    <div className="world-intro"><span className="section-label">Univers sélectionné</span><p className="world-index">{world.index} / 05</p><h2 style={{ color: world.color }}>{world.name}</h2><p className="world-meta">{world.meta}</p><p className="world-copy">{world.text}</p></div>
    <div className="world-orbit" aria-hidden="true"><span style={{ background: world.color }} /></div>
    <div className="world-list" role="tablist" aria-label="Mes univers">
      {worlds.map((item, index) => <button role="tab" aria-selected={index === active} className={index === active ? 'active' : ''} key={item.name} onClick={() => setActive(index)}><span>{item.index}</span><strong>{item.name}</strong><small>{item.meta}</small><ArrowRight /></button>)}
    </div>
  </section>
}

function Projects() {
  return <section className="projects section" id="projects"><div className="projects-heading"><span className="section-label">Créations & projets</span><h2>Mes projets.<br /><em>Mon univers.</em></h2><p>Des espaces où je transforme le jeu, l’image et le mouvement en créations personnelles.</p></div>
    <div className="project-list">{projects.map((p, i) => <a className="project project-link" href={p.url} target="_blank" rel="noopener noreferrer" key={p.title} aria-label={`${p.action} — ${p.title}`}><div className="project-copy"><div className="project-kind"><TikTokWaveIcon /><span>0{i + 1} / {p.type}</span></div><h3>{p.title}</h3><p>{p.text}</p><span className="project-action">{p.action} <ArrowRight /></span></div><div className="project-image"><img src={p.image} alt="Bannière TA1WER VAL — TikTok Creator" loading="lazy" /><b>0{i + 1}</b></div></a>)}</div>
  </section>
}

function TikTokWaveIcon() {
  return <svg className="tiktok-wave-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8v21.5a8.5 8.5 0 1 1-6.2-8.2" /><path d="M28 9c2.5 6.5 6.6 9.7 12 10" /><path d="M7 35c5-3 9-3 14 0s9 3 14 0" /></svg>
}

function SetupIcon({ type }: { type: string }) {
  if (type === 'keyboard') return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="12" width="38" height="24" rx="3" /><path d="M10 18h4m4 0h4m4 0h4m4 0h4M10 24h4m4 0h4m4 0h4m4 0h4M10 30h6m4 0h16" /></svg>
  if (type === 'mouse') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5c-8 0-13 6-13 15v8c0 9 5 15 13 15s13-6 13-15v-8C37 11 32 5 24 5Z" /><path d="M24 5v13m-5 0h10" /></svg>
  if (type === 'microphone') return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="16" y="5" width="16" height="27" rx="8" /><path d="M10 24c0 8 6 14 14 14s14-6 14-14M24 38v6m-8 0h16" /></svg>
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 10c0-5 12-5 12 0 0 3-2 5-6 7-4-2-6-4-6-7Z" /><path d="M24 17v8m-9 7c0-7 4-10 9-10s9 3 9 10c0 7-4 11-9 11s-9-4-9-11Z" /><path d="M18 31c2 2 10 2 12 0" /></svg>
}

function BuddyCharm() {
  return <div className="buddy-charm" aria-hidden="true"><span className="buddy-string" /><svg viewBox="0 0 100 128"><ellipse className="buddy-base-shadow" cx="50" cy="116" rx="37" ry="7" /><path className="buddy-base" d="M14 83h72v30c0 7-6 11-13 11H27c-7 0-13-4-13-11Z" /><circle className="buddy-light buddy-light-red" cx="32" cy="91" r="4" /><circle className="buddy-light buddy-light-green" cx="45" cy="91" r="4" /><circle className="buddy-light buddy-light-blue" cx="58" cy="91" r="4" /><circle className="buddy-light buddy-light-violet" cx="71" cy="91" r="4" /><path className="buddy-duck-body" d="M30 74c0-13 7-22 20-22s20 9 20 22v17H30Z" /><circle className="buddy-duck-head" cx="50" cy="36" r="24" /><path className="buddy-wing buddy-wing-left" d="M31 62c-11 1-16 8-15 19 7 1 13-1 17-7" /><path className="buddy-wing buddy-wing-right" d="M69 62c11 1 16 8 15 19-7 1-13-1-17-7" /><circle className="buddy-eye" cx="41" cy="34" r="3.5" /><circle className="buddy-eye" cx="59" cy="34" r="3.5" /><path className="buddy-beak" d="M39 43c6-4 16-4 22 0-3 7-19 7-22 0Z" /></svg></div>
}

function Setup() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const moveScene = (event: PointerEvent<HTMLDivElement>) => {
    const scene = sceneRef.current
    if (!scene) return
    const bounds = scene.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    scene.style.setProperty('--scene-x', `${x * 8}deg`)
    scene.style.setProperty('--scene-y', `${y * -6}deg`)
  }
  const resetScene = () => { sceneRef.current?.style.removeProperty('--scene-x'); sceneRef.current?.style.removeProperty('--scene-y') }
  return <section className="setup section" id="setup"><div className="setup-heading"><span className="section-label">Mon setup</span><h2>L’équipement<br />derrière la vague.</h2><p>Les outils réels qui accompagnent mes sessions et mes créations.</p></div><div className="setup-layout"><div className="setup-scene" ref={sceneRef} onPointerMove={moveScene} onPointerLeave={resetScene}><img src={`${import.meta.env.BASE_URL}assets/setup/kuronami-setup.webp`} alt="Bureau gaming Kuronami avec clavier jaune, souris blanche, microphone TONOR et mascotte originale" loading="lazy" /><span className="keyboard-glow" /><span className="mouse-trail" /><BuddyCharm /></div><div className="setup-grid">{setupItems.map(item => <article className="gear-card" key={item.name}><div className="gear-icon"><SetupIcon type={item.icon} /></div><span>{item.category}</span><h3>{item.name}</h3></article>)}</div></div></section>
}

function Gallery() {
  const images = ['mountain-night.png', 'wave-eclipse.png', 'abyss-vortex.png', 'wave-blade.png'].map(file => `${import.meta.env.BASE_URL}assets/${file}`)
  return <section className="gallery section" id="gallery"><div><span className="section-label">Galerie</span><h2>Instants volés</h2><p>Fragments d’océan, de nuit et de lumière.</p></div><div className="gallery-track">{images.map((src, i) => <figure key={src}><img src={src} alt={`Fragment abstrait ${i + 1}`} loading="lazy" /><figcaption>Fragment — 0{i + 1}</figcaption></figure>)}</div></section>
}

function Footer() { return <footer><Brand /><p>King of the Black Wave</p><a href="#top">Revenir à la surface <ArrowRight /></a><small>© {new Date().getFullYear()} KURONAMI / 黒波王</small></footer> }

export default function App() {
  const [sound, toggleSound] = useAmbientSound(); const [reduced, setReduced] = useState(() => localStorage.getItem('kuronami-reduced-motion') === 'true')
  const toggleReduced = () => setReduced(v => { localStorage.setItem('kuronami-reduced-motion', String(!v)); return !v })
  return <div className={reduced ? 'app reduced-motion' : 'app'}><Loader /><Header sound={sound} toggleSound={toggleSound} reduced={reduced} toggleReduced={toggleReduced} /><main><Hero /><About /><Worlds /><Projects /><Setup /><Gallery /></main><Footer /></div>
}
