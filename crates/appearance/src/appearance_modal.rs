use gpui::{
    rems, AppContext, DismissEvent, Div, EventEmitter, FocusHandle, FocusableView, Render,
    ViewContext,
};
use ui::prelude::*;
use workspace::Workspace;

use crate::DeployAppearanceSettings;

pub struct AppearanceModal {
    focus_handle: FocusHandle,
}

impl FocusableView for AppearanceModal {
    fn focus_handle(&self, _cx: &AppContext) -> FocusHandle {
        self.focus_handle.clone()
    }
}
impl EventEmitter<DismissEvent> for AppearanceModal {}

impl AppearanceModal {
    pub fn register(workspace: &mut Workspace, cx: &mut ViewContext<Workspace>) {
        let _handle = cx.view().downgrade();
        workspace.register_action(move |_workspace, _: &DeployAppearanceSettings, cx| {
            cx.spawn(|workspace, mut cx| async move {
                workspace.update(&mut cx, |workspace, cx| {
                    workspace.toggle_modal(cx, move |cx| AppearanceModal::new(cx));
                })?;

                anyhow::Ok(())
            })
            .detach_and_log_err(cx);
        });
    }

    pub fn new(cx: &mut ViewContext<Self>) -> Self {
        let focus_handle = cx.focus_handle();

        Self { focus_handle }
    }

    fn cancel(&mut self, _: &menu::Cancel, cx: &mut ViewContext<Self>) {
        cx.emit(DismissEvent);
    }
}

impl Render for AppearanceModal {
    type Element = Div;

    fn render(&mut self, cx: &mut ViewContext<Self>) -> Self::Element {
        v_stack()
            .elevation_3(cx)
            .key_context("AppearanceSettings")
            .on_action(cx.listener(Self::cancel))
            .min_w(rems(40.))
            .max_w(rems(96.))
            .h(rems(40.))
            .p_2()
            .gap_2()
            .child(div().text_2xl().child("hello"))
    }
}
