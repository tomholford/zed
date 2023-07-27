import { Theme } from "src/types"

export const theme: Theme = {
    name: "One Dark",
    is_light: false,

    meta: {
        name: "One Dark",
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
    }
}
