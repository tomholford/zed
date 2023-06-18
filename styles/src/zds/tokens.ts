import chroma from "chroma-js";
import { ThemeAppearance } from "../theme";

function contrast(a: chroma.Color, b: chroma.Color) {
    return chroma.contrast(a, b);
}

// TODO: Make this work for light mode as well
function adjustColor(
    base: chroma.Color,
    primary: chroma.Color,
    targetContrast: number,
    appearance: ThemeAppearance,
    mode: 'darken' | 'lighten' = 'lighten',
): chroma.Color {
    let currentColor = primary;
    let iterationCount = 0;

    const isWhiteOrBlack = (color: chroma.Color) => {
        const [r, g, b, a] = color.rgba();
        return (r === 255 && g === 255 && b === 255 && a === 1) || (r === 0 && g === 0 && b === 0 && a === 1);
    };

    const adjustColorByMode = (color: chroma.Color, mode: 'darken' | 'lighten') => {
        return mode === 'lighten' ? chroma(color).brighten(0.05) : chroma(color).darken(0.05);
    };

    while (iterationCount <= 150) {
        const currentContrast = contrast(base, currentColor);
        // Check if the contrast ratio is within the acceptable range
        if (Math.abs(currentContrast - targetContrast) <= 0.05 || isWhiteOrBlack(currentColor)) {
            break;
        }

        currentColor = adjustColorByMode(currentColor, mode);

        // Don't remove this while developing the function
        console.log(currentColor.hex(), currentContrast, targetContrast, iterationCount)
        iterationCount++;
    }

    if (iterationCount > 150) {
        throw new Error(`Something doesn't seem right... The adjustColor function exceeded 150 iterations.`);
    }

    return currentColor;
}

interface ThemeInputColors {
    base: chroma.Color;
    primary: chroma.Color;
    appearance: ThemeAppearance;
}

export enum CONTRASTS {
    BORDER = 1.2,
    TINT = 1.2,
    MINIMUM = 2.5,
    MUTED = 4,
    SUBTLE = 5.5,
    PRIMARY = 7,
};

const TOKEN_OBJECT = (theme: ThemeInputColors) => {
    return {
        COLOR: {
            BASE: chroma(theme.base),
            get BORDER() { return adjustColor(this.BASE, this.PRIMARY, CONTRASTS.BORDER, theme.appearance, 'lighten'); },
            SURFACE: chroma('#0f172a'),
            get SURFACE_BORDER() { return adjustColor(this.SURFACE, this.PRIMARY, CONTRASTS.BORDER, theme.appearance, 'darken'); },
            SURFACE_VARIANT: chroma('#1e293b'),
            get SURFACE_VARIANT_BORDER() { return adjustColor(this.SURFACE_VARIANT, this.PRIMARY, CONTRASTS.BORDER, theme.appearance, 'darken'); },
            PRIMARY: chroma(theme.primary),
            get SUBTLE() { return adjustColor(this.BASE, this.PRIMARY, CONTRASTS.SUBTLE, theme.appearance, 'darken'); },
            get MUTED() { return adjustColor(this.BASE, this.PRIMARY, CONTRASTS.MUTED, theme.appearance, 'darken'); },
            get MINIMUM() { return adjustColor(this.BASE, this.PRIMARY, CONTRASTS.MINIMUM, theme.appearance, 'darken'); },
            SEMANTIC_RED: chroma('#dc2626'),
            get SEMANTIC_RED_VARIANT() { return adjustColor(this.BASE, this.SEMANTIC_RED, CONTRASTS.SUBTLE, theme.appearance, 'darken'); },
            get SEMANTIC_RED_TINT() { return adjustColor(this.BASE, this.SEMANTIC_RED, CONTRASTS.TINT, theme.appearance, 'darken'); },
            SEMANTIC_YELLOW: chroma('#eab308'),
            get SEMANTIC_YELLOW_VARIANT() { return adjustColor(this.BASE, this.SEMANTIC_YELLOW, CONTRASTS.SUBTLE, theme.appearance, 'darken'); },
            get SEMANTIC_YELLOW_TINT() { return adjustColor(this.BASE, this.SEMANTIC_YELLOW, CONTRASTS.TINT, theme.appearance, 'darken'); },
            SEMANTIC_GREEN: chroma('#16a34a'),
            get SEMANTIC_GREEN_VARIANT() { return adjustColor(this.BASE, this.SEMANTIC_GREEN, CONTRASTS.SUBTLE, theme.appearance, 'darken'); },
            get SEMANTIC_GREEN_TINT() { return adjustColor(this.BASE, this.SEMANTIC_GREEN, CONTRASTS.TINT, theme.appearance, 'darken'); },
            SEMANTIC_BLUE: chroma('#2563eb'),
            get SEMANTIC_BLUE_VARIANT() { return adjustColor(this.BASE, this.SEMANTIC_BLUE, CONTRASTS.SUBTLE, theme.appearance, 'darken'); },
            get SEMANTIC_BLUE_TINT() { return adjustColor(this.BASE, this.SEMANTIC_BLUE, CONTRASTS.TINT, theme.appearance, 'darken'); },
            THEME_1: chroma('#2563eb'),
            THEME_2: chroma('#ea580c'),
            THEME_3: chroma('#84cc16'),
            THEME_4: chroma('#8b5cf6'),
            THEME_5: chroma('#db2777'),
            THEME_6: chroma('#06b6d4'),
            THEME_7: chroma('#84cc16'),
            THEME_8: chroma('#dc2626'),
            TERMINAL_BLACK: chroma('#0a0a0a'),
            TERMINAL_BRIGHT_BLACK: chroma('#404040'),
            TERMINAL_RED: chroma('#dc2626'),
            TERMINAL_BRIGHT_RED: chroma('#f87171'),
            TERMINAL_GREEN: chroma('#65a30d'),
            TERMINAL_BRIGHT_GREEN: chroma('#a3e635'),
            TERMINAL_YELLOW: chroma('#ca8a04'),
            TERMINAL_BRIGHT_YELLOW: chroma('#facc15'),
            TERMINAL_BLUE: chroma('#2563eb'),
            TERMINAL_BRIGHT_BLUE: chroma('#60a5fa'),
            TERMINAL_MAGENTA: chroma('#5b21b6'),
            TERMINAL_BRIGHT_MAGENTA: chroma('#c084fc'),
            TERMINAL_CYAN: chroma('#0f766e'),
            TERMINAL_BRIGHT_CYAN: chroma('#2dd4bf'),
            TERMINAL_WHITE: chroma('#d4d4d4'),
            TERMINAL_BRIGHT_WHITE: chroma('#fafafa'),
            get SHADOW_LEVEL_1() { return this.BASE.alpha(0.12); },
            get SHADOW_LEVEL_2() { return this.BASE.alpha(0.24); },
        }
    }
};

export const TOKEN_VALUES = TOKEN_OBJECT({
    base: chroma('#0f172a'),
    primary: chroma('#f8fafc'),
    appearance: ThemeAppearance.Dark,
})

const TOKEN = {
    BASE: TOKEN_VALUES.COLOR.BASE.rgba(),
    BORDER: TOKEN_VALUES.COLOR.BORDER.rgba(),
    SURFACE: TOKEN_VALUES.COLOR.SURFACE.rgba(),
    SURFACE_BORDER: TOKEN_VALUES.COLOR.SURFACE_BORDER.rgba(),
    SURFACE_VARIANT: TOKEN_VALUES.COLOR.SURFACE_VARIANT.rgba(),
    SURFACE_VARIANT_BORDER: TOKEN_VALUES.COLOR.SURFACE_VARIANT_BORDER.rgba(),
    PRIMARY: TOKEN_VALUES.COLOR.PRIMARY.rgba(),
    SUBTLE: TOKEN_VALUES.COLOR.SUBTLE.rgba(),
    MUTED: TOKEN_VALUES.COLOR.MUTED.rgba(),
    MINIMUM: TOKEN_VALUES.COLOR.MINIMUM.rgba(),
    SEMANTIC_RED: TOKEN_VALUES.COLOR.SEMANTIC_RED.rgba(),
    SEMANTIC_RED_VARIANT: TOKEN_VALUES.COLOR.SEMANTIC_RED_VARIANT.rgba(),
    SEMANTIC_RED_TINT: TOKEN_VALUES.COLOR.SEMANTIC_RED_TINT.rgba(),
    SEMANTIC_YELLOW: TOKEN_VALUES.COLOR.SEMANTIC_YELLOW.rgba(),
    SEMANTIC_YELLOW_VARIANT: TOKEN_VALUES.COLOR.SEMANTIC_YELLOW_VARIANT.rgba(),
    SEMANTIC_YELLOW_TINT: TOKEN_VALUES.COLOR.SEMANTIC_YELLOW_TINT.rgba(),
    SEMANTIC_GREEN: TOKEN_VALUES.COLOR.SEMANTIC_GREEN.rgba(),
    SEMANTIC_GREEN_VARIANT: TOKEN_VALUES.COLOR.SEMANTIC_GREEN_VARIANT.rgba(),
    SEMANTIC_GREEN_TINT: TOKEN_VALUES.COLOR.SEMANTIC_GREEN_TINT.rgba(),
    SEMANTIC_BLUE: TOKEN_VALUES.COLOR.SEMANTIC_BLUE.rgba(),
    SEMANTIC_BLUE_VARIANT: TOKEN_VALUES.COLOR.SEMANTIC_BLUE_VARIANT.rgba(),
    SEMANTIC_BLUE_TINT: TOKEN_VALUES.COLOR.SEMANTIC_BLUE_TINT.rgba(),
    THEME_1: TOKEN_VALUES.COLOR.THEME_1.rgba(),
    THEME_2: TOKEN_VALUES.COLOR.THEME_2.rgba(),
    THEME_3: TOKEN_VALUES.COLOR.THEME_3.rgba(),
    THEME_4: TOKEN_VALUES.COLOR.THEME_4.rgba(),
    THEME_5: TOKEN_VALUES.COLOR.THEME_5.rgba(),
    THEME_6: TOKEN_VALUES.COLOR.THEME_6.rgba(),
    THEME_7: TOKEN_VALUES.COLOR.THEME_7.rgba(),
    THEME_8: TOKEN_VALUES.COLOR.THEME_8.rgba(),
    TERMINAL_BLACK: TOKEN_VALUES.COLOR.TERMINAL_BLACK.rgba(),
    TERMINAL_BRIGHT_BLACK: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_BLACK.rgba(),
    TERMINAL_RED: TOKEN_VALUES.COLOR.TERMINAL_RED.rgba(),
    TERMINAL_BRIGHT_RED: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_RED.rgba(),
    TERMINAL_GREEN: TOKEN_VALUES.COLOR.TERMINAL_GREEN.rgba(),
    TERMINAL_BRIGHT_GREEN: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_GREEN.rgba(),
    TERMINAL_YELLOW: TOKEN_VALUES.COLOR.TERMINAL_YELLOW.rgba(),
    TERMINAL_BRIGHT_YELLOW: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_YELLOW.rgba(),
    TERMINAL_BLUE: TOKEN_VALUES.COLOR.TERMINAL_BLUE.rgba(),
    TERMINAL_BRIGHT_BLUE: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_BLUE.rgba(),
    TERMINAL_MAGENTA: TOKEN_VALUES.COLOR.TERMINAL_MAGENTA.rgba(),
    TERMINAL_BRIGHT_MAGENTA: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_MAGENTA.rgba(),
    TERMINAL_CYAN: TOKEN_VALUES.COLOR.TERMINAL_CYAN.rgba(),
    TERMINAL_BRIGHT_CYAN: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_CYAN.rgba(),
    TERMINAL_WHITE: TOKEN_VALUES.COLOR.TERMINAL_WHITE.rgba(),
    TERMINAL_BRIGHT_WHITE: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_WHITE.rgba(),
    SHADOW_LEVEL_1: TOKEN_VALUES.COLOR.SHADOW_LEVEL_1.rgba(),
    SHADOW_LEVEL_2: TOKEN_VALUES.COLOR.SHADOW_LEVEL_2.rgba(),
}

// console.log(JSON.stringify(TOKEN, null, 2))
console.log(adjustColor(chroma('#1e293b'), chroma('#f8fafc'), CONTRASTS.BORDER, ThemeAppearance.Dark, 'darken'))
