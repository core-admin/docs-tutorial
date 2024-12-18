'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  className?: string;
}

export function ErrorMessage({ title, message, className }: ErrorMessageProps) {
  return (
    <div className={cn('rounded-md bg-red-50 p-4', className)}>
      <div className="flex">
        <div className="shrink-0">
          <AlertTriangle aria-hidden="true" className="size-5 text-red-400" />
        </div>
        <div className="ml-3">
          {title && <h3 className="text-sm font-medium text-red-800">{title}</h3>}
          {message && (
            <div className={cn('text-sm text-red-700', title ? 'mt-2' : '')}>
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
