import { ColorScheme } from "../themes/common/colorScheme";

export default function colors(colorScheme: ColorScheme) {

    const { isLight } = colorScheme

    return {
        git: {
            deleted: isLight
                ? colorScheme.ramps.red(0.5).hex()
                : colorScheme.ramps.red(0.4).hex(),
            modified: isLight
                ? colorScheme.ramps.yellow(0.4).hex()
                : colorScheme.ramps.yellow(0.5).hex(),
            inserted: isLight
                ? colorScheme.ramps.green(0.4).hex()
                : colorScheme.ramps.green(0.5).hex(),
        }
    }
}
