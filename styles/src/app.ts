import { write_themes } from "./build_themes"
import { write_tokens } from "./build_tokens"
import { build_types } from "./build_types"
import { Theme, create_theme } from "./theme"
import { themeIndex } from "./themes/themeIndex"


const ASSETS_DIR = `${__dirname}/../../assets`
const THEMES_DIR = `${ASSETS_DIR}/themes`

async function app() {
    const build_start_time = new Date().getTime()

    console.log('')
    console.log(`========`)
    console.log(`\x1b[34mBuilding theme types... \x1b[0m`)

    try {
        await build_types()
    } catch (e) {
        console.log('Error building theme types. Ensure you have generateed the type schema with `script/build_theme_types`')
        console.error(e)
    }

    console.log('')
    console.log(`\x1b[34mBuilding themes... \x1b[0m`)

    const theme_build_start_time = new Date().getTime()


    const all_themes: Theme[] = themeIndex.map((theme) =>
        create_theme(theme)
    )

    write_themes(all_themes, `${ASSETS_DIR}/themes`)

    const theme_build_end_time = new Date().getTime()
    const theme_build_elapsed_time = (theme_build_end_time - theme_build_start_time) / 1000
    console.log(`✓ Done. Wrote \x1b[33m${themeIndex.length + 1}\x1b[0m themes to \x1b[36m"${THEMES_DIR}"\x1b[0m in \x1b[32m${theme_build_elapsed_time}\x1b[0m seconds`)

    const build_end_time = new Date().getTime()
    const elapsedTime = (build_end_time - build_start_time) / 1000
    console.log(`Finished building the theme in \x1b[32m${elapsedTime}\x1b[0m seconds`)
    console.log(`========`)
}

app()
