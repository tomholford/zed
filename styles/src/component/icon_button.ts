import { Toggleable } from "src/element/toggle"
import { Interactive, interactive, toggleable } from "../element"
import { background, foreground } from "../style_tree/components"
import { useTheme, Theme } from "../theme"

export type Margin = {
    top: number
    bottom: number
    left: number
    right: number
}

interface IconButtonOptions {
    layer?:
    | Theme["lowest"]
    | Theme["middle"]
    | Theme["highest"]
    color?: keyof Theme["lowest"]
    margin?: Partial<Margin>
    icon?: string
    /**
    * Hack: We still have a mix of flattend and unflattened elements in the theme
    * This is a temporary solution to make the toggleable icon button work with both
    */
    flattened?: boolean
}

type IconStyle = {
    asset: string;
    color: string;
    dimensions: {
        width: number;
        height: number;
    };
}

type ToggleableIconButtonOptions = IconButtonOptions & {
    active_color?: keyof Theme["lowest"]
    icon?: string
    active_icon?: string
    /**
    * Hack: We still have a mix of flattend and unflattened elements in the theme
    * This is a temporary solution to make the toggleable icon button work with both
    */
    style?: "flattened" | "unflattened"
}

export function icon_button({ icon, color, margin, layer, flattened = true }: IconButtonOptions) {
    const theme = useTheme()

    if (!color) color = "base"

    const icon_style: IconStyle = {
        asset: icon ?? "",
        color: foreground(layer ?? theme.lowest, color),
        dimensions: {
            width: 14,
            height: 14,
        }
    }

    const m = {
        top: margin?.top ?? 0,
        bottom: margin?.bottom ?? 0,
        left: margin?.left ?? 0,
        right: margin?.right ?? 0,
    }

    const container = {
        corner_radius: 6,
        padding: {
            top: 2,
            bottom: 2,
            left: 4,
            right: 4,
        },
        margin: m,
        icon_width: 14,
        icon_height: 14,
        button_width: 20,
        button_height: 16,
    }

    if (flattened) return interactive({
        state: {
            default: {
                ...container,
                color: foreground(layer ?? theme.lowest, color),
                icon: icon_style
            },
            hovered: {
                background: background(layer ?? theme.lowest, color, "hovered"),
                color: foreground(layer ?? theme.lowest, color, "hovered"),
            },
            clicked: {
                background: background(layer ?? theme.lowest, color, "pressed"),
                color: foreground(layer ?? theme.lowest, color, "pressed"),
            },
        },
    })

    return interactive({
        state: {
            default: {
                container: {
                    ...container,
                },
                icon: icon_style
            },
            hovered: {
                container: {
                    background: background(layer ?? theme.lowest, color, "hovered"),
                    color: foreground(layer ?? theme.lowest, color, "hovered"),
                }
            },
            clicked: {
                container: {
                    background: background(layer ?? theme.lowest, color, "pressed"),
                    color: foreground(layer ?? theme.lowest, color, "pressed"),
                }
            },
        }
    })
}

export function toggleable_icon_button(
    theme: Theme,
    { icon, active_icon, color, active_color, margin, flattened = true }: ToggleableIconButtonOptions
) {
    if (!color) color = "base"

    return toggleable({
        state: {
            inactive: icon_button({ icon, color, margin, flattened }),
            active: icon_button({
                icon: active_icon,
                color: active_color ? active_color : color,
                margin,
                layer: theme.middle,
                flattened
            }),
        },
    })
}
