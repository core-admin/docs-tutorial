'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import { EditorView } from '@tiptap/pm/view';

export const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text focus:outline-none print:border-0',
        style: 'padding-left: 56px; padding-right: 56px;',
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
      }),
      TaskList.configure({
        HTMLAttributes: { class: 'task-list-node' },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: { class: 'task-item-node' },
      }),
      Placeholder.configure({
        placeholder: 'Write something ...',
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
      Image.configure({
        HTMLAttributes: { class: 'image-node' },
      }),
      ImageResize,
    ],
    content: `
        <p>Try to drag around the image. While you drag, the editor should show a decoration under your cursor. The so called dropcursor.</p>
        <img src="https://placehold.co/800x400" />
      `,
  });

  return (
    <div className="size-full overflow-x-auto bg-[#f9fbfd] px-4 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent className="editor-root" editor={editor} />
      </div>
    </div>
  );
};
