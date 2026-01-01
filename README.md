# voyonsvoir

Les gens, on va jouer à un jeu. 
Voici un repo totalement vide : vous en faites ce que vous voulez, vous dev tout ce que vous voulez.

### 📜 La règle du jeu
* Je merge **automatiquement** toutes les PR qui n’ont pas de conflit.
* J’ai envie de voir ce qui en sort.

---

## 🏗️ MODE D'EMPLOI
1. **Fork** le projet.
2. **Ajoute** ce que tu veux (code, texte, assets, n'importe quoi).
3. **Ouvre une Pull Request**.
4. Si pas de conflit → **C'est mergé !**

---

# HAVE FUN ! And PUT ME IN BIKINI NOW ! 👙

## Safety Notice / Notice de securite

English:
All attempts to create a virus, malware, or any harmful program will be refused.
Please do not create software intended to harm, abuse, or compromise others.
Be vigilant before running any program from this repository.
This is an experiment: do not trust this code by default, review it carefully.

Francais:
Toute tentative de creer un virus, un malware, ou tout programme nuisible sera refusee.
Merci de ne pas creer des logiciels dont le but est de nuire, abuser, ou compromettre autrui.
Merci d'etre vigilant avant d'executer tout programme depuis ce depot.
Ceci est une experience: ne faites pas confiance a ce code par defaut, verifiez-le soigneusement.

## Automated Security Checks / Verifications de securite

English:
This repository runs automated security checks on pull requests via GitHub Actions.
Checks include CodeQL (SAST), Trivy (dependency vulnerabilities), Gitleaks (secrets), and ClamAV (malware scan).
Auto-merge is enabled for any PR (including external contributors). Checks are informational; auto-merge only blocks if ClamAV detects malware.
Some checks can be limited on forked PRs due to GitHub permissions.
These checks reduce risk but do not guarantee a program is safe, so review before running.

Francais:
Ce depot execute des verifications de securite automatiques sur les pull requests via GitHub Actions.
Les checks incluent CodeQL (SAST), Trivy (vulnerabilites de dependances), Gitleaks (secrets), et ClamAV (scan malware).
Le merge automatique est active pour toute PR (y compris les contributeurs externes). Les checks sont informatifs; le merge est bloque seulement si ClamAV detecte un malware.
Certains checks peuvent etre limites pour les PRs venant de forks, a cause des permissions GitHub.
Ces checks reduisent le risque mais ne garantissent pas qu'un programme soit sans danger, donc verifiez avant execution.

---

# 🚀 GrokTrade Landing Page

Une landing page moderne pour une plateforme de trading automatisé propulsée par l'IA Grok.

## 📦 Stack Technique

| Technologie | Version | Description |
|-------------|---------|-------------|
| **Next.js** | 16.1.1 | Framework React avec App Router |
| **React** | 19.x | Bibliothèque UI |
| **TypeScript** | 5.x | Typage statique |
| **Tailwind CSS** | 4.x | Framework CSS utility-first |
| **clsx** | - | Composition de classes conditionnelles |
| **tailwind-merge** | - | Résolution intelligente des conflits Tailwind |

## 🏗️ Architecture du Projet

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Styles globaux + animations
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Page d'accueil (landing)
│
├── components/             # Composants React
│   ├── background/         # Effets de fond animés
│   │   └── index.tsx       # ParticleField, AnimatedGrid, GradientOrb
│   │
│   ├── icons/              # Composants d'icônes SVG
│   │   └── index.tsx       # Icons réutilisables + Icon mapper
│   │
│   ├── layout/             # Composants de mise en page
│   │   ├── Navbar.tsx      # Navigation principale
│   │   ├── TradingTicker.tsx # Ticker de trading animé
│   │   ├── Footer.tsx      # Pied de page
│   │   └── index.ts        # Exports
│   │
│   ├── sections/           # Sections de la landing page
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── DashboardSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── CTASection.tsx
│   │   └── index.ts        # Exports
│   │
│   └── ui/                 # Composants UI atomiques
│       └── index.tsx       # Button, Card, Badge, etc.
│
├── lib/                    # Utilitaires et données
│   ├── constants.ts        # Données statiques et configuration
│   └── utils.ts            # Fonctions utilitaires (cn, etc.)
│
└── types/                  # Types TypeScript
    └── index.ts            # Interfaces et types globaux
```

## 🎯 Principes d'Architecture

### Séparation des Préoccupations
- **Types** séparés des composants pour une meilleure maintenabilité
- **Données** externalisées dans `constants.ts` pour faciliter les modifications
- **Composants UI atomiques** réutilisables dans tout le projet

### Patterns Utilisés
- **Composition over Inheritance** - Composants composables et flexibles
- **Memo Pattern** - Optimisation des re-renders avec `React.memo`
- **Icon Mapper** - Accès dynamique aux icônes via des identifiants string
- **cn() Utility** - Composition de classes Tailwind avec résolution de conflits

### Conventions de Code
- **TypeScript strict** - Typage fort pour tous les composants
- **JSDoc comments** - Documentation inline pour chaque module
- **Consistent naming** - PascalCase pour composants, camelCase pour fonctions
- **Co-location** - Fichiers liés regroupés dans le même dossier

## 🚀 Démarrage Rapide

```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Build production
npm run build

# Démarrage production
npm start
```

## 📄 Licence

MIT - Libre d'utilisation et de modification.
