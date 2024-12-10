import { Extension } from '@tiptap/core';

/**
 * 在 Tiptap 和许多其他编辑器中，Mod 是一个通用的修饰符键，
 * 它会根据操作系统自动映射到 Ctrl（在 Windows 和 Linux 上）或 Cmd（在 macOS 上）。
 * 这样可以确保快捷键在不同平台上都能正常工作。
 *
 * 'Mod-Shift-x': () => this.editor.chain().focus().unsetAllMarks().run(),
 */

export const ClearFormattingShortcut = Extension.create({
  name: 'clearFormattingShortcut',

  addKeyboardShortcuts() {
    return {
      'Mod-\\': () => this.editor.chain().focus().unsetAllMarks().run(),
    };
  },
});

/*

import { Extension } from '@tiptap/core';

const ClearFormattingShortcut = Extension.create({
  name: 'clearFormattingShortcut',

  addKeyboardShortcuts() {
    return {
      'Mod-\\': () => this.editor.chain().focus().unsetAllMarks().run(),
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleKeyDown(view, event) {
            // 处理中文输入法下的特殊情况
            if (event.key === '\\' && (event.metaKey || event.ctrlKey)) {
              event.preventDefault();
              view.dispatch(view.state.tr.setMeta('clearFormatting', true));
              return true;
            }
            return false;
          },
        },
      }),
    ];
  },
});

export default ClearFormattingShortcut;

在这个示例中，我们使用 Mod-\\ 作为快捷键绑定，并添加了一个 ProseMirror 插件来处理中文输入法下的特殊情况。通过监听 handleKeyDown 事件，我们可以在检测到 Cmd + \ 时执行清除格式的操作。

*/
