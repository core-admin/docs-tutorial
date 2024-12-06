import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToolbarButton } from './toolbar-button';

export const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Verdana', value: 'Verdana' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltipLabel="字体" className="min-w-[80px] px-1.5">
          <span className="truncate">{editor?.getAttributes('textStyle').fontFamily || 'Arial'}</span>
          <ChevronDownIcon className="size-4 ml-2 shrink-0" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()}>
        {fonts.map(font => (
          <DropdownMenuItem
            key={font.value}
            className={cn(
              'focus:outline-none cursor-pointer',
              editor?.getAttributes('textStyle').fontFamily === font.value && 'bg-accent',
            )}
            style={{ fontFamily: font.value }}
            onSelect={() => editor?.chain().focus().setFontFamily(font.value).run()}
          >
            {font.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
