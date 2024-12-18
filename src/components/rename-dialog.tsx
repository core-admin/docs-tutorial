'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Id } from '../../convex/_generated/dataModel';
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ErrorMessage } from './error-message';

interface RenameDialogProps {
  documentId: Id<'documents'>;
  initialTitle: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const MAX_TITLE_LENGTH = 30;

export const RenameDialog = ({ documentId, initialTitle, children, onOpenChange }: RenameDialogProps) => {
  const update = useMutation(api.documents.updateById);
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
      setError(`标题不能超过 ${MAX_TITLE_LENGTH} 个字符`);
      return;
    }

    if (trimmedTitle.length === 0) {
      setError('标题不能为空');
      return;
    }

    setIsUpdating(true);
    setError('');

    update({ id: documentId, title: title.trim() })
      .then(() => {
        handleOpenChange(false);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    onOpenChange?.(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>重命名文档</DialogTitle>
            <DialogDescription>输入此文档的新名称</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="输入新名称" />
            {error && <ErrorMessage className="mt-4" message={error} />}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" disabled={isUpdating} onClick={() => handleOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" disabled={isUpdating || !title.trim()}>
              保存
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
