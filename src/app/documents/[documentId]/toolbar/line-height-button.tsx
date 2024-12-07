import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, ListCollapseIcon } from 'lucide-react';
import { ToolbarButton } from './toolbar-button';
import { cn } from '@/lib/utils';

export const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    {
      label: '默认',
      value: 'inherit',
    },
    {
      label: '1.2',
      value: '1.2',
    },
    {
      label: '1.5',
      value: '1.5',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '2.5',
      value: '2.5',
    },
    {
      label: '3',
      value: '3',
    },
  ];

  const handleLineHeight = (value: string) => {
    editor?.chain().focus().setLineHeight(value).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltipLabel="行高调整">
          <ListCollapseIcon className="size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()}>
        {lineHeights.map(({ label, value }) => (
          <DropdownMenuItem
            className={cn(
              'focus:outline-none cursor-pointer',
              editor?.getAttributes('lineHeight')?.lineHeight === value && 'bg-accent',
            )}
            key={value}
            onSelect={() => handleLineHeight(value)}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
