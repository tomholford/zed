use std::marker::PhantomData;

use gpui::{Action, AnyElement};

use crate::{prelude::*, v_stack, Label};

trait Listable<V>
where
    V: 'static,
{
    fn render(&mut self, view_state: &mut V, cx: &mut ViewContext<V>) -> AnyElement<V>;

    fn with_action(&mut self, action: Box<dyn Action>);

    fn get_action(&self) -> Option<&dyn Action>;
}

struct ListItem<V> {
    phantom_data: PhantomData<V>,
    label: String,
    action: Option<Box<dyn Action>>,
}

impl<V> ListItem<V>
where
    V: 'static,
{
    pub fn new(label: impl Into<String>) -> Self {
        Self {
            label: label.into(),
            action: None,
            phantom_data: PhantomData,
        }
    }
}

impl<V> Listable<V> for ListItem<V>
where
    V: 'static,
{
    fn render(&mut self, _view_state: &mut V, cx: &mut ViewContext<V>) -> AnyElement<V> {
        div().child(Label::new(self.label.clone())).render()
    }

    fn with_action(&mut self, action: Box<dyn Action>) {
        self.action = Some(action);
    }

    fn get_action(&self) -> Option<&dyn Action> {
        self.action.as_deref()
    }
}

pub struct Popover<V>
where
    V: 'static,
{
    id: SharedString,
    children: Vec<Box<dyn Listable<V>>>,
}

/// A popover is used to display a menu or show some options.
///
/// Clicking the element that launches the popover should not change the current view,
/// and the popover should be statically positioned relative to that element (not the
/// user's mouse.)
///
/// Example: A "new" menu with options like "new file", "new folder", etc,
/// Linear's "Display" menu, a profile menu that appers when you click your avatar.
///
/// Related elements:
///
/// `ContextMenu`:
///
/// Used to display a popover menu that only contains a list of items. Context menus are always
/// launched by secondary clicking on an element. The menu is positioned relative to the user's cursor.
///
/// Example: Right clicking a file in the file tree to get a list of actions, right clicking
/// a tab to in the tab bar to get a list of actions.
///
/// `Dropdown`:
///
/// Used to display a list of options when the user clicks an element. The menu is
/// positioned relative the element that was clicked, and clicking an item in the
/// dropdown should change the value of the element that was clicked.
///
/// Example: A theme select control. Displays "One Dark", clicking it opens a list of themes.
/// When one is selected, the theme select control displays the selected theme.
impl<V> Popover<V>
where
    V: 'static,
{
    pub fn new(id: impl Into<SharedString>) -> Self {
        Self {
            id: id.into(),
            children: Vec::new(),
        }
    }

    pub fn render(&mut self, _view: &mut V, cx: &mut ViewContext<V>) -> impl Component<V> {
        v_stack()
            .id(self.id.clone())
            .elevation_2(cx)
            .p_1()
            .children(self.children.iter_mut().map(|item| item.render(_view, cx)))
    }
}
