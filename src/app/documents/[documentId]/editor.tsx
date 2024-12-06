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

import { useEditorStore } from '@/store/use-editor-store';

export const Editor = () => {
  const { setEditor } = useEditorStore();

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
        style: 'padding-left: 56px; padding-right: 56px;',
        lang: 'zh-CN',
      },
    },
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: { class: 'paragraph-node' },
        },
        bulletList: {
          HTMLAttributes: { class: 'bullet-node111' },
        },
        listItem: {
          HTMLAttributes: { class: 'list-item-node' },
        },
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
          HTMLAttributes: { class: 'heading-node' },
        },
        code: {
          HTMLAttributes: { class: 'code-node' },
        },
      }),
      Placeholder.configure({
        placeholder: 'Write something ...',
      }),
      Underline.configure({
        HTMLAttributes: { class: 'underline-node' },
      }),
      Highlight.configure({
        HTMLAttributes: { class: 'highlight-node' },
        multicolor: true,
      }),
      FontFamily,
      TextStyle,
      Color,
      Image.configure({
        HTMLAttributes: { class: 'image-node' },
        inline: false,
      }),
      // ImageResize.configure({
      //   HTMLAttributes: { class: 'image-node' },
      //   inline: false,
      // }),
      Link.configure({
        HTMLAttributes: { class: 'link-node', target: '_blank' },
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
        HTMLAttributes: { class: 'task-list-node' },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: { class: 'task-item-node' },
      }),

      Table.configure({
        HTMLAttributes: { class: 'table-node' },
        resizable: true,
      }),
      TableCell.configure({
        HTMLAttributes: { class: 'table-cell-node' },
      }),
      TableHeader.configure({
        HTMLAttributes: { class: 'table-header-node' },
      }),
      TableRow.configure({
        HTMLAttributes: { class: 'table-row-node' },
      }),
    ],
    content: ``,
  });

  return (
    <div className="size-full overflow-x-auto bg-[#f9fbfd] px-4 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent className="editor-root" editor={editor} />
      </div>
    </div>
  );
};
