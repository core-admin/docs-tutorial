import { useEditorStore } from '@/store/use-editor-store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link2Icon, MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolbarButton } from './toolbar-button';
import { cn } from '@/lib/utils';
import { FontSizeOptions } from '@/extensions/font-size';

export const FontSzeButton = () => {
  const { editor } = useEditorStore();

  /**
   * 此扩展支持通过 configure 方法配置最小值、最大值和默认值
   * 如果未配置，则使用默认值
   *
   * 从编辑器的扩展中获取字体大小的配置选项
   */
  const {
    minSize = 8,
    maxSize = 48,
    defaultSize = 16,
    disallowedNodes = [],
  }: FontSizeOptions = editor?.extensionManager.extensions.find(
    // 编辑器中所有已注册扩展的数组
    ext =>
      // 从扩展中找到名为 fontSize 的扩展
      ext.name === 'fontSize',
  )?.options ?? {}; // 这些选项来自 addOptions() 的返回值和 configure() 的配置

  // 如果当前处于禁用节点内，则不设置字体大小
  const isInDisallowedNodes = disallowedNodes.includes(editor?.state.selection.$from.parent.type.name ?? '');

  const attrFontSize: string | undefined = editor?.getAttributes('textStyle')?.fontSize;
  const currentFontSize: string = attrFontSize ? attrFontSize.replace(/['"]+/g, '').replace('px', '') : '16';

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setInputValue(currentFontSize);
      inputRef.current?.focus();
    }
  }, [isEditing, currentFontSize]);

  const updateFontSize = (newSize: string) => {
    if (!editor) {
      return;
    }

    let sizeNum = parseInt(newSize, 10);

    // 处理无效输入或超出范围的情况
    if (isNaN(sizeNum) || sizeNum <= 0) {
      sizeNum = defaultSize; // 默认值
    } else if (sizeNum < minSize) {
      sizeNum = minSize; // 最小值
    } else if (sizeNum > maxSize) {
      sizeNum = maxSize; // 最大值
    }

    editor
      ?.chain()
      .focus()
      .setFontSize({ size: `${sizeNum}px` })
      .run();
    setFontSize(String(sizeNum));
    setInputValue(String(sizeNum));
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
    editor?.commands.focus();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increaseFontSize = () => {
    const newSize = parseInt(fontSize, 10) + 1;
    if (newSize > 48) {
      return;
    }
    updateFontSize(String(newSize));
  };

  const decreaseFontSize = () => {
    const newSize = parseInt(fontSize, 10) - 1;
    if (newSize < 8) {
      return;
    }
    updateFontSize(String(newSize));
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decreaseFontSize}
        className={cn(
          'text-sm h-7 w-7 flex items-center justify-center shrink-0 rounded-sm transition-colors hover:bg-neutral-200/80 focus:outline-none',
          (isInDisallowedNodes || fontSize === '8') && 'cursor-not-allowed opacity-50',
        )}
        disabled={isInDisallowedNodes || fontSize === '8'}
      >
        <MinusIcon className="size-4" />
      </button>

      {isEditing ? (
        <input
          className="text-sm h-7 w-8 text-center border border-neutral-400 bg-transparent rounded-sm cursor-text focus:outline-none focus:ring-0"
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
        />
      ) : (
        <button
          className={cn(
            'text-sm h-7 w-8 text-center border border-neutral-400 bg-transparent rounded-sm cursor-text focus:outline-none focus:ring-0',
            isInDisallowedNodes && 'cursor-not-allowed opacity-50',
          )}
          disabled={isInDisallowedNodes}
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
        >
          {currentFontSize}
        </button>
      )}

      <button
        onClick={increaseFontSize}
        className={cn(
          'text-sm h-7 w-7 flex items-center justify-center shrink-0 rounded-sm transition-colors hover:bg-neutral-200/80 focus:outline-none',
          (isInDisallowedNodes || fontSize === '48') && 'cursor-not-allowed opacity-50',
        )}
        disabled={isInDisallowedNodes || fontSize === '48'}
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};
