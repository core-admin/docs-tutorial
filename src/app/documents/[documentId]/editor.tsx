'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';

import TextAlign from '@tiptap/extension-text-align';

import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';

import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';

import { FontSizeExtension } from '@/extensions/font-size';
import { LineHeightExtension } from '@/extensions/line-height';
import { ClearFormattingShortcut } from '@/extensions/shortcuts/clear-formatting';

import { useEditorStore } from '@/store/use-editor-store';
import { Ruler } from './ruler';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';
import { Threads } from './threads';

import { useStorage } from '@liveblocks/react/suspense';
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/margins';

interface EditorProps {
  initialContent?: string | undefined;
}

export const Editor = ({ initialContent }: EditorProps) => {
  const { setEditor } = useEditorStore();

  const liveblocks = useLiveblocksExtension({
    initialContent: initialContent || '',
    offlineSupport_experimental: true,
  });

  const leftMargin = useStorage(root => root.leftMargin ?? LEFT_MARGIN_DEFAULT);
  const rightMargin = useStorage(root => root.rightMargin ?? RIGHT_MARGIN_DEFAULT);

  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    // 编辑器内容更新时的回调函数
    onUpdate({ editor }) {
      setEditor(editor);
    },
    // 编辑器选区变化时的回调函数
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    // 编辑器事务更新时的回调函数
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    // 编辑器内容解析出错时的回调函数
    onContentError({ editor }) {
      setEditor(editor);
    },
    autofocus: true,
    editorProps: {
      attributes: {
        class:
          'bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text focus:outline-none print:border-0',
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
        lang: 'zh-CN',
      },
    },
    immediatelyRender: false,
    extensions: [
      // https://liveblocks.io/dashboard/TS5EjaZyyMqyWcCV1WFXF/projects/6763e7c2ac9ac9672c468e15/quickstart
      liveblocks,
      StarterKit.configure({
        // Liveblocks 扩展自带历史记录处理功能
        history: false,
        paragraph: {
          HTMLAttributes: { class: 'paragraph-node', 'data-type': 'paragraph' },
        },
        bulletList: {
          HTMLAttributes: { class: 'bullet-node', 'data-type': 'bulletList' },
        },
        listItem: {
          HTMLAttributes: { class: 'list-item-node', 'data-type': 'listItem' },
        },
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
          HTMLAttributes: { class: 'heading-node', 'data-type': 'heading' },
        },
        code: {
          HTMLAttributes: { class: 'code-node', 'data-type': 'code' },
        },
      }),
      ClearFormattingShortcut,
      FontSizeExtension.configure({
        types: ['textStyle'],
        disallowedNodes: ['heading'], // 配置不允许设置字体大小的节点
      }),
      LineHeightExtension.configure({
        types: ['paragraph', 'heading'],
        defaultLineHeight: 'inherit',
      }),
      Placeholder.configure({
        placeholder: 'Write something ...',
      }),
      Underline.configure({
        HTMLAttributes: { class: 'underline-node', 'data-type': 'underline' },
      }),
      Highlight.configure({
        HTMLAttributes: { class: 'highlight-node', 'data-type': 'highlight' },
        multicolor: true,
      }),
      FontFamily,
      TextStyle,
      Color,
      Image.configure({
        HTMLAttributes: { class: 'image-node', 'data-type': 'image' },
        inline: false,
      }),
      // ImageResize.configure({
      //   HTMLAttributes: { class: 'image-node' },
      //   inline: false,
      // }),
      Link.configure({
        HTMLAttributes: { class: 'link-node', target: '_blank', 'data-type': 'link' },
        autolink: true,
        openOnClick: false,
        linkOnPaste: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        /**
         * isAllowedUri
         *
         * 用于自定义链接验证逻辑，可以修改默认的验证规则，在链接被创建或粘贴前进行URL的合法性验证
         * 使用场景：
         *  - 需要限制特定协议的URL
         *  - 需要验证域名白名单
         *  - 需要阻止相对路径URL
         *  - 需要自定义URL格式验证规则
         */
        isAllowedUri: (url, ctx) => {
          return ctx.defaultValidate(url) && !url.startsWith('./');
        },
        /**
         * shouldAutoLink
         *
         * 控制是否将已经通过验证的URL自动转换为链接，只有在URL已经通过isAllowedUri验证后才会被调用
         * 只有在URL已经通过 isAllowedUri 验证后才会被调用（只负责控制是否将合法URL转换为链接）
         * 使用场景：
         *  - 需要根据URL特征决定是否自动创建链接
         *  - 只想对某些特定类型的URL进行自动链接处理
         *  - 需要对自动链接行为进行更精细的控制
         */
        shouldAutoLink: () => true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),
      TaskList.configure({
        HTMLAttributes: { class: 'task-list-node', 'data-type': 'taskList' },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: { class: 'task-item-node', 'data-type': 'taskItem' },
      }),

      Table.configure({
        HTMLAttributes: { class: 'table-node', 'data-type': 'table' },
        resizable: true,
      }),
      TableCell.configure({
        HTMLAttributes: { class: 'table-cell-node', 'data-type': 'tableCell' },
      }),
      TableHeader.configure({
        HTMLAttributes: { class: 'table-header-node', 'data-type': 'tableHeader' },
      }),
      TableRow.configure({
        HTMLAttributes: { class: 'table-row-node', 'data-type': 'tableRow' },
      }),
    ],
  });

  return (
    <div className="EditorComponent size-full overflow-x-auto bg-[#f9fbfd] px-4 print:bg-white print:overflow-visible relative">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent className="editor-root" editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};
