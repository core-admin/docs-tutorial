import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm px-1.5 overflow-hidden text-sm focus:outline-none">
          <span className="truncate">{editor?.getAttributes('textStyle').fontFamily || 'Arial'}</span>
          <ChevronDownIcon className="size-4 ml-2 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
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
