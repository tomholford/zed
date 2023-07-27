import { Theme } from "src/types"

const color = {
    Base: "#191724",
    Surface: "#1f1d2e",
    Overlay: "#26233a",
    Muted: "#6e6a86",
    Subtle: "#908caa",
    Text: "#e0def4",
    Love: "#eb6f92",
    Gold: "#f6c177",
    Rose: "#ebbcba",
    Pine: "#31748f",
    Foam: "#9ccfd8",
    Iris: "#c4a7e7",
    HighlightLow: "#21202e",
    HighlightMed: "#403d52",
    HighlightHigh: "#524f67",
}

export const theme: Theme = {
    name: "Rosé Pine",
    is_light: false,

    meta: {
        name: "Rosé Pine",
        author: "edunfelt",
        url: "https://rosepinetheme.com/",
        appearance: "dark",
        license: `${__dirname}/LICENSE`
    },
    foreground: {
        default: "#e0def4",
        muted: "#908caa",
        disabled: "#6e6a86"
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
        background: "#191724",
        surface: "#26233a",
        panel: "#1f1d2e",
        editor: "#191724",
        wash: "#26233a"
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
            cursor: "#31748f",
            selection: "rgba(255, 0, 0, 0.2)",
        },
        2: {
            cursor: "#eb6f92",
            selection: "rgba(0, 255, 0, 0.2)",
        },
        3: {
            cursor: "#f6c177",
            selection: "rgba(0, 0, 255, 0.2)",
        },
        4: {
            cursor: "#ebbcba",
            selection: "rgba(255, 255, 0, 0.2)",
        },
        5: {
            cursor: "#9ccfd8",
            selection: "rgba(0, 255, 255, 0.2)",
        },
        6: {
            cursor: "#c4a7e7",
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
    },
    ui: {
        "editor.background": color.Base,
        "editor.active_line": color.HighlightLow,
    }
}
