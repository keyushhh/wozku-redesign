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

const figmaScopes = { 'com.figma.scopes': ['ALL_SCOPES'] };

function figmaToken(type: 'number' | 'string', value: number | string) {
  return { $type: type, $value: value, $extensions: figmaScopes };
}

function figmaColorToken(hex: string) {
  const normalized = hex.trim().toUpperCase();
  const match = /^#([0-9A-F]{6})$/.exec(normalized);
  if (!match) throw new Error(`Expected a six-digit hex color, received: ${hex}`);
  const value = match[1];
  const component = (start: number) => Number((parseInt(value.slice(start, start + 2), 16) / 255).toFixed(6));
  return {
    $type: 'color',
    $value: { colorSpace: 'srgb', components: [component(0), component(2), component(4)], alpha: 1, hex: `#${value}` },
    $extensions: figmaScopes,
  };
}

function cssLengthToNumber(value: string) {
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) throw new Error(`Expected a numeric CSS value, received: ${value}`);
  return value.endsWith('rem') ? parsed * 16 : parsed;
}

function titleCase(value: string) {
  return value.replace(/(^|[-_\s])(\w)/g, (_, prefix, character) => `${prefix}${character.toUpperCase()}`);
}

/** Creates a native Figma Variables JSON file from the active UI theme. */
export function createThemeTokenExport(themeName: string, isDark: boolean) {
  const styles = getComputedStyle(document.documentElement);
  const color = (name: string) => styles.getPropertyValue(name).trim();
  const scale = (name: string) => Object.fromEntries(COLOR_STEPS.map((step) => [String(step), figmaColorToken(color(`--${name}-${step}`))]));

  return {
    $extensions: { 'com.figma.modeName': `${titleCase(themeName)} ${isDark ? 'Dark' : 'Light'}` },
    color: {
      brand: { primary: scale('indigo'), secondary: scale('secondary'), accent: scale('accent') },
      neutral: Object.fromEntries(neutralSteps.map((step) => [String(step), figmaColorToken(color(`--neutral-${step}`))])),
      fixed: { white: figmaColorToken('#ffffff'), light: figmaColorToken('#c7c7d1'), muted: figmaColorToken('#9696a3'), dark: figmaColorToken('#141418') },
    },
    typography: {
      fontFamily: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.typography.fontFamily).map(([key, value]) => [key, figmaToken('string', value)])),
      fontSize: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.typography.fontSize).map(([key, value]) => [key, figmaToken('number', cssLengthToNumber(value))])),
      fontWeight: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.typography.fontWeight).map(([key, value]) => [key, figmaToken('number', Number(value))])),
      lineHeight: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.typography.lineHeight).map(([key, value]) => [key, figmaToken('number', Number(value))])),
    },
    spacing: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.spacing).map(([key, value]) => [key, figmaToken('number', cssLengthToNumber(value))])),
    radius: Object.fromEntries(Object.entries(DESIGN_FOUNDATIONS.radius).map(([key, value]) => [key, figmaToken('number', cssLengthToNumber(value))])),
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
