import { FontSize, FontWeight, useTheme, with_opacity } from "src/theme"
import { interactive, Interactive } from "./interactive"
import { toggleable } from "./toggle"

export { interactive, Interactive, toggleable }

import { TextStyle, Theme } from "src/types"

type TextVariant = "prose" | "list" | "label" | "small_label" | "code" | "tooltip"

export const text = (textStyle: TextVariant, color?: keyof Theme['foreground']): TextStyle => {
    const theme = useTheme()

    switch (textStyle) {
        case "label":
            return {
                family: "mono",
                color: color ? theme.foreground[color] : theme.foreground.default,
                size: FontSize.XS,
                weight: FontWeight.Normal,
            }
        default:
            throw new Error(`Unknown text style: ${textStyle}`)
    }
}

export namespace textStyle {
    export const Label = text("label")
}

export namespace containerStyle {
    export const Background = useTheme().container.background
    export const Surface = useTheme().container.surface
    export const Panel = useTheme().container.panel
    export const Editor = useTheme().container.editor
    export const Wash = useTheme().container.wash
}

export const stateStyle = (c: string, state: keyof Theme['state']): string => {
    return with_opacity(c, useTheme().state[state])
}
