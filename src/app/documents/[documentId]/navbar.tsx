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
  MenubarSubContent,
  MenubarSubTrigger,
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
import { memo, useState, useReducer } from 'react';
import { Avatars } from './avatars';
import { Inbox } from './inbox';
import { Doc } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RemoveDialog } from '@/components/remove-dialog';
import { RenameDialog } from '@/components/rename-dialog';

const RightUserAction = () => (
  <div className="RightUserActionComponent flex gap-3 items-center">
    <Avatars />
    <Inbox />
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

interface NavbarProps {
  data: Doc<'documents'>;
}

export const Navbar = ({ data }: NavbarProps) => {
  const platform = usePlatform();
  const { editor } = useEditorStore();

  const router = useRouter();
  const createDocument = useMutation(api.documents.create);

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
    onDownload(blob, `${data.title}.json`); // TODO: 获取文件名
  };

  const onDownloadHtml = () => {
    if (!editor) {
      return;
    }
    const blob = new Blob([editor.getHTML()], { type: 'text/html' });
    onDownload(blob, `${data.title}.html`); // TODO: 获取文件名
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
    onDownload(blob, `${data.title}.txt`); // TODO: 获取文件名
  };

  // const [currentMenubar, setCurrentMenubar] = useState<string | undefined>(undefined);
  // const onMenubarChange = (menu: string) => {
  //   setCurrentMenubar(menu);
  // };

  const onCreateDocument = () => {
    toast.promise(
      () =>
        createDocument({ title: '未命名文档' }).then(id => {
          router.push(`/documents/${id}`);
        }),
      {
        loading: '创建中...',
        success: '创建成功',
        error: '创建失败',
      },
    );
  };

  const documentRemoveComplete = () => {
    router.replace('/');
  };

  return (
    <nav className="NavbarComponent flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
        </Link>
        <div className="flex flex-col gap-y-1">
          <DocumentInput title={data.title} id={data._id} />
          <div className="flex">
            <Menubar
              className="border-none bg-transparent shadow-none h-auto p-0"
              // value={currentMenubar}
              // onValueChange={onMenubarChange}
            >
              <MenubarMenu value="file">
                <MenubarTrigger className="font-normal">文件</MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarItem onClick={onCreateDocument}>
                    <FilePlusIcon className="size-4 mr-2" />
                    新建文档
                  </MenubarItem>
                  <RenameDialog
                    documentId={data._id}
                    initialTitle={data.title}
                    // onOpenChange={open => !open && setCurrentMenubar(undefined)}
                  >
                    <MenubarItem onSelect={e => e.preventDefault()}>
                      <FilePenIcon className="size-4 mr-2" />
                      重命名...
                    </MenubarItem>
                  </RenameDialog>

                  <MenubarSeparator />

                  {/* <MenubarItem>
                    <SaveIcon className="size-4 mr-2" />
                    保存
                  </MenubarItem> */}
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
                  <RemoveDialog documentId={data._id} onComplete={documentRemoveComplete}>
                    <MenubarItem onSelect={e => e.preventDefault()}>
                      <Trash2Icon className="size-4 mr-2" />
                      删除
                    </MenubarItem>
                  </RemoveDialog>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu value="edit">
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

              <MenubarMenu value="insert">
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

              <MenubarMenu value="format">
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
