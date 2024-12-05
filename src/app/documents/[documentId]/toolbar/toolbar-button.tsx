import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

export const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm transition-colors hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80',
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};
