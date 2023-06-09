import { ColorScheme } from "../../common";
import { background } from "../components";

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
                    background: background(lowest, "default"),
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
                        color: isLight ? ImageOverlayBorder.LightTheme : ImageOverlayBorder.DarkTheme,
                        width: 1,
                        overlay: true
                    }
                }
            },
            hover: {
                // TODO: Add hover state
            }
        },
        active: {
            // TODO: Add active state
        }
    }
}

export function userMenuDropdown(colorScheme: ColorScheme) {

}
