import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: '正文', value: 0, fontSize: '16px' },
    { label: '一级标题', value: 1, fontSize: '32px', styleSize: '28px' },
    { label: '二级标题', value: 2, fontSize: '24px' },
    { label: '三级标题', value: 3, fontSize: '20px' },
    { label: '四级标题', value: 4, fontSize: '18px' },
    { label: '五级标题', value: 5, fontSize: '16px' },
    { label: '六级标题', value: 6, fontSize: '16px' },
  ];

  const getCurrentHeadingLevel = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor?.isActive('heading', { level })) {
        return level;
      }
    }
    return 0;
  };

  const currentHeadingLevel = getCurrentHeadingLevel();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-[80px] shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm focus:outline-none">
          <span className="truncate">{headings[currentHeadingLevel].label}</span>
          <ChevronDownIcon className="size-4 ml-2 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {headings.map((heading, index) => (
          <DropdownMenuItem
            key={heading.value}
            className={cn('focus:outline-none cursor-pointer', index === currentHeadingLevel && 'bg-accent')}
            style={{ fontSize: heading.styleSize ?? heading.fontSize, lineHeight: 1.2, height: 'auto' }}
            onSelect={() => {
              if (index === currentHeadingLevel) {
                return;
              }
              if (index === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .setHeading({ level: heading.value as any })
                  .run();
              }
            }}
          >
            {heading.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
