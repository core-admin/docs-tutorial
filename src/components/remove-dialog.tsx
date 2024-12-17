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

interface RemoveDialogProps {
  documentId: Id<'documents'>;
  children: React.ReactNode;
}

export const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {
  const remove = useMutation(api.documents.removeById);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    remove({ id: documentId }).finally(() => {
      setIsRemoving(false);
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定要删除此文档吗？</AlertDialogTitle>
          <AlertDialogDescription>此操作无法撤销，这将永久删除您的文档</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRemoving} onClick={e => e.stopPropagation()}>
            取消
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemoving}
            onClick={e => {
              e.stopPropagation();
              handleRemove();
            }}
          >
            确定
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
