/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
// import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="relative isolate min-h-screen">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
        className="absolute inset-0 -z-10 size-full object-cover object-top"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base/8 font-semibold text-white">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-white/70 sm:text-xl/8">
          抱歉，我们找不到您要找的页面。
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/" className="text-sm/7 font-semibold text-white">
            <span aria-hidden="true">&larr;</span> 返回首页
          </Link>
        </div>
      </div>
    </main>
  );
}
