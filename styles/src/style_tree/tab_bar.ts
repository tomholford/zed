// import { icon_button } from "../component/icon_button"
// import { containerStyle, interactive, stateStyle, textStyle, toggleable } from "../element"
// import { useTheme } from "../theme"

// const tabStyle = (c: keyof typeof containerStyle, a: keyof typeof containerStyle, t?: keyof typeof textStyle) => {
//     const base = {
//         background: containerStyle[c],
//         text: t ? textStyle[t] : textStyle.Label,
//     }

//     const inactive = interactive({
//         state: {
//             default: base,
//             hovered: {
//                 background: stateStyle(c, "hovered"),
//             },
//             clicked: {
//                 background: stateStyle(c, "pressed"),
//             }
//         },
//     })
//     const active = interactive({
//         state: {
//             default: {
//                 ...base,
//                 background: containerStyle[a],
//             },
//             hovered: {
//                 background: stateStyle(a, "hovered"),
//             },
//             clicked: {
//                 background: stateStyle(a, "pressed"),
//             }
//         },
//     })

//     return toggleable({
//         state: {
//             active,
//             inactive
//         }
//     })
// }

// export default function tab_bar(): any {
//     const theme = useTheme()
//     const tab = tabStyle("Surface", "Editor", "Label")

//     const height = 32

//     // const tab = {
//     //     height,
//     //     text: textStyle.Label,
//     //     background: container.Surface,
//     //     border: theme.border.default,
//     //     padding: {
//     //         left: 8,
//     //         right: 12,
//     //     },
//     //     spacing: 8,

//     //     // Tab type icons (e.g. Project Search)
//     //     type_icon_width: 14,

//     //     // Close icons
//     //     close_icon_width: 8,
//     //     icon_close: foreground(layer, "variant"),
//     //     icon_close_active: foreground(layer, "hovered"),

//     //     // Indicators
//     //     icon_conflict: foreground(layer, "warning"),
//     //     icon_dirty: foreground(layer, "accent"),

//     //     git: {
//     //         modified: is_light
//     //             ? theme.ramps.yellow(0.6).hex()
//     //             : theme.ramps.yellow(0.5).hex(),
//     //         inserted: is_light
//     //             ? theme.ramps.green(0.45).hex()
//     //             : theme.ramps.green(0.5).hex(),
//     //         conflict: is_light
//     //             ? theme.ramps.red(0.6).hex()
//     //             : theme.ramps.red(0.5).hex(),
//     //     },

//     //     // When two tabs of the same name are open, a label appears next to them
//     //     description: {
//     //         margin: { left: 8 },
//     //         ...text(layer, "sans", "disabled", { size: "2xs" }),
//     //     },
//     // }

//     // const active_pane_active_tab = {
//     //     ...tab,
//     //     background: background(active_layer),
//     //     text: text(active_layer, "sans", "active", { size: "sm" }),
//     //     border: {
//     //         ...tab.border,
//     //         bottom: false,
//     //     },
//     // }

//     // const inactive_pane_inactive_tab = {
//     //     ...tab,
//     //     background: background(layer),
//     //     text: text(layer, "sans", "variant", { size: "sm" }),
//     // }

//     // const inactive_pane_active_tab = {
//     //     ...tab,
//     //     background: background(active_layer),
//     //     text: text(layer, "sans", "variant", { size: "sm" }),
//     //     border: {
//     //         ...tab.border,
//     //         bottom: false,
//     //     },
//     // }

//     // const dragged_tab = {
//     //     ...active_pane_active_tab,
//     //     background: with_opacity(tab.background, 0.9),
//     //     border: undefined as any,
//     //     shadow: theme.popover_shadow,
//     // }

//     return {
//         height,
//         background: containerStyle.Surface,
//         active_pane: {
//             active_tab: tab.active,
//             inactive_tab: tab.inactive,
//         },
//         inactive_pane: {
//             active_tab: tab.active,
//             inactive_tab: tab.inactive,
//         },
//         // dragged_tab,
//         pane_button: icon_button({}),
//         pane_button_container: {
//             background: containerStyle.Surface,
//             border: {
//                 ...tab.border,
//                 right: false,
//             },
//         },
//     }
// }
