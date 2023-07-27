import { Theme } from "../types"
import { static_theme } from "../static"
import { editor } from "./editor"

export default function app(t: Theme): any {
    // const theme = useTheme()

    return {
        ...static_theme,
        editor: {
            ...static_theme.editor,
            ...editor(t),
        }
        // meta: {
        //     name: theme.meta.name,
        //     is_light: theme.meta.appearance === "light",
        // },
        // command_palette: command_palette(),
        // contact_notification: contact_notification(),
        // project_shared_notification: project_shared_notification(),
        // incoming_call_notification: incoming_call_notification(),
        // picker: picker(),
        // workspace: workspace(),
        // titlebar: titlebar(),
        // copilot: copilot(),
        // welcome: welcome(),
        // context_menu: context_menu(),
        // editor: editor(),
        // project_diagnostics: project_diagnostics(),
        // project_panel: project_panel(),
        // contacts_popover: contacts_popover(),
        // contact_finder: contact_finder(),
        // contact_list: contact_list(),
        // toolbar_dropdown_menu: toolbar_dropdown_menu(),
        // search: search(),
        // shared_screen: shared_screen(),
        // update_notification: update_notification(),
        // simple_message_notification: simple_message_notification(),
        // tooltip: tooltip(),
        // terminal: terminal(),
        // assistant: assistant(),
        // feedback: feedback()
    }
}
