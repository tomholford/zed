import chroma from "chroma-js";

enum ThemeAppearance {
    Light = "light",
    Dark = "dark",
}

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

function getColorForContrast(a: chroma.Color, b: chroma.Color, targetContrast: number): chroma.Color {
    const startingContrast = chroma.contrast(a, b)

    let initialShiftDirection: "darken" | "lighten"
    const initialShiftAmount = Math.abs(startingContrast - targetContrast)

    if (startingContrast === targetContrast) {
        return b
    } else {
        if (startingContrast > targetContrast) {
            initialShiftDirection = "darken"
        } else {
            initialShiftDirection = "lighten"
        }
    }

    let shiftAmount = initialShiftAmount
    let shiftDirection = initialShiftDirection
    let currentIteration = 0
    let currentB = b

    while (Math.abs(chroma.contrast(a, currentB) - targetContrast) > 0.05) {
        if (currentIteration > 100) {
            console.log("=== Iteration limit reached ===")
            break
        }
        if (shiftDirection === "darken") console.log("=== Next: Darkening ===")
        if (shiftDirection === "lighten") console.log("=== Next: Lightening ===")

        if (shiftAmount > 1) {
            currentB = shiftDirection === "darken" ? currentB.darken(0.5) : currentB.brighten(0.5)
        }

        if (shiftAmount < 1 && shiftAmount > 0) {
            currentB = shiftDirection === "darken" ? currentB.darken(0.1) : currentB.brighten(0.1)
        }

        const currentContrast = chroma.contrast(a, currentB)
        shiftAmount = currentContrast - targetContrast
        shiftDirection = currentContrast > targetContrast ? "darken" : "lighten"
        currentIteration++

        console.log(
            `Current contrast: ${currentContrast} | Target contrast: ${targetContrast} | Shift amount: ${shiftAmount} | Shift direction: ${shiftDirection} | Iteration: ${currentIteration}`
        )
    }

    return currentB
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
            get BORDER() { return getColorForContrast(this.BASE, this.PRIMARY, CONTRASTS.BORDER); },
            SURFACE: chroma('#0f172a'),
            get SURFACE_BORDER() { return getColorForContrast(this.SURFACE, this.PRIMARY, CONTRASTS.BORDER); },
            SURFACE_VARIANT: chroma('#1e293b'),
            get SURFACE_VARIANT_BORDER() { return getColorForContrast(this.SURFACE_VARIANT, this.PRIMARY, CONTRASTS.BORDER); },
            PRIMARY: chroma(theme.primary),
            get SUBTLE() { return getColorForContrast(this.BASE, this.PRIMARY, CONTRASTS.SUBTLE); },
            get MUTED() { return getColorForContrast(this.BASE, this.PRIMARY, CONTRASTS.MUTED); },
            get MINIMUM() { return getColorForContrast(this.BASE, this.PRIMARY, CONTRASTS.MINIMUM); },
            SEMANTIC_RED: chroma('#dc2626'),
            get SEMANTIC_RED_VARIANT() { return getColorForContrast(this.BASE, this.SEMANTIC_RED, CONTRASTS.SUBTLE); },
            get SEMANTIC_RED_TINT() { return getColorForContrast(this.BASE, this.SEMANTIC_RED, CONTRASTS.TINT); },
            SEMANTIC_YELLOW: chroma('#eab308'),
            get SEMANTIC_YELLOW_VARIANT() { return getColorForContrast(this.BASE, this.SEMANTIC_YELLOW, CONTRASTS.SUBTLE); },
            get SEMANTIC_YELLOW_TINT() { return getColorForContrast(this.BASE, this.SEMANTIC_YELLOW, CONTRASTS.TINT); },
            SEMANTIC_GREEN: chroma('#16a34a'),
            get SEMANTIC_GREEN_VARIANT() { return getColorForContrast(this.BASE, this.SEMANTIC_GREEN, CONTRASTS.SUBTLE); },
            get SEMANTIC_GREEN_TINT() { return getColorForContrast(this.BASE, this.SEMANTIC_GREEN, CONTRASTS.TINT); },
            SEMANTIC_BLUE: chroma('#2563eb'),
            get SEMANTIC_BLUE_VARIANT() { return getColorForContrast(this.BASE, this.SEMANTIC_BLUE, CONTRASTS.SUBTLE); },
            get SEMANTIC_BLUE_TINT() { return getColorForContrast(this.BASE, this.SEMANTIC_BLUE, CONTRASTS.TINT); },
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

export const TOKEN = {
    BASE: TOKEN_VALUES.COLOR.BASE.hex(),
    BORDER: TOKEN_VALUES.COLOR.BORDER.hex(),
    SURFACE: TOKEN_VALUES.COLOR.SURFACE.hex(),
    SURFACE_BORDER: TOKEN_VALUES.COLOR.SURFACE_BORDER.hex(),
    SURFACE_VARIANT: TOKEN_VALUES.COLOR.SURFACE_VARIANT.hex(),
    SURFACE_VARIANT_BORDER: TOKEN_VALUES.COLOR.SURFACE_VARIANT_BORDER.hex(),
    PRIMARY: TOKEN_VALUES.COLOR.PRIMARY.hex(),
    SUBTLE: TOKEN_VALUES.COLOR.SUBTLE.hex(),
    MUTED: TOKEN_VALUES.COLOR.MUTED.hex(),
    MINIMUM: TOKEN_VALUES.COLOR.MINIMUM.hex(),
    SEMANTIC_RED: TOKEN_VALUES.COLOR.SEMANTIC_RED.hex(),
    SEMANTIC_RED_VARIANT: TOKEN_VALUES.COLOR.SEMANTIC_RED_VARIANT.hex(),
    SEMANTIC_RED_TINT: TOKEN_VALUES.COLOR.SEMANTIC_RED_TINT.hex(),
    SEMANTIC_YELLOW: TOKEN_VALUES.COLOR.SEMANTIC_YELLOW.hex(),
    SEMANTIC_YELLOW_VARIANT: TOKEN_VALUES.COLOR.SEMANTIC_YELLOW_VARIANT.hex(),
    SEMANTIC_YELLOW_TINT: TOKEN_VALUES.COLOR.SEMANTIC_YELLOW_TINT.hex(),
    SEMANTIC_GREEN: TOKEN_VALUES.COLOR.SEMANTIC_GREEN.hex(),
    SEMANTIC_GREEN_VARIANT: TOKEN_VALUES.COLOR.SEMANTIC_GREEN_VARIANT.hex(),
    SEMANTIC_GREEN_TINT: TOKEN_VALUES.COLOR.SEMANTIC_GREEN_TINT.hex(),
    SEMANTIC_BLUE: TOKEN_VALUES.COLOR.SEMANTIC_BLUE.hex(),
    SEMANTIC_BLUE_VARIANT: TOKEN_VALUES.COLOR.SEMANTIC_BLUE_VARIANT.hex(),
    SEMANTIC_BLUE_TINT: TOKEN_VALUES.COLOR.SEMANTIC_BLUE_TINT.hex(),
    THEME_1: TOKEN_VALUES.COLOR.THEME_1.hex(),
    THEME_2: TOKEN_VALUES.COLOR.THEME_2.hex(),
    THEME_3: TOKEN_VALUES.COLOR.THEME_3.hex(),
    THEME_4: TOKEN_VALUES.COLOR.THEME_4.hex(),
    THEME_5: TOKEN_VALUES.COLOR.THEME_5.hex(),
    THEME_6: TOKEN_VALUES.COLOR.THEME_6.hex(),
    THEME_7: TOKEN_VALUES.COLOR.THEME_7.hex(),
    THEME_8: TOKEN_VALUES.COLOR.THEME_8.hex(),
    TERMINAL_BLACK: TOKEN_VALUES.COLOR.TERMINAL_BLACK.hex(),
    TERMINAL_BRIGHT_BLACK: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_BLACK.hex(),
    TERMINAL_RED: TOKEN_VALUES.COLOR.TERMINAL_RED.hex(),
    TERMINAL_BRIGHT_RED: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_RED.hex(),
    TERMINAL_GREEN: TOKEN_VALUES.COLOR.TERMINAL_GREEN.hex(),
    TERMINAL_BRIGHT_GREEN: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_GREEN.hex(),
    TERMINAL_YELLOW: TOKEN_VALUES.COLOR.TERMINAL_YELLOW.hex(),
    TERMINAL_BRIGHT_YELLOW: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_YELLOW.hex(),
    TERMINAL_BLUE: TOKEN_VALUES.COLOR.TERMINAL_BLUE.hex(),
    TERMINAL_BRIGHT_BLUE: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_BLUE.hex(),
    TERMINAL_MAGENTA: TOKEN_VALUES.COLOR.TERMINAL_MAGENTA.hex(),
    TERMINAL_BRIGHT_MAGENTA: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_MAGENTA.hex(),
    TERMINAL_CYAN: TOKEN_VALUES.COLOR.TERMINAL_CYAN.hex(),
    TERMINAL_BRIGHT_CYAN: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_CYAN.hex(),
    TERMINAL_WHITE: TOKEN_VALUES.COLOR.TERMINAL_WHITE.hex(),
    TERMINAL_BRIGHT_WHITE: TOKEN_VALUES.COLOR.TERMINAL_BRIGHT_WHITE.hex(),
    SHADOW_LEVEL_1: TOKEN_VALUES.COLOR.SHADOW_LEVEL_1.hex(),
    SHADOW_LEVEL_2: TOKEN_VALUES.COLOR.SHADOW_LEVEL_2.hex(),
}

// console.log(JSON.stringify(TOKEN, null, 2))
// console.log(adjustColor(chroma('#1e293b'), chroma('#f8fafc'), CONTRASTS.BORDER, ThemeAppearance.Dark, 'darken'))
export const border = getColorForContrast(TOKEN_VALUES.COLOR.BASE, TOKEN_VALUES.COLOR.PRIMARY, CONTRASTS.BORDER)
