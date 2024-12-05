import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link2Icon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const LinkButton = () => {
  const { editor } = useEditorStore();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (link: string) => {
    /**
     * extendMarkRange 扩展选中范围到整个链接标记
     * setLink 设置链接的 href 属性为传入的 value 值
     */
    editor?.chain().focus().extendMarkRange('link').setLink({ href: link }).run();
    setValue('');
    setOpen(false);
  };

  const onOpenChange = (_open: boolean) => {
    setOpen(_open);
    if (_open) {
      // 获取当前链接
      const currentLink = editor?.getAttributes('link').href || '';
      setValue(currentLink);
      // 使用 setTimeout 确保在 DOM 更新后聚焦
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          // 使用 currentLink.length 而不是 value.length
          inputRef.current.setSelectionRange(currentLink.length, currentLink.length);
        }
      });
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm focus:outline-none">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          ref={inputRef}
          placeholder="输入/粘贴链接"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onChange(value);
            }
          }}
        />
        <Button onClick={() => onChange(value)}>确定</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
