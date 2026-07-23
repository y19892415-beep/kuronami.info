const worldAsset = (file: string) => `${import.meta.env.BASE_URL}assets/worlds/${file}`

export const worlds = [
  { name: 'Valorant', index: '01', meta: 'Stratégie · Précision · Évolution', text: 'Chaque décision façonne l’issue. Entre ombre et lumière, la précision devient un art.', color: '#35e7ef', image: worldAsset('valorant-lotus.webp'), position: 'center' },
  { name: 'Minecraft', index: '02', meta: 'Création · Survie · Infini', text: 'Construire sans limite, explorer l’inconnu et transformer chaque bloc en souvenir.', color: '#5fe2d1', image: worldAsset('minecraft.webp'), position: 'center' },
  { name: 'Blox Fruits', index: '03', meta: 'Aventure · Puissance · Liberté', text: 'Naviguer, progresser et poursuivre une force qui se dérobe toujours à l’horizon.', color: '#aa70ff', image: worldAsset('blox-fruits.webp'), position: 'center' },
  { name: 'Pokémon', index: '04', meta: 'Lien · Découverte · Évolution', text: 'Une aventure guidée par la curiosité, les rencontres et le désir de devenir meilleur.', color: '#79dff6', image: worldAsset('pokemon-go.webp'), position: 'center' },
  { name: 'Donjons & Dragons', index: '05', meta: 'Fantaisie · Rôle · Légende', text: 'Des histoires partagées où chaque choix ouvre une route et chaque lancer devient destin.', color: '#9b6cf8', image: worldAsset('dungeons-dragons.webp'), position: 'center 35%' },
] as const

export const projects = [
  {
    title: 'Ta1wer VAL',
    type: 'Création de contenu TikTok',
    text: 'Mon espace de création autour de Valorant, entre moments de jeu, précision et énergie Kuronami.',
    image: `${import.meta.env.BASE_URL}assets/projects/ta1wer-val-banner.webp`,
    url: 'https://www.tiktok.com/@ta1wer_val',
    action: 'Voir mon TikTok',
  },
] as const

export const setupItems = [
  { name: 'Ducky One 3 Pro Yellow Mini', category: 'Clavier', icon: 'keyboard' },
  { name: 'SteelSeries Rival 3 Gen 3 White', category: 'Souris', icon: 'mouse' },
  { name: 'TONOR', category: 'Microphone', icon: 'microphone' },
  { name: 'Porte-clés Ducky blanc', category: 'Accessoire', icon: 'charm' },
] as const
