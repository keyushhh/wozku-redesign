import { oklch, formatHex, rgb, Oklch } from 'culori';

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  650: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface DesignTokens {
  color: {
    primary: ColorScale;
    secondary: ColorScale;
    accent: ColorScale;
  };
}

export type HarmonyStrategy = 'analogous' | 'complementary' | 'triadic' | 'split-complementary';

/**
 * Standardizes a hue angle to [0, 360).
 */
function normalizeHue(h: number | undefined): number {
  if (h === undefined || isNaN(h)) return 0;
  return (h % 360 + 360) % 360;
}

/**
 * Generates a full 50-950 scale from a single base Hex color using OKLCH interpolation.
 */
export function generateScale(baseHex: string): ColorScale {
  const baseColor = oklch(baseHex);
  if (!baseColor) {
    throw new Error(`Invalid base hex color: ${baseHex}`);
  }

  // Base values in OKLCH
  const lBase = baseColor.l ?? 0.5;
  const cBase = baseColor.c ?? 0;
  const hBase = normalizeHue(baseColor.h);

  // Targets for the ends of the scale
  const lLightTarget = 0.98;
  const cLightTarget = Math.min(cBase * 0.1, 0.015);

  const lDarkTarget = 0.08;
  const cDarkTarget = Math.min(cBase * 0.25, 0.035);

  // Interpolation weights (0 = base color, 1 = extreme target)
  const lightWeights = {
    400: 0.22,
    300: 0.48,
    200: 0.70,
    100: 0.86,
    50: 0.96,
  };

  const darkWeights = {
    600: 0.22,
    650: 0.34,
    700: 0.46,
    800: 0.70,
    900: 0.86,
    950: 0.96,
  };

  const scale: Partial<ColorScale> = {};

  // Step 500 is exactly the base color
  scale[500] = formatHex(baseColor) || baseHex;

  // Generate lighter steps (50 - 400)
  Object.entries(lightWeights).forEach(([step, weight]) => {
    const l = lBase + (lLightTarget - lBase) * weight;
    const c = cBase + (cLightTarget - cBase) * weight;
    const h = hBase;
    const colorObj: Oklch = { mode: 'oklch', l, c, h };
    scale[Number(step) as keyof ColorScale] = formatHex(colorObj) || '#ffffff';
  });

  // Generate darker steps (600 - 950)
  Object.entries(darkWeights).forEach(([step, weight]) => {
    const l = lBase + (lDarkTarget - lBase) * weight;
    const c = cBase + (cDarkTarget - cBase) * weight;
    const h = hBase;
    const colorObj: Oklch = { mode: 'oklch', l, c, h };
    scale[Number(step) as keyof ColorScale] = formatHex(colorObj) || '#000000';
  });

  return scale as ColorScale;
}

/**
 * Derives secondary and accent colors from a primary hex color using hue rotation in OKLCH.
 */
export function deriveHarmonizedColors(
  primaryHex: string,
  strategy: HarmonyStrategy
): { secondaryHex: string; accentHex: string } {
  const primaryOklch = oklch(primaryHex);
  if (!primaryOklch) {
    throw new Error(`Invalid primary hex color: ${primaryHex}`);
  }

  const h = normalizeHue(primaryOklch.h);
  const l = primaryOklch.l ?? 0.5;
  const c = primaryOklch.c ?? 0.15;

  let secondaryHue = h;
  let accentHue = h;

  switch (strategy) {
    case 'analogous':
      secondaryHue = h + 30;
      accentHue = h - 30;
      break;
    case 'complementary':
      secondaryHue = h + 180;
      accentHue = h + 30; // Analogous secondary accent for depth
      break;
    case 'triadic':
      secondaryHue = h + 120;
      accentHue = h + 240;
      break;
    case 'split-complementary':
      secondaryHue = h + 150;
      accentHue = h + 210;
      break;
  }

  const secondaryColorObj: Oklch = {
    mode: 'oklch',
    l,
    c,
    h: normalizeHue(secondaryHue),
  };

  const accentColorObj: Oklch = {
    mode: 'oklch',
    l,
    c: Math.min(c * 1.15, 0.3), // slightly more vibrant accent
    h: normalizeHue(accentHue),
  };

  return {
    secondaryHex: formatHex(secondaryColorObj) || primaryHex,
    accentHex: formatHex(accentColorObj) || primaryHex,
  };
}

/**
 * Generates a full design token set (primary, secondary, accent scales) from a single primary hex color.
 */
export function generateDesignTokens(
  primaryHex: string,
  strategy: HarmonyStrategy
): DesignTokens {
  const primaryScale = generateScale(primaryHex);
  const { secondaryHex, accentHex } = deriveHarmonizedColors(primaryHex, strategy);

  const secondaryScale = generateScale(secondaryHex);
  const accentScale = generateScale(accentHex);

  return {
    color: {
      primary: primaryScale,
      secondary: secondaryScale,
      accent: accentScale,
    },
  };
}

/**
 * Exports DesignTokens in the format expected by Tokens Studio (Figma Tokens).
 */
export function exportToTokensStudioFormat(tokens: DesignTokens) {
  const result: Record<string, any> = {
    color: {
      primary: {},
      secondary: {},
      accent: {},
    },
  };

  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

  steps.forEach((step) => {
    result.color.primary[step] = {
      value: tokens.color.primary[step],
      type: 'color',
    };
    result.color.secondary[step] = {
      value: tokens.color.secondary[step],
      type: 'color',
    };
    result.color.accent[step] = {
      value: tokens.color.accent[step],
      type: 'color',
    };
  });

  return result;
}
