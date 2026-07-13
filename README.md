# Wozku Website Redesign

A modern, interactive redesign of the Wozku marketing website built with React, TypeScript, and Vite — now featuring a fully dynamic, tokenized design system with live theme customization and Figma-native export.

This project reimagines the Wozku experience with a cleaner visual language, improved storytelling, interactive animations, responsive layouts, full light/dark mode support, and an enhanced user experience across the entire website.

---

## ✨ Features

### Core Experience
- Modern landing page redesign
- Interactive hero section
- Responsive design across desktop, tablet, and mobile
- Animated UI components (Framer Motion)
- Global reach visualization (interactive WebGL globe)
- Interactive India office map
- Core team showcase
- ROI calculator with live simulation
- Event Advocacy Loop Simulator
- Integrations sandbox (drag-and-drop connector demo)
- Case studies
- Customer success stories
- Security & Compliance pages
- Pricing page
- Blog & articles
- FAQ section
- Optimized WebP assets

### 🎨 Dynamic Design System
- **Live theme switching** across 8 curated preset color themes, plus a fully custom color picker
- **Custom color picker**: pick any hex color and the entire site — primary, secondary, and accent palettes — regenerates instantly
- **OKLCH-based color science**: full 50–950 color scales are generated in the OKLCH perceptual color space (via `culori`) so lightness steps stay visually even at any hue, avoiding the muddy/washed-out scales that plain HSL interpolation produces
- **Automatic color harmony**: secondary and accent colors are auto-derived from the chosen primary using classic harmony strategies (complementary, analogous, triadic, split-complementary)
- **Full dark mode support**, including correct contrast handling for custom and preset themes alike
- **Design tokens export**: export the active theme (colors, typography, spacing, and border radius) as a JSON file compatible with **Figma's native Variables import** — pick a theme, click export, and import the tokens directly into a Figma Variables collection

---

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion (animation)
- `culori` (OKLCH color science / scale generation)
- Cobe (WebGL globe rendering)
- CSS3 custom properties (theme variable architecture)
- SVG Animations

---

## 📁 Project Structure

```
src/
├── assets/
├── components/
├── lib/
│   ├── colorScale.ts      # OKLCH scale generation & color harmony logic
│   └── designSystem.ts    # Design token assembly & Figma-native export
├── App.tsx
├── main.tsx
└── index.css              # Theme variables, presets, and Tailwind @theme mappings
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/keyushhh/wozku-redesign.git
```

Navigate into the project:

```bash
cd wozku-redesign
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:5173
```

---

## 📦 Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🎨 Using the Theme System

1. Click **Theme** in the navbar to open the theme dropdown.
2. Choose one of the 8 preset colors, or select **Custom** to open the color picker.
3. In Custom mode, pick a color visually or type a hex code directly — the site updates live, including all ambient glows, gradients, and interactive visualizations.
4. Toggle **Light / Dark** appearance independently of the chosen color.
5. Click **Export Figma Tokens** to download a JSON file of the active theme's full token set (colors, typography, spacing, radius), ready to import into Figma's native Variables panel.

---

## 📂 Assets

The project includes:

- Custom illustrations
- Optimized WebP images
- SVG icons
- Interactive map assets
- Brand assets

---

## 📱 Responsive Design

The website is optimized for:

- Desktop
- Laptop
- Tablet
- Mobile

---

## 🎯 Goals

- Improve user experience
- Modernize the visual identity
- Increase engagement
- Improve storytelling
- Create scalable, themeable UI components
- Give non-technical stakeholders a way to explore brand color options directly on the live site
- Keep design and code in sync via a single exportable token source of truth
- Enhance website performance