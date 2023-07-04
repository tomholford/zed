import { Border, BorderProperties } from "src/style_tree/components"
import { useTheme } from "."
import { with_opacity } from "./color"

// Higher level surfaces are a higher Intensity
// Dark: higher surface = lighter
// Light: higher surface = darker
export type SurfaceLevel = 0 | 1 | 2
export type SurfaceName =
    | "background"
    | "panel"
    | "pane"
    | "editor"
    | "popover"
    | "modal"
    | "tooltip"

export enum Surface {
    Background = 1,
    Panel = 1,
    Pane = 1,
    Editor = 0,
    Popover = 2,
    Modal = 2,
    Tooltip = 2,
}

export type SurfaceStyle = {
    background: string
    border: Border
}

const DEFAULT_BORDER_PROPERTIES: Required<BorderProperties> = {
    width: 1,
    top: true,
    bottom: true,
    left: true,
    right: true,
    overlay: false,
} as const

function buildSurfaceStyle(surface: Surface, alpha?: boolean): SurfaceStyle {
    const theme = useTheme()
    const scaling = {
        background: 0,
        border: 12
    }

    const neutral = theme.ramps.neutral

    const background = alpha
        ? with_opacity(neutral(surface).hex(), scaling.background)
        : neutral(surface * scaling.background).hex()
    const border: Border = {
        ...DEFAULT_BORDER_PROPERTIES,
        color: alpha
            ? with_opacity(neutral(surface).hex(), scaling.border)
            : neutral(surface * scaling.border).hex(),
    }

    return {
        background,
        border
    }
}

function buildSurfaceLevels() {
    const surface = {
        background: buildSurfaceStyle(Surface.Background),
        panel: buildSurfaceStyle(Surface.Panel),
        pane: buildSurfaceStyle(Surface.Pane),
        editor: buildSurfaceStyle(Surface.Editor),
        popover: buildSurfaceStyle(Surface.Popover),
        modal: buildSurfaceStyle(Surface.Modal),
        tooltip: buildSurfaceStyle(Surface.Tooltip),
    }

    return surface
}

export const surfaceStyle = buildSurfaceStyle
export const surfaceStyles = buildSurfaceLevels()
