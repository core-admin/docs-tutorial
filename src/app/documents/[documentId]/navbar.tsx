'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DocumentInput } from './document-input';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
} from '@/components/ui/menubar';
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  SaveIcon,
  StrikethroughIcon,
  TextIcon,
  Trash2Icon,
  UnderlineIcon,
  Undo2Icon,
  EraserIcon,
} from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';
import { usePlatform } from '@/hooks/use-platform';
import { useEditorStore } from '@/store/use-editor-store';
import { UserButton, OrganizationSwitcher } from '@clerk/nextjs';
import { memo } from 'react';
import { Avatars } from './avatars';

const RightUserAction = () => (
  <div className="flex gap-3 items-center">
    <Avatars />
    <OrganizationSwitcher
      afterCreateOrganizationUrl="/"
      afterLeaveOrganizationUrl="/"
      afterSelectOrganizationUrl="/"
      afterSelectPersonalUrl="/"
    />
    <UserButton />
  </div>
);

const MemoRightUserAction = memo(RightUserAction);

export const Navbar = () => {
  const platform = usePlatform();
  const { editor } = useEditorStore();

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor?.chain().focus().insertTable({ rows, cols }).run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onDownloadJson = () => {
    if (!editor) {
      return;
    }
    const blob = new Blob([JSON.stringify(editor.getJSON())], { type: 'application/json' });
    onDownload(blob, 'document.json'); // TODO: 获取文件名
  };

  const onDownloadHtml = () => {
    if (!editor) {
      return;
    }
    const blob = new Blob([editor.getHTML()], { type: 'text/html' });
    onDownload(blob, 'document.html'); // TODO: 获取文件名
  };

  // TODO: 功能未实现
  const onDownloadPdf = () => {
    window.print();
  };

  const onDownloadText = () => {
    if (!editor) {
      return;
    }
    const blob = new Blob([editor.getText()], { type: 'text/plain' });
    onDownload(blob, 'document.txt'); // TODO: 获取文件名
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
        </Link>
        <div className="flex flex-col gap-y-1">
          <DocumentInput />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="font-normal">文件</MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarItem>
                    <FilePlusIcon className="size-4 mr-2" />
                    新建文档
                  </MenubarItem>
                  <MenubarItem>
                    <FilePenIcon className="size-4 mr-2" />
                    重命名...
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarItem>
                    <SaveIcon className="size-4 mr-2" />
                    保存
                  </MenubarItem>
                  <MenubarSub>
                    <MenubarSubTrigger className="font-normal">
                      <FileIcon className="size-4 mr-2" />
                      另存为
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onDownloadJson}>
                        <FileJsonIcon className="size-4 mr-2" />
                        JSON文件
                      </MenubarItem>
                      <MenubarItem onClick={onDownloadHtml}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML文件
                      </MenubarItem>
                      <MenubarItem onClick={onDownloadPdf}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF文件
                      </MenubarItem>
                      <MenubarItem onClick={onDownloadText}>
                        <FileTextIcon className="size-4 mr-2" />
                        文本文件
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4 mr-2" />
                    打印
                    <MenubarShortcut>{platform === 'mac' ? '⌘ P' : 'Ctrl P'}</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <Trash2Icon className="size-4 mr-2" />
                    删除
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="font-normal">编辑</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                    <Undo2Icon className="size-4 mr-2" />
                    撤销
                    <MenubarShortcut>{platform === 'mac' ? '⌘ Z' : 'Ctrl Z'}</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                    <Redo2Icon className="size-4 mr-2" />
                    重做
                    <MenubarShortcut>{platform !== 'mac' ? 'Shift Ctrl Z' : 'Shift ⌘ Z'}</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="font-normal">插入</MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger className="font-normal">表格</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>1 x 1</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>2 x 2</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>3 x 3</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>4 x 4</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 5, cols: 5 })}>5 x 5</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="font-normal">格式化</MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger className="font-normal">
                      <TextIcon className="size-4 mr-2" />
                      文本
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                        <BoldIcon className="size-4 mr-2" />
                        粗体
                        <MenubarShortcut>{platform === 'mac' ? '⌘ B' : 'Ctrl B'}</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                        <ItalicIcon className="size-4 mr-2" />
                        斜体
                        <MenubarShortcut>{platform === 'mac' ? '⌘ I' : 'Ctrl I'}</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                        <UnderlineIcon className="size-4 mr-2" />
                        下划线
                        <MenubarShortcut>{platform === 'mac' ? '⌘ U' : 'Ctrl U'}</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                        <StrikethroughIcon className="size-4 mr-2" />
                        删除线 &nbsp;&nbsp;
                        <MenubarShortcut>{platform === 'mac' ? '⌘ Shift S' : 'Ctrl_Shift S'}</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                    <EraserIcon className="size-4 mr-2" />
                    清除文本格式 &nbsp;&nbsp;
                    <MenubarShortcut>{platform !== 'mac' ? 'Shift Ctrl Z' : 'Shift ⌘ Z'}</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <MemoRightUserAction />
    </nav>
  );
};
