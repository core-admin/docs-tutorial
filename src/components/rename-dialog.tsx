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

interface RenameDialogProps {
  documentId: Id<'documents'>;
  initialTitle: string;
  children: React.ReactNode;
}

export const RenameDialog = ({ documentId, initialTitle, children }: RenameDialogProps) => {
  const update = useMutation(api.documents.updateById);
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    update({ id: documentId, title: title.trim() })
      .then(() => {
        setOpen(false);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>重命名文档</DialogTitle>
            <DialogDescription>输入此文档的新名称</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="输入新名称" />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isUpdating}
              onClick={e => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              取消
            </Button>
            <Button type="submit" disabled={isUpdating || !title.trim()} onClick={e => e.stopPropagation()}>
              保存
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
