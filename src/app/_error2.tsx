'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <AlertCircle className="mx-auto h-16 w-16 text-indigo-400 animate-pulse" />
          <h2 className="text-3xl font-semibold text-gray-700 sm:text-4xl">哎呀，出了点小问题</h2>
          <p className="text-xl text-gray-600">别担心，这种情况偶尔会发生。我们正在努力解决。</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={reset}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-500 text-white rounded-full font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-blue-50 transition duration-150 ease-in-out flex items-center justify-center"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            重新尝试
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-white text-indigo-500 rounded-full font-medium hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-blue-50 transition duration-150 ease-in-out flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            返回首页
          </Link>
        </div>
        {error.digest && (
          <div className="mt-8">
            <p className="text-sm text-gray-500">
              错误代码：
              <code className="font-mono bg-indigo-100 px-2 py-1 rounded text-indigo-700">{error.digest}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
