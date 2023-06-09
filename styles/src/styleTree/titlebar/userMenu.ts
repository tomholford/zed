import { ColorScheme, Layer } from "../../common";
import { background, border, foreground, text } from "../components";

// This file is all wishful code, it won't compile right now
// A bunch of these functions should be sorted to other places

// WIP, needs to move to a global location
enum CornerRadius {
    XSmall = 2,
    Small = 4,
    Medium = 6,
    Large = 10,
    Full = 99,
}

enum ImageOverlayBorder {
    LightTheme = "#00000026",
    DarkTheme = "#FFFFFF26"
}

// Use a moule export instead of a namespace when this is moved to a new file
namespace Font {
    export enum Family {
        Sans = "Zed Sans",
        Mono = "Zed Mono",
    }

    export enum Size {
        "3XS" = 8,
        "2XS" = 10,
        XS = 12,
        SM = 14,
        MD = 16,
        LG = 18,
        XL = 20,
    }

    export enum Weight {
        Normal = "normal",
        Bold = "bold",
    }
}



export function loggedInUserButton(colorScheme: ColorScheme): Toggleable<Interactive<ContainedImage>> {
    const { isLight, lowest } = colorScheme

    return {
        name: "titlbarLoggedInUserButton",
        inactive: {
            default: {
                container: {
                    width: 24,
                    background: background(lowest, "base", "default"),
                    cornerRadius: CornerRadius.Medium,
                    padding: {
                        top: 4,
                        bottom: 4,
                        left: 4,
                        right: 4
                    }
                },
                image: {
                    width: 16,
                    height: 16,
                    corderRadius: CornerRadius.Full,
                    border: {
                        color: isLight
                            ? ImageOverlayBorder.LightTheme
                            : ImageOverlayBorder.DarkTheme,
                        width: 1,
                        overlay: true
                    }
                }
            },
            hovered: {
                // Rest of the styles should be pulled from default
                // An interactive() utility function should be created to handle this
                container: {
                    background: background(lowest, "base", "hovered")
                }
            },
            pressed: {
                // Same as above
                container: {
                    background: background(lowest, "base", "hovered")
                }
            }
        },
        active: {
            // TODO: Add active state
            // A toggleable() utility function should be created to handle all the duplicate styles
        }
    }
}

// Unsure if this should be ContainedFlex or ContainedStack or ContainedHStack
export function userMenuPopover(colorScheme: ColorScheme): ContainedFlex {
    const { middle } = colorScheme

    return {
        name: "userMenuPopover",
        flex: {
            container: {
                background: background(middle, "base", "default"),
                border: border(middle, "base", "default"),
                cornerRadius: CornerRadius.Small,
            },
            spacing: 0
        }
    }
}

export function keyboardShortcut(layer: Layer): ContainedText {
    return {
        name: "keyboardShortcut",
        text: {
            color: foreground(layer, "variant", "default"),
            size: Font.Size["2XS"],
            fontFamily: Font.Family.Sans,
        }
    }
}

export function keyboardShortcutChord(layer: Layer): ContainedFlex {
    return {
        name: "keyboardShortcutChord",
        flex: {
            spacing: 4,
            ...keyboardShortcut(layer)
        }
    }
}

export function popoverDivider(colorScheme: ColorScheme): Container {
    const { middle } = colorScheme

    const borderStyle = border(middle, "base", "default")

    return {
        name: "popoverDivider",
        container: {
            // ? How do we do "width that fills the whole container"
            // width: "100%"
            width: "full",
            height: 1,
            background: borderStyle.color,
        }
    }
}

export function popoverGroup(colorScheme: ColorScheme): Flex {
    return {
        name: "popoverGroup",
        flex: {
            spacing: 1
        }
    }
}

export function popoverItem(colorScheme: ColorScheme): Interactive<ContainedFlex> {
    const { middle } = colorScheme

    return {
        name: "popoverItem",
        default: {
            container: {
                height: 28,
                padding: {
                    top: 6,
                    bottom: 6,
                    left: 8,
                    right: 8
                }
            },
            label: {
                text: {
                    family: Font.Family.Sans,
                    color: foreground(middle, "base", "default"),
                    size: Font.Size.XS,
                }
            },
            shortcut: keyboardShortcutChord(middle)
        }
    }
}
