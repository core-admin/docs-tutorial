import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';
import { ToolbarButton } from './toolbar-button';

export const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: '左对齐',
      value: 'left',
      icon: AlignLeftIcon,
    },
    {
      label: '居中对齐',
      value: 'center',
      icon: AlignCenterIcon,
    },
    {
      label: '右对齐',
      value: 'right',
      icon: AlignRightIcon,
    },
    {
      label: '两端对齐',
      value: 'justify',
      icon: AlignJustifyIcon,
    },
  ];

  const handleAlign = (value: string) => {
    // 获取当前选区
    const { from, to } = editor?.state.selection ?? {};

    editor?.chain().focus().setTextAlign(value).run();

    // 恢复选区
    if (from !== undefined && to !== undefined) {
      setTimeout(() => {
        editor?.chain().focus().setTextSelection({ from, to }).run();
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltipLabel="对齐方式">
          <AlignLeftIcon className="size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      {/* 
        https://github.com/shadcn-ui/ui/issues/1630
        https://stackoverflow.com/questions/77363536/how-to-nest-radix-tooltip-dropdown-components

        onCloseAutoFocus 事件在 DropdownMenu 关闭时触发，阻止自动聚焦到触发按钮上，防止 tooltip 重新触发
      */}
      <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()}>
        {alignments.map(({ label, value, icon: Icon }) => (
          <DropdownMenuItem className="cursor-pointer" key={value} onSelect={() => handleAlign(value)}>
            <Icon className="size-4" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
