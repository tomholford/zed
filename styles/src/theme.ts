import chroma from "chroma-js"
import {
    OutTheme,
    Theme,
} from "./types"

const UI_BASE_SIZE = 16

export enum FontWeight {
    Normal = "normal",
    Bold = "bold",
}

export enum FontFamily {
    Sans = "sans",
    Mono = "mono",
}

export enum FontSize {
    XXS = UI_BASE_SIZE * 0.625,
    XS = UI_BASE_SIZE * 0.75,
    SM = UI_BASE_SIZE * 0.875,
    MD = UI_BASE_SIZE,
    LG = UI_BASE_SIZE * 1.125,
}

export function with_opacity(color: string, opacity: number): string {
    return chroma(color).alpha(opacity).hex()
}

export const useTheme = (t: Theme): Theme => {
    const DEFAULT = {
        meta: {
            name: "Default",
            author: "WIP",
            url: "",
            appearance: "light",
            license: "WIP",
        },
        foreground: {
            default: "#000000",
            muted: "#666666",
            disabled: "#999999"
        },
        border: {
            default: {
                color: "#000000",
                width: 1,
            },
            muted: {
                color: "#666666",
                width: 1,
            },
            disabled: {
                color: "#999999",
                width: 1,
            }
        },
        container: {
            background: "#ffffff",
            surface: "#f5f5f5",
            panel: "#eeeeee",
            editor: "#ffffff",
            wash: "#000000"
        },
        elevation: {
            menu: {
                blur: 4,
                color: "rgba(0, 0, 0, 0.2)",
                offset: [2, 2]
            },
            popover: {
                blur: 6,
                color: "rgba(0, 0, 0, 0.2)",
                offset: [3, 4]
            },
            model: {
                blur: 8,
                color: "rgba(0, 0, 0, 0.2)",
                offset: [4, 6]
            }
        },
        shape: {
            default: 0,
            rounded: 4,
            "rounded.full": 9999
        },
        state: {
            hovered: 0.08,
            pressed: 0.16,
            active: 0.24,
            disabled: 0.04
        },
        player: {
            1: {
                cursor: "#ff0000",
                selection: "rgba(255, 0, 0, 0.2)",
            },
            2: {
                cursor: "#00ff00",
                selection: "rgba(0, 255, 0, 0.2)",
            },
            3: {
                cursor: "#0000ff",
                selection: "rgba(0, 0, 255, 0.2)",
            },
            4: {
                cursor: "#ffff00",
                selection: "rgba(255, 255, 0, 0.2)",
            },
            5: {
                cursor: "#00ffff",
                selection: "rgba(0, 255, 255, 0.2)",
            },
            6: {
                cursor: "#ff00ff",
                selection: "rgba(255, 0, 255, 0.2)",
            },
            7: {
                cursor: "#ffffff",
                selection: "rgba(255, 255, 255, 0.2)",
            },
            8: {
                cursor: "#000000",
                selection: "rgba(0, 0, 0, 0.2)",
            }
        }
    }

    return {
        ...DEFAULT,
        ...t,
    }
}

export const useUIColor = (tui: Theme['ui']): OutTheme['ui'] => {
    const DEFAULT: Required<Theme['ui']> = {
        "editor.background": "#65fe08",
        "editor.active_line": "#65fe08",
    }

    return {
        ...DEFAULT,
        ...tui
    }
}
