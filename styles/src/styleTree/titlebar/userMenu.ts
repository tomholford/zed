import { ColorScheme } from "../../common";
import { background, border } from "../components";

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
export function userMenuDropdown(colorScheme: ColorScheme): ContainedFlex {
    const { middle } = colorScheme

    return {
        name: "userMenuDropdown",
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

export function dropdownDivider(colorScheme: ColorScheme): Container {
    const { middle } = colorScheme

    const borderStyle = border(middle, "base", "default")

    return {
        name: "dropdownDivider",
        container: {
            // ? How do we do "width that fills the whole container"
            // width: "100%"
            width: "full",
            height: 1,
            background: borderStyle.color,
        }
    }
}

export function dropdownGroup(colorScheme: ColorScheme): Flex {
    const { middle } = colorScheme

    return {
        name: "dropdownGroup",
        flex: {
            spacing: 1
        }
    }
}
