use gpui::{actions, AppContext};

pub mod appearance_modal;
pub mod deploy_appearance;

actions!(DeployAppearanceSettings);

pub fn init(cx: &mut AppContext) {
    cx.observe_new_views(appearance_modal::AppearanceModal::register)
        .detach();
}
