import { generateDesignTokens, type ColorScale } from './colorScale';

export const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 650, 700, 800, 900, 950] as const;

export const THEME_PRESETS = [
  { id: 'indigo', name: 'Indigo', color: '#6366f1' },
  { id: 'emerald', name: 'Emerald', color: '#10b981' },
  { id: 'rose', name: 'Rose', color: '#f43f5e' },
  { id: 'amber', name: 'Amber', color: '#f59e0b' },
  { id: 'violet', name: 'Violet', color: '#a855f7' },
  { id: 'sky', name: 'Sky', color: '#0ea5e9' },
  { id: 'fuchsia', name: 'Fuchsia', color: '#d946ef' },
  { id: 'crimson', name: 'Crimson', color: '#dc2626' },
] as const;

export const DESIGN_FOUNDATIONS = {
  typography: {
    fontFamily: {
      sans: 'Satoshi, Inter, ui-sans-serif, system-ui, sans-serif',
      display: 'Space Grotesk, Inter, sans-serif',
      mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
    },
    fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem', '6xl': '3.75rem' },
    fontWeight: { regular: '400', medium: '500', semibold: '600', bold: '700', black: '900' },
    lineHeight: { tight: '1.1', snug: '1.25', normal: '1.5', relaxed: '1.625' },
  },
  spacing: { 0: '0px', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.25rem', 6: '1.5rem', 8: '2rem', 10: '2.5rem', 12: '3rem', 16: '4rem', 20: '5rem', 24: '6rem' },
  radius: { sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', '2xl': '1.5rem', full: '9999px' },
  shadow: { xs: '0 1px 2px rgb(0 0 0 / 0.05)', sm: '0 1px 3px rgb(0 0 0 / 0.1)', md: '0 4px 6px rgb(0 0 0 / 0.1)', lg: '0 10px 15px rgb(0 0 0 / 0.1)', xl: '0 20px 25px rgb(0 0 0 / 0.1)' },
  borderWidth: { none: '0px', hairline: '1px', medium: '2px', thick: '4px' },
  opacity: { transparent: '0', subtle: '0.05', muted: '0.5', disabled: '0.4', full: '1' },
  duration: { instant: '0ms', fast: '150ms', normal: '200ms', slow: '300ms', slower: '500ms' },
  easing: { standard: [0.4, 0, 0.2, 1], entrance: [0, 0, 0.2, 1], exit: [0.4, 0, 1, 1] },
  breakpoint: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
} as const;

const colorVariableNames = ['indigo', 'secondary', 'accent'] as const;
const neutralSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export function applyCustomTheme(hex: string) {
  const scales = generateDesignTokens(hex, 'analogous').color;
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  const palette: Record<string, string> = {};
  colorVariableNames.forEach((name) => {
    const scale = scales[name === 'indigo' ? 'primary' : name] as ColorScale;
    COLOR_STEPS.forEach((step) => {
      const value = isDark && step === 950 ? '#fafafa' : scale[step];
      const property = `--${name}-${step}`;
      root.style.setProperty(property, value);
      palette[property] = value;
    });
  });
  localStorage.setItem('wozku-custom-palette', JSON.stringify(palette));
  return scales;
}

export function clearCustomTheme() {
  const root = document.documentElement;
  colorVariableNames.forEach((name) => COLOR_STEPS.forEach((step) => root.style.removeProperty(`--${name}-${step}`)));
  localStorage.removeItem('wozku-custom-palette');
}

type TokenType = 'color' | 'fontFamilies' | 'fontSizes' | 'fontWeights' | 'lineHeights' | 'dimension' | 'borderRadius' | 'boxShadow' | 'strokeStyle' | 'opacity' | 'duration' | 'cubicBezier' | 'typography';

function token(value: unknown, type: TokenType, description?: string) {
  return { $value: value, $type: type, ...(description ? { $description: description } : {}) };
}

/** Creates a Tokens Studio / DTCG-compatible JSON object from the active UI theme. */
export function createThemeTokenExport(themeName: string, isDark: boolean) {
  const styles = getComputedStyle(document.documentElement);
  const color = (name: string) => styles.getPropertyValue(name).trim();
  const scale = (name: string) => Object.fromEntries(COLOR_STEPS.map((step) => [String(step), token(color(`--${name}-${step}`), 'color')]));

  return {
    $description: `Wozku ${themeName} ${isDark ? 'dark' : 'light'} design system. DTCG JSON for Tokens Studio's Figma import.`,
    $metadata: { tokenFormat: 'DTCG', generator: 'Wozku Theme Menu', theme: themeName, mode: isDark ? 'dark' : 'light' },
    $themes: [{ id: `${themeName}-${isDark ? 'dark' : 'light'}`, name: `${themeName[0].toUpperCase()}${themeName.slice(1)} ${isDark ? 'Dark' : 'Light'}`, selectedTokenSets: { global: 'enabled', color: 'enabled', semantic: 'enabled', component: 'enabled' } }],
    global: {
      fontFamily: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.typography.fontFamily).map(([key, value]) => [key, token(value, 'fontFamilies')])),
      fontSize: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.typography.fontSize).map(([key, value]) => [key, token(value, 'fontSizes')])),
      fontWeight: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.typography.fontWeight).map(([key, value]) => [key, token(value, 'fontWeights')])),
      lineHeight: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.typography.lineHeight).map(([key, value]) => [key, token(value, 'lineHeights')])),
      spacing: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.spacing).map(([key, value]) => [key, token(value, 'dimension')])),
      radius: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.radius).map(([key, value]) => [key, token(value, 'borderRadius')])),
      shadow: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.shadow).map(([key, value]) => [key, token(value, 'boxShadow')])),
      borderWidth: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.borderWidth).map(([key, value]) => [key, token(value, 'dimension')])),
      opacity: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.opacity).map(([key, value]) => [key, token(value, 'opacity')])),
      duration: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.duration).map(([key, value]) => [key, token(value, 'duration')])),
      easing: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.easing).map(([key, value]) => [key, token(value, 'cubicBezier')])),
      breakpoint: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.breakpoint).map(([key, value]) => [key, token(value, 'dimension')])),
      typography: {
        heading: { display: token({ fontFamily: '{global.fontFamily.display}', fontWeight: '{global.fontWeight.bold}', lineHeight: '{global.lineHeight.tight}', fontSize: '{global.fontSize.4xl}' }, 'typography') },
        body: { default: token({ fontFamily: '{global.fontFamily.sans}', fontWeight: '{global.fontWeight.regular}', lineHeight: '{global.lineHeight.normal}', fontSize: '{global.fontSize.base}' }, 'typography') },
        label: token({ fontFamily: '{global.fontFamily.sans}', fontWeight: '{global.fontWeight.semibold}', lineHeight: '{global.lineHeight.snug}', fontSize: '{global.fontSize.sm}' }, 'typography'),
      },
    },
    color: {
      primary: scale('indigo'), secondary: scale('secondary'), accent: scale('accent'),
      neutral: Object.fromEntries(neutralSteps.map((step) => [String(step), token(color(`--neutral-${step}`), 'color')])),
      fixed: { white: token('#ffffff', 'color'), light: token('#c7c7d1', 'color'), muted: token('#9696a3', 'color'), dark: token('#141418', 'color') },
    },
    semantic: {
      surface: { canvas: token(color('--neutral-50'), 'color'), default: token(color('--bg-white'), 'color'), subtle: token(color('--bg-card-accent'), 'color') },
      text: { primary: token(color('--neutral-900'), 'color'), secondary: token(color('--neutral-600'), 'color'), muted: token(color('--neutral-500'), 'color'), inverse: token('#ffffff', 'color') },
      border: { default: token(color('--neutral-200'), 'color'), subtle: token(color('--neutral-100'), 'color'), strong: token(color('--neutral-300'), 'color') },
      action: { primary: token(color('--indigo-600'), 'color'), primaryHover: token(color('--indigo-700'), 'color'), primarySubtle: token(color('--indigo-50'), 'color'), focusRing: token(color('--indigo-500'), 'color') },
    },
    component: {
      button: {
        primary: { background: token('{semantic.action.primary}', 'color'), text: token('{semantic.text.inverse}', 'color'), hoverBackground: token('{semantic.action.primaryHover}', 'color'), radius: token('{global.radius.xl}', 'borderRadius'), paddingX: token('{global.spacing.4}', 'dimension'), paddingY: token('{global.spacing.2}', 'dimension') },
        secondary: { background: token('{semantic.surface.default}', 'color'), text: token('{semantic.text.primary}', 'color'), border: token('{semantic.border.default}', 'color'), radius: token('{global.radius.xl}', 'borderRadius') },
      },
      input: { background: token('{semantic.surface.default}', 'color'), text: token('{semantic.text.primary}', 'color'), border: token('{semantic.border.default}', 'color'), focusRing: token('{semantic.action.focusRing}', 'color'), radius: token('{global.radius.md}', 'borderRadius') },
      card: { background: token('{semantic.surface.default}', 'color'), border: token('{semantic.border.subtle}', 'color'), radius: token('{global.radius.2xl}', 'borderRadius'), shadow: token('{global.shadow.sm}', 'boxShadow'), padding: token('{global.spacing.6}', 'dimension') },
    },
  };
}

export function downloadThemeTokens(themeName: string, isDark: boolean) {
  const json = JSON.stringify(createThemeTokenExport(themeName, isDark), null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `wozku-${themeName}-${isDark ? 'dark' : 'light'}-tokens.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
