import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowRight, Menu, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { projects, worlds } from './data'

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
      <a href="#about" onClick={close}>À propos</a><a href="#univers" onClick={close}>Univers</a><a href="#projects" onClick={close}>Créations</a><a href="#gallery" onClick={close}>Galerie</a>
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
  return <section className="projects section" id="projects"><div className="projects-heading"><span className="section-label">Créations & projets</span><h2>Des idées.<br />Des vagues.<br /><em>Une signature.</em></h2><p>Explorations visuelles autour de l’océan, du mouvement et de l’inconnu.</p></div>
    <div className="project-list">{projects.map((p, i) => <article className="project" key={p.title}><div className="project-copy"><span>0{i + 1} / {p.type}</span><h3>{p.title}</h3><p>{p.text}</p><a href="#gallery">Voir le projet <ArrowRight /></a></div><div className="project-image"><img src={p.image} alt={`Création abstraite ${p.title}`} loading="lazy" /><b>0{i + 1}</b></div></article>)}</div>
  </section>
}

function Gallery() {
  const images = ['mountain-night.png', 'wave-eclipse.png', 'abyss-vortex.png', 'wave-blade.png'].map(file => `${import.meta.env.BASE_URL}assets/${file}`)
  return <section className="gallery section" id="gallery"><div><span className="section-label">Galerie</span><h2>Instants volés</h2><p>Fragments d’océan, de nuit et de lumière.</p></div><div className="gallery-track">{images.map((src, i) => <figure key={src}><img src={src} alt={`Fragment abstrait ${i + 1}`} loading="lazy" /><figcaption>Fragment — 0{i + 1}</figcaption></figure>)}</div></section>
}

function Footer() { return <footer><Brand /><p>King of the Black Wave</p><a href="#top">Revenir à la surface <ArrowRight /></a><small>© {new Date().getFullYear()} KURONAMI / 黒波王</small></footer> }

export default function App() {
  const [sound, toggleSound] = useAmbientSound(); const [reduced, setReduced] = useState(() => localStorage.getItem('kuronami-reduced-motion') === 'true')
  const toggleReduced = () => setReduced(v => { localStorage.setItem('kuronami-reduced-motion', String(!v)); return !v })
  return <div className={reduced ? 'app reduced-motion' : 'app'}><Loader /><Header sound={sound} toggleSound={toggleSound} reduced={reduced} toggleReduced={toggleReduced} /><main><Hero /><About /><Worlds /><Projects /><Gallery /></main><Footer /></div>
}
