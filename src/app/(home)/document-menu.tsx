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

interface DocumentMenuProps {
  documentId: Id<'documents'>;
  title: string;
  onNewTab: (id: Id<'documents'>) => void;
}

export const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full focus-visible:ring-0">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className="size-4 mr-2" />
          在新标签页中打开
        </DropdownMenuItem>
        <RenameDialog documentId={documentId} initialTitle={title}>
          <DropdownMenuItem onClick={e => e.stopPropagation()} onSelect={e => e.preventDefault()}>
            <PencilIcon className="size-4 mr-2" />
            重命名
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onClick={e => e.stopPropagation()}
            onSelect={e => {
              // FIX: 阻止点击菜单后，AlertDialog 显示出来后又立马关闭的问题
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
