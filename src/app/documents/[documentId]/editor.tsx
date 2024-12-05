'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';

import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

// import Image from '@tiptap/extension-image';
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
      // Image.configure({
      //   HTMLAttributes: { class: 'image-node' },
      // }),
      ImageResize,
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
