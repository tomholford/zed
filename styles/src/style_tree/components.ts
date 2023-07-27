// import { font_families } from "src/theme"
// import { Border, BorderProperties, Layer, Style, StyleSets, Styles, TextProperties, TextStyle } from "src/types"

// function is_style_set(key: any): key is StyleSets {
//     return [
//         "base",
//         "variant",
//         "on",
//         "accent",
//         "positive",
//         "warning",
//         "negative",
//     ].includes(key)
// }

// function is_style(key: any): key is Styles {
//     return [
//         "default",
//         "active",
//         "disabled",
//         "hovered",
//         "pressed",
//         "inverted",
//     ].includes(key)
// }
// function get_style(
//     layer: Layer,
//     possible_style_set_or_style?: any,
//     possible_style?: any
// ): Style {
//     let style_set: StyleSets = "base"
//     let style: Styles = "default"
//     if (is_style_set(possible_style_set_or_style)) {
//         style_set = possible_style_set_or_style
//     } else if (is_style(possible_style_set_or_style)) {
//         style = possible_style_set_or_style
//     }

//     if (is_style(possible_style)) {
//         style = possible_style
//     }

//     return layer[style_set][style]
// }

// export function background(layer: Layer, style?: Styles): string
// export function background(
//     layer: Layer,
//     style_set?: StyleSets,
//     style?: Styles
// ): string
// export function background(
//     layer: Layer,
//     style_set_or_styles?: StyleSets | Styles,
//     style?: Styles
// ): string {
//     return get_style(layer, style_set_or_styles, style).background
// }

// export function border_color(layer: Layer, style?: Styles): string
// export function border_color(
//     layer: Layer,
//     style_set?: StyleSets,
//     style?: Styles
// ): string
// export function border_color(
//     layer: Layer,
//     style_set_or_styles?: StyleSets | Styles,
//     style?: Styles
// ): string {
//     return get_style(layer, style_set_or_styles, style).border
// }

// export function foreground(layer: Layer, style?: Styles): string
// export function foreground(
//     layer: Layer,
//     style_set?: StyleSets,
//     style?: Styles
// ): string
// export function foreground(
//     layer: Layer,
//     style_set_or_styles?: StyleSets | Styles,
//     style?: Styles
// ): string {
//     return get_style(layer, style_set_or_styles, style).foreground
// }

// export function text(
//     layer: Layer,
//     font_family: keyof typeof font_families,
//     style_set: StyleSets,
//     style: Styles,
//     properties?: TextProperties
// ): TextStyle
// export function text(
//     layer: Layer,
//     font_family: keyof typeof font_families,
//     style_set: StyleSets,
//     properties?: TextProperties
// ): TextStyle
// export function text(
//     layer: Layer,
//     font_family: keyof typeof font_families,
//     style: Styles,
//     properties?: TextProperties
// ): TextStyle
// export function text(
//     layer: Layer,
//     font_family: keyof typeof font_families,
//     properties?: TextProperties
// ): TextStyle
// export function text(
//     layer: Layer,
//     font_family: keyof typeof font_families,
//     style_set_style_or_properties?: StyleSets | Styles | TextProperties,
//     style_or_properties?: Styles | TextProperties,
//     properties?: TextProperties
// ) {
//     const style = get_style(
//         layer,
//         style_set_style_or_properties,
//         style_or_properties
//     )

//     if (typeof style_set_style_or_properties === "object") {
//         properties = style_set_style_or_properties
//     }
//     if (typeof style_or_properties === "object") {
//         properties = style_or_properties
//     }

//     const size = font_sizes[properties?.size || "sm"]
//     const color = properties?.color || style.foreground

//     return {
//         family: font_families[font_family],
//         ...properties,
//         color,
//         size,
//     }
// }

// export function border(
//     layer: Layer,
//     style_set: StyleSets,
//     style: Styles,
//     properties?: BorderProperties
// ): Border
// export function border(
//     layer: Layer,
//     style_set: StyleSets,
//     properties?: BorderProperties
// ): Border
// export function border(
//     layer: Layer,
//     style: Styles,
//     properties?: BorderProperties
// ): Border
// export function border(layer: Layer, properties?: BorderProperties): Border
// export function border(
//     layer: Layer,
//     style_set_or_properties?: StyleSets | Styles | BorderProperties,
//     style_or_properties?: Styles | BorderProperties,
//     properties?: BorderProperties
// ): Border {
//     const style = get_style(layer, style_set_or_properties, style_or_properties)

//     if (typeof style_set_or_properties === "object") {
//         properties = style_set_or_properties
//     }
//     if (typeof style_or_properties === "object") {
//         properties = style_or_properties
//     }

//     return {
//         color: style.border,
//         width: 1,
//         ...properties,
//     }
// }

// export function svg(
//     color: string,
//     asset: string,
//     width: number,
//     height: number
// ) {
//     return {
//         color,
//         asset,
//         dimensions: {
//             width,
//             height,
//         },
//     }
// }
