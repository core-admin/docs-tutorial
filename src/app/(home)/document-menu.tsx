'use client';

/**
 * Dialog.Trigger does not work if trigger is Dropdown.Item #1836
 * https://github.com/radix-ui/primitives/issues/1836
 */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExternalLinkIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Id } from '../../../convex/_generated/dataModel';
import { RemoveDialog } from '@/components/remove-dialog';
import { RenameDialog } from '@/components/rename-dialog';
import { useState } from 'react';

interface DocumentMenuProps {
  documentId: Id<'documents'>;
  title: string;
  onNewTab: (id: Id<'documents'>) => void;
}

export const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full focus-visible:ring-0">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={e => {
          // 防止点击事件会冒泡到 DocumentRow 组件上去，触发行的 click
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className="size-4 mr-2" />
          在新标签页中打开
        </DropdownMenuItem>
        <RenameDialog documentId={documentId} initialTitle={title} onOpenChange={setOpen}>
          <DropdownMenuItem onSelect={e => e.preventDefault()}>
            <PencilIcon className="size-4 mr-2" />
            重命名
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId} onOpenChange={setOpen}>
          <DropdownMenuItem
            onSelect={e => {
              /**
               * FIX: 阻止点击菜单后，AlertDialog 显示出来后又立马关闭的问题
               * 当选择了下拉菜单项目后，下拉菜单关闭，同时默认关闭 Dialog
               */
              e.preventDefault();
            }}
          >
            <TrashIcon className="size-4 mr-2" />
            删除
          </DropdownMenuItem>
        </RemoveDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
