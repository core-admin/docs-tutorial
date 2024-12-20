'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

// export default function Error() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
//       <div className="text-center space-y-4">
//         <div className="flex justify-center">
//           <div className="bg-rose-100 p-3 rounded-full">
//             <AlertTriangleIcon className="size-10 text-rose-600" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-16 w-16 text-red-500" />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">出错了！</h1>
          <p className="mt-2 text-base text-gray-500">很抱歉，我们遇到了一些问题。请稍后再试。</p>
        </div>
        <div className="mt-8">
          <button
            onClick={reset}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            重试
          </button>
        </div>
        {error.digest && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              错误代码：<code className="font-mono">{error.digest}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
