import { useEditorStore } from '@/store/use-editor-store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link2Icon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolbarButton } from './toolbar-button';

export const LinkButton = () => {
  const { editor } = useEditorStore();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = (link: string) => {
    /**
     * extendMarkRange 扩展选中范围到整个链接标记
     * setLink 设置链接的 href 属性为传入的 value 值
     */
    editor?.chain().focus().extendMarkRange('link').setLink({ href: link }).run();
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
        <ToolbarButton tooltipLabel="插入链接">
          <Link2Icon className="size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()} className="p-2.5 flex items-center gap-x-2">
        <Input
          ref={inputRef}
          placeholder="输入/粘贴链接"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleConfirm(value);
            }
          }}
        />
        <Button onClick={() => handleConfirm(value)}>确定</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
