'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Id } from '../../convex/_generated/dataModel';
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useState } from 'react';
// import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

interface RemoveDialogProps {
  documentId: Id<'documents'>;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  onComplete?: () => void;
}

export const RemoveDialog = ({ documentId, children, onOpenChange, onComplete }: RemoveDialogProps) => {
  const remove = useMutation(api.documents.removeById);
  const [isRemoving, setIsRemoving] = useState(false);
  const [open, setOpen] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    remove({ id: documentId })
      .then(() => {
        toast.success('文档已删除');
        onComplete?.();
      })
      .catch(e => {
        toast.error(e.data || e.message || '删除失败');
      })
      .finally(() => {
        setIsRemoving(false);
      });
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    onOpenChange?.(open);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={e => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>确定要删除此文档吗？</AlertDialogTitle>
          <AlertDialogDescription>此操作无法撤销，这将永久删除您的文档</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRemoving}>取消</AlertDialogCancel>
          <AlertDialogAction disabled={isRemoving} onClick={handleRemove}>
            确定
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
