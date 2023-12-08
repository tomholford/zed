use gpui::{AnyElement, Render, ViewContext, WeakView};
use ui::{prelude::*, ButtonCommon, Icon, IconButton, Tooltip};
use workspace::{item::ItemHandle, StatusItemView, Workspace};

use crate::{appearance_modal::AppearanceModal, DeployAppearanceSettings};

pub struct DeployAppearanceButton {
    workspace: WeakView<Workspace>,
}

impl DeployAppearanceButton {
    pub fn new(workspace: &Workspace) -> Self {
        DeployAppearanceButton {
            workspace: workspace.weak_handle(),
        }
    }
}

impl Render for DeployAppearanceButton {
    type Element = AnyElement;

    fn render(&mut self, cx: &mut ViewContext<Self>) -> Self::Element {
        let is_open = self
            .workspace
            .upgrade()
            .and_then(|workspace| {
                workspace.update(cx, |workspace, cx| {
                    workspace.active_modal::<AppearanceModal>(cx)
                })
            })
            .is_some();
        IconButton::new("appearance settings", Icon::Hash)
            .style(ui::ButtonStyle::Subtle)
            .selected(is_open)
            .tooltip(|cx| Tooltip::text("Appearance Settings", cx))
            .on_click(|_, cx| {
                cx.dispatch_action(Box::new(DeployAppearanceSettings));
            })
            .into_any_element()
    }
}

impl StatusItemView for DeployAppearanceButton {
    fn set_active_pane_item(
        &mut self,
        _item: Option<&dyn ItemHandle>,
        _cx: &mut ViewContext<Self>,
    ) {
    }
}
