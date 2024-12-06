import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
// import { LucideIcon } from 'lucide-react';

export const ToolbarButtonWithTooltip = ({ children, label }: { children: React.ReactNode; label: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};

export interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  isActive?: boolean;
  // icon: LucideIcon;
  children?: React.ReactNode;
  className?: string;
  tooltipLabel?: string;
}

export const ToolbarButton = ({
  onClick,
  isActive,
  className,
  children,
  tooltipLabel,
  ...rest
}: ToolbarButtonProps) => {
  const Button = (
    <button
      {...rest}
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center shrink-0 rounded-sm transition-colors hover:bg-neutral-200/80 focus:outline-none',
        isActive && 'bg-neutral-200/80',
        className,
      )}
    >
      {children}
    </button>
  );

  return tooltipLabel ? <ToolbarButtonWithTooltip label={tooltipLabel}>{Button}</ToolbarButtonWithTooltip> : Button;
};
