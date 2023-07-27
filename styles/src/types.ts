import chroma from "chroma-js"
import { FontFamily, FontSize } from "./theme"

export type Theme = {
    // TODO: Remove these two
    name: string
    is_light: boolean

    meta: Meta

    foreground: ForegroundStyles
    border: BorderStyles
    container: ContainerStyles
    elevation: ElevationStyles
    shape: ShapeStyles
    state: StateStyles
    player: PlayerStyles
    syntax?: SyntaxStyles

    ui?: UIStyles
}

export type OutTheme = Required<Theme>

type ForegroundVariants = "default" | "muted" | "disabled"
type ForegroundStyles = Record<ForegroundVariants, string>

type BorderVariants = "default" | "muted" | "disabled"
type BorderStyles = Record<BorderVariants, Border>

type ContainerVariants = "background" | "surface" | "panel" | "editor" | "wash"
type ContainerStyles = Record<ContainerVariants, string>

type ElevationVariants = "menu" | "popover" | "model"
type ElevationStyles = Record<ElevationVariants, Shadow>

type ShapeVariants = "default" | "rounded" | "rounded.full"
type ShapeStyles = Record<ShapeVariants, number>

type StateVariants = "hovered" | "pressed" | "active" | "disabled"
type StateStyles = Record<StateVariants, number>

type PlayerVariants = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
type PlayerStyles = Record<PlayerVariants, Player>

type SyntaxVariants = SyntaxKeys
type SyntaxStyles = Partial<Record<SyntaxVariants, SyntaxHighlightStyle>>

type UIOverrides =
    | "editor.background"
    | "editor.active_line"
type UIStyles = Partial<Record<UIOverrides, string>>


export interface Meta {
    name: string
    author: string
    url: string
    appearance: ThemeAppearance
    license: string
}

export interface Player {
    cursor: string
    selection: string
}

export interface Players {
    "0": Player
    "1": Player
    "2": Player
    "3": Player
    "4": Player
    "5": Player
    "6": Player
    "7": Player
}

export interface Shadow {
    blur: number
    color: string
    offset: number[]
}

export interface SyntaxHighlightStyle {
    color?: string
    weight?: FontWeight
    underline?: boolean
    italic?: boolean
}

type SyntaxKeys = | 'comment' | 'comment.doc' | 'primary' | 'predictive' | 'hint' | 'emphasis' | 'title' | 'link_uri' | 'link_text' | 'punctuation' | 'string' | 'variant' | 'type' | 'variable' | 'label' | 'tag' | 'attribute' | 'property' | 'constant' | 'keyword' | 'enum' | 'operator' | 'number' | 'boolean' | 'function' | 'preproc' | 'embedded' | 'emphasis.strong' | 'text.literal' | 'punctuation.bracket' | 'punctuation.delimiter' | 'punctuation.special' | 'punctuation.list_marker' | 'string.special' | 'string.special.symbol' | 'string.escape' | 'string.regex' | 'type.builtin' | 'variable.special' | 'constant.builtin' | 'function.builtin' | 'function.definition' | 'function.special.definition' | 'function.method' | 'function.method.builtin';

export type Syntax = Record<SyntaxKeys, SyntaxHighlightStyle> & {
    // We allow Function here because all JS objects literals have this property
    constructor: SyntaxHighlightStyle | Function // eslint-disable-line @typescript-eslint/ban-types
}

export type ThemeSyntax = Partial<Syntax>

export type FontWeight = "normal" | "bold"

export type ThemeAppearance = "light" | "dark"

export type ThemeConfigInputColors = {
    neutral: chroma.Scale<chroma.Color>
    red: chroma.Scale<chroma.Color>
    orange: chroma.Scale<chroma.Color>
    yellow: chroma.Scale<chroma.Color>
    green: chroma.Scale<chroma.Color>
    cyan: chroma.Scale<chroma.Color>
    blue: chroma.Scale<chroma.Color>
    violet: chroma.Scale<chroma.Color>
    magenta: chroma.Scale<chroma.Color>
}

export type ThemeConfigInputColorsKeys = keyof ThemeConfigInputColors
export type ThemeConfigInputSyntax = Partial<Syntax>

export interface ThemeConfigOverrides {
    syntax: ThemeConfigInputSyntax
}

type ThemeConfigProperties = Meta & {
    input_color: ThemeConfigInputColors
    override: ThemeConfigOverrides
}

export type ThemeConfig = {
    [K in keyof ThemeConfigProperties]: ThemeConfigProperties[K]
}

export enum ThemeLicenseType {
    MIT = "MIT",
    Apache2 = "Apache License 2.0",
}

export interface TextStyle extends Object {
    family: FontFamily
    color: string
    size: number
    weight?: FontWeight
    underline?: boolean
}

export interface TextProperties {
    size?: FontSize
    weight?: FontWeight
    underline?: boolean
    color?: string
    features?: FontFeatures
}

interface FontFeatures {
    /** Contextual Alternates: Applies a second substitution feature based on a match of a character pattern within a context of surrounding patterns */
    calt?: boolean
    /** Case-Sensitive Forms: Shifts various punctuation marks up to a position that works better with all-capital sequences */
    case?: boolean
    /** Capital Spacing: Adjusts inter-glyph spacing for all-capital text */
    cpsp?: boolean
    /** Fractions: Replaces figures separated by a slash with diagonal fractions */
    frac?: boolean
    /** Standard Ligatures: Replaces a sequence of glyphs with a single glyph which is preferred for typographic purposes */
    liga?: boolean
    /** Oldstyle Figures: Changes selected figures from the default or lining style to oldstyle form. */
    onum?: boolean
    /** Ordinals: Replaces default alphabetic glyphs with the corresponding ordinal forms for use after figures */
    ordn?: boolean
    /** Proportional Figures: Replaces figure glyphs set on uniform (tabular) widths with corresponding glyphs set on proportional widths */
    pnum?: boolean
    /** Stylistic set 01 */
    ss01?: boolean
    /** Stylistic set 02 */
    ss02?: boolean
    /** Stylistic set 03 */
    ss03?: boolean
    /** Stylistic set 04 */
    ss04?: boolean
    /** Stylistic set 05 */
    ss05?: boolean
    /** Stylistic set 06 */
    ss06?: boolean
    /** Stylistic set 07 */
    ss07?: boolean
    /** Stylistic set 08 */
    ss08?: boolean
    /** Stylistic set 09 */
    ss09?: boolean
    /** Stylistic set 10 */
    ss10?: boolean
    /** Stylistic set 11 */
    ss11?: boolean
    /** Stylistic set 12 */
    ss12?: boolean
    /** Stylistic set 13 */
    ss13?: boolean
    /** Stylistic set 14 */
    ss14?: boolean
    /** Stylistic set 15 */
    ss15?: boolean
    /** Stylistic set 16 */
    ss16?: boolean
    /** Stylistic set 17 */
    ss17?: boolean
    /** Stylistic set 18 */
    ss18?: boolean
    /** Stylistic set 19 */
    ss19?: boolean
    /** Stylistic set 20 */
    ss20?: boolean
    /** Subscript: Replaces default glyphs with subscript glyphs */
    subs?: boolean
    /** Superscript: Replaces default glyphs with superscript glyphs */
    sups?: boolean
    /** Swash: Replaces default glyphs with swash glyphs for stylistic purposes */
    swsh?: boolean
    /** Titling: Replaces default glyphs with titling glyphs for use in large-size settings */
    titl?: boolean
    /** Tabular Figures: Replaces figure glyphs set on proportional widths with corresponding glyphs set on uniform (tabular) widths */
    tnum?: boolean
    /** Slashed Zero: Replaces default zero with a slashed zero for better distinction between "0" and "O" */
    zero?: boolean
}

export interface Border {
    color: string
    width: number
    top?: boolean
    bottom?: boolean
    left?: boolean
    right?: boolean
    overlay?: boolean
}

export interface BorderProperties {
    width?: number
    top?: boolean
    bottom?: boolean
    left?: boolean
    right?: boolean
    overlay?: boolean
}
