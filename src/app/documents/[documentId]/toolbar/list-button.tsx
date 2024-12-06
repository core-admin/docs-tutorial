import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListIcon, ListOrderedIcon } from 'lucide-react';
import { ToolbarButton } from './toolbar-button';
import { cn } from '@/lib/utils';

export const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: '无序列表',
      icon: ListIcon,
      isActive: () => editor?.isActive('bulletList') ?? false,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: '有序列表',
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive('orderedList') ?? false,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  const _onSelect = (fn: () => void) => {
    // 保存当前选区和内容长度
    const { from, to } = editor?.state.selection ?? {};
    const contentLength = editor?.state.doc.textContent.length ?? 0;

    fn();

    // 恢复选区，需要考虑列表转换后的位置偏移
    if (from !== undefined && to !== undefined) {
      setTimeout(() => {
        // 获取转换后的文档长度
        const newContentLength = editor?.state.doc.textContent.length ?? 0;
        // 计算内容长度的差值，用于调整位置
        const offset = newContentLength - contentLength;

        try {
          // 尝试设置新的选区位置
          editor
            ?.chain()
            .focus()
            .setTextSelection({
              from: Math.max(1, from + offset),
              to: Math.max(1, to + offset),
            })
            .run();
        } catch (error) {
          // 如果设置失败，至少保持编辑器焦点
          editor?.chain().focus().run();
        }
      });
    }
  };

  const onSelect = (fn: () => void) => {
    fn();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltipLabel="列表">
          <ListIcon className="size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()}>
        {lists.map(({ label, icon: Icon, isActive, onClick }) => (
          <DropdownMenuItem
            className={cn('cursor-pointer', isActive() && 'bg-accent')}
            key={label}
            onSelect={() => onSelect(onClick)}
          >
            <Icon className="size-4" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
