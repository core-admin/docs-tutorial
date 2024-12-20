'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw, ArrowLeft, AlertTriangleIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-rose-100 p-3 rounded-full">
            <AlertTriangleIcon className="size-10 text-rose-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">哎呀，出错了！</h2>
          <p>{error.message}</p>
          {/* <p className="text-base text-gray-500">很抱歉，我们遇到了一些问题。请稍后再试。</p> */}
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        <Button onClick={reset} className="font-medium px-6">
          重新尝试
        </Button>

        <Button onClick={reset} asChild variant="ghost">
          <Link href="/">
            <ArrowLeft className="size-4" />
            返回首页
          </Link>
        </Button>
      </div>
    </div>
  );
}
