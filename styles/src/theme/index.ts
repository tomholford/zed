import { create } from "zustand"
import { Theme } from "./create_theme"

type ThemeState = {
    theme: Theme | undefined
    setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: undefined,
    setTheme: (theme) => set(() => ({ theme })),
}))

export const useTheme = (): Theme => {
    const { theme } = useThemeStore.getState()

    if (!theme) throw new Error("Tried to use theme before it was loaded. This usually means useThemeStore is being accessed before it has been initialized.")

    return theme
}

export const initializeTheme = (theme: Theme) => {
    const { setTheme } = useThemeStore.getState()
    setTheme(theme)
    console.log("Theme initialized")
}

export * from "./create_theme"
export * from "./ramps"
export * from "./syntax"
export * from "./theme_config"
export * from "./surface"
