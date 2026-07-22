# Kuronami / 黒波王

Première version du portfolio personnel **Kuronami**, une expérience immersive inspirée par la vague noire, la nuit et l'imaginaire japonais. Tous les visuels ont été créés spécifiquement pour ce projet.

## Technologies

- React 19
- TypeScript
- Vite
- CSS natif
- Lucide React pour les icônes

## Lancer le projet

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
npm run dev
```

Le site sera disponible à l'adresse indiquée par Vite, généralement `http://localhost:5173`.

## Vérifications et production

```bash
npm run lint
npm run build
npm run preview
```

Le dossier de production est généré dans `dist/`.

## Modifier le site

- `src/App.tsx` contient les sections et interactions principales.
- `src/data.ts` contient les univers et projets : modifiez ces listes pour personnaliser les textes.
- `src/styles.css` contient le système visuel, les animations et les adaptations mobiles.
- `public/assets/` contient les créations visuelles originales.

Les préférences de réduction d'animations sont conservées dans le navigateur. Le bouton audio génère une ambiance discrète via la Web Audio API : aucun fichier sonore externe n'est chargé.

## Accessibilité

Le site respecte `prefers-reduced-motion`, propose également un contrôle manuel des animations, utilise une navigation au clavier et conserve des contrastes élevés.
