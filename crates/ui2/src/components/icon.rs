use std::sync::Arc;

use gpui::{rems, svg, Hsla};
use strum::EnumIter;

use crate::{prelude::*, LabelColor};

#[derive(Default, PartialEq, Copy, Clone)]
pub enum IconSize {
    Small,
    #[default]
    Medium,
}

#[derive(Default, PartialEq, Copy, Clone)]
pub enum IconColor {
    #[default]
    Default,
    Accent,
    Created,
    Deleted,
    Disabled,
    Error,
    Hidden,
    Info,
    Modified,
    Muted,
    Placeholder,
    Player(u32),
    Selected,
    Success,
    Warning,
}

impl IconColor {
    pub fn color(self, cx: &WindowContext) -> Hsla {
        match self {
            IconColor::Default => cx.theme().colors().icon,
            IconColor::Muted => cx.theme().colors().icon_muted,
            IconColor::Disabled => cx.theme().colors().icon_disabled,
            IconColor::Placeholder => cx.theme().colors().icon_placeholder,
            IconColor::Accent => cx.theme().colors().icon_accent,
            IconColor::Error => cx.theme().status().error,
            IconColor::Warning => cx.theme().status().warning,
            IconColor::Success => cx.theme().status().success,
            IconColor::Info => cx.theme().status().info,
            IconColor::Selected => cx.theme().colors().icon_accent,
            IconColor::Player(i) => cx.theme().styles.player.0[i.clone() as usize].cursor,
            IconColor::Created => cx.theme().status().created,
            IconColor::Modified => cx.theme().status().modified,
            IconColor::Deleted => cx.theme().status().deleted,
            IconColor::Hidden => cx.theme().status().hidden,
        }
    }
}

impl From<LabelColor> for IconColor {
    fn from(label: LabelColor) -> Self {
        match label {
            LabelColor::Default => IconColor::Default,
            LabelColor::Muted => IconColor::Muted,
            LabelColor::Disabled => IconColor::Disabled,
            LabelColor::Placeholder => IconColor::Placeholder,
            LabelColor::Accent => IconColor::Accent,
            LabelColor::Error => IconColor::Error,
            LabelColor::Warning => IconColor::Warning,
            LabelColor::Success => IconColor::Success,
            LabelColor::Info => IconColor::Info,
            LabelColor::Selected => IconColor::Selected,
            LabelColor::Player(i) => IconColor::Player(i),
            LabelColor::Created => IconColor::Created,
            LabelColor::Modified => IconColor::Modified,
            LabelColor::Deleted => IconColor::Deleted,
            LabelColor::Hidden => IconColor::Hidden,
        }
    }
}

#[derive(Debug, PartialEq, Copy, Clone, EnumIter)]
pub enum Icon {
    Ai,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    AtSign,
    AudioOff,
    AudioOn,
    Bell,
    BellOff,
    BellRing,
    Bolt,
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Close,
    Copilot,
    Dash,
    Envelope,
    ExclamationTriangle,
    Exit,
    File,
    FileArchive,
    FileAudio,
    FileCamera,
    FileCode,
    FileDatabase,
    FileDoc,
    FileElixir,
    FileEslint,
    FileGeneric,
    FileGit,
    FileHtml,
    FileImage,
    FileInfo,
    FileLock,
    FileNotebook,
    FilePackage,
    FilePhoenix,
    FilePrettier,
    FilePython,
    FileRust,
    FileSettings,
    FileTerminal,
    FileToml,
    FileTree,
    FileTypescript,
    FileVideo,
    Folder,
    FolderOpen,
    FolderX,
    Hash,
    InlayHint,
    MagicWand,
    MagnifyingGlass,
    MailOpen,
    Maximize,
    Menu,
    MessageBubbles,
    Mic,
    MicMute,
    Plus,
    Quote,
    Replace,
    ReplaceAll,
    Screen,
    SelectAll,
    Split,
    SplitMessage,
    Terminal,
    XCircle,
}

impl Icon {
    pub fn path(self) -> &'static str {
        match self {
            Icon::Ai => "icons/ai.svg",
            Icon::ArrowLeft => "icons/arrow_left.svg",
            Icon::ArrowRight => "icons/arrow_right.svg",
            Icon::ArrowUpRight => "icons/arrow_up_right.svg",
            Icon::AtSign => "icons/at-sign.svg",
            Icon::AudioOff => "icons/speaker-off.svg",
            Icon::AudioOn => "icons/speaker-loud.svg",
            Icon::Bell => "icons/bell.svg",
            Icon::BellOff => "icons/bell-off.svg",
            Icon::BellRing => "icons/bell-ring.svg",
            Icon::Bolt => "icons/bolt.svg",
            Icon::Check => "icons/check.svg",
            Icon::ChevronDown => "icons/chevron_down.svg",
            Icon::ChevronLeft => "icons/chevron_left.svg",
            Icon::ChevronRight => "icons/chevron_right.svg",
            Icon::ChevronUp => "icons/chevron_up.svg",
            Icon::Close => "icons/x.svg",
            Icon::Copilot => "icons/copilot.svg",
            Icon::Dash => "icons/dash.svg",
            Icon::Envelope => "icons/feedback.svg",
            Icon::ExclamationTriangle => "icons/warning.svg",
            Icon::Exit => "icons/exit.svg",
            Icon::File => "icons/file.svg",
            Icon::FileArchive => "icons/file_icons/archive.svg",
            Icon::FileAudio => "icons/file_icons/audio.svg",
            Icon::FileCamera => "icons/file_icons/camera.svg",
            Icon::FileCode => "icons/file_icons/code.svg",
            Icon::FileDatabase => "icons/file_icons/database.svg",
            Icon::FileDoc => "icons/file_icons/book.svg",
            Icon::FileElixir => "icons/file_icons/elixir.svg",
            Icon::FileEslint => "icons/file_icons/eslint.svg",
            Icon::FileGeneric => "icons/file_icons/file.svg",
            Icon::FileGit => "icons/file_icons/git.svg",
            Icon::FileHtml => "icons/file_icons/html.svg",
            Icon::FileImage => "icons/file_icons/image.svg",
            Icon::FileInfo => "icons/file_icons/info.svg",
            Icon::FileLock => "icons/file_icons/lock.svg",
            Icon::FileNotebook => "icons/file_icons/notebook.svg",
            Icon::FilePackage => "icons/file_icons/package.svg",
            Icon::FilePhoenix => "icons/file_icons/phoenix.svg",
            Icon::FilePrettier => "icons/file_icons/prettier.svg",
            Icon::FilePython => "icons/file_icons/python.svg",
            Icon::FileRust => "icons/file_icons/rust.svg",
            Icon::FileSettings => "icons/file_icons/settings.svg",
            Icon::FileTerminal => "icons/file_icons/terminal.svg",
            Icon::FileToml => "icons/file_icons/toml.svg",
            Icon::FileTree => "icons/project.svg",
            Icon::FileTypescript => "icons/file_icons/typescript.svg",
            Icon::FileVideo => "icons/file_icons/video.svg",
            Icon::Folder => "icons/file_icons/folder.svg",
            Icon::FolderOpen => "icons/file_icons/folder_open.svg",
            Icon::FolderX => "icons/stop_sharing.svg",
            Icon::Hash => "icons/hash.svg",
            Icon::InlayHint => "icons/inlay_hint.svg",
            Icon::MagicWand => "icons/magic-wand.svg",
            Icon::MagnifyingGlass => "icons/magnifying_glass.svg",
            Icon::MailOpen => "icons/mail-open.svg",
            Icon::Maximize => "icons/maximize.svg",
            Icon::Menu => "icons/menu.svg",
            Icon::MessageBubbles => "icons/conversations.svg",
            Icon::Mic => "icons/mic.svg",
            Icon::MicMute => "icons/mic-mute.svg",
            Icon::Plus => "icons/plus.svg",
            Icon::Quote => "icons/quote.svg",
            Icon::Replace => "icons/replace.svg",
            Icon::ReplaceAll => "icons/replace_all.svg",
            Icon::Screen => "icons/desktop.svg",
            Icon::SelectAll => "icons/select-all.svg",
            Icon::Split => "icons/split.svg",
            Icon::SplitMessage => "icons/split_message.svg",
            Icon::Terminal => "icons/terminal.svg",
            Icon::XCircle => "icons/error.svg",
        }
    }

    pub fn from_file_ext(str: Arc<str>) -> Self {
        match str.as_ref() {
            "rs" => Icon::FileRust,
            "py" => Icon::FilePython,
            "html" | "htm" => Icon::FileHtml,
            // Will be FileCss/FileSass/FileLess
            "css" | "scss" | "less" => Icon::FileGeneric,
            // Will be FileJavascript
            "js" | "jsx" | "mjs" => Icon::FileCode,
            "ts" | "tsx" => Icon::FileTypescript,
            // Will be FileJava
            "java" | "class" | "jar" => Icon::FileCode,
            // Will be FileC/FileCpp/FileH/FileHpp
            "c" | "cpp" | "h" | "hpp" => Icon::FileCode,
            "toml" => Icon::FileToml,
            // Will be FileGo
            "go" => Icon::FileCode,
            // Will be FileRuby
            "rb" => Icon::FileCode,
            "cs" => Icon::FileCode,
            "ex" | "exs" => Icon::FileElixir,
            "php" => Icon::FileCode,
            "pl" | "pm" => Icon::FileCode,
            "lua" => Icon::FileCode,
            "r" => Icon::FileCode,
            "sh" | "bash" | "bat" | "ps1" => Icon::FileTerminal,
            "zip" | "rar" | "7z" | "tar" | "gzip" | "bzip2" | "xz" => Icon::FileArchive,
            "mp3" | "wav" | "flac" | "aac" | "ogg" | "m4a" => Icon::FileAudio,
            "jpg" | "jpeg" | "png" | "gif" | "bmp" | "ico" | "svg" => Icon::FileImage,
            "mp4" | "mkv" | "flv" | "avi" | "mov" | "wmv" => Icon::FileVideo,
            "sql" | "db" | "mdb" => Icon::FileDatabase,
            "doc" | "docx" | "pdf" | "txt" | "rtf" | "odt" => Icon::FileDoc,
            "xml" | "json" | "yml" | "yaml" | "ini" | "cfg" | "conf" => Icon::FileSettings,
            "md" | "markdown" | "rst" => Icon::FileDoc,
            "lock" | "key" | "pem" | "cert" => Icon::FileLock,
            "git" | "gitignore" => Icon::FileGit,
            _ => Icon::File,
        }
    }
}

#[derive(Component)]
pub struct IconElement {
    icon: Icon,
    color: IconColor,
    size: IconSize,
}

impl IconElement {
    pub fn new(icon: Icon) -> Self {
        Self {
            icon,
            color: IconColor::default(),
            size: IconSize::default(),
        }
    }

    pub fn color(mut self, color: IconColor) -> Self {
        self.color = color;
        self
    }

    pub fn size(mut self, size: IconSize) -> Self {
        self.size = size;
        self
    }

    fn render<V: 'static>(self, _view: &mut V, cx: &mut ViewContext<V>) -> impl Component<V> {
        let svg_size = match self.size {
            IconSize::Small => rems(0.75),
            IconSize::Medium => rems(0.9375),
        };

        svg()
            .size(svg_size)
            .flex_none()
            .path(self.icon.path())
            .text_color(self.color.color(cx))
    }
}

#[cfg(feature = "stories")]
pub use stories::*;

#[cfg(feature = "stories")]
mod stories {
    use gpui::{Div, Render};
    use strum::IntoEnumIterator;

    use crate::Story;

    use super::*;

    pub struct IconStory;

    impl Render for IconStory {
        type Element = Div<Self>;

        fn render(&mut self, cx: &mut ViewContext<Self>) -> Self::Element {
            let icons = Icon::iter();

            Story::container(cx)
                .child(Story::title_for::<_, IconElement>(cx))
                .child(Story::label(cx, "All Icons"))
                .child(div().flex().gap_3().children(icons.map(IconElement::new)))
        }
    }
}
