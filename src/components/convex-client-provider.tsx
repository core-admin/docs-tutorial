'use client';

import { ConvexProvider, ConvexReactClient, Unauthenticated, Authenticated, AuthLoading } from 'convex/react';
import { ClerkProvider, useAuth, SignIn } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { zhCN } from '@clerk/localizations';
import FullscreenLoader from './fullscreen-loader';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
//   return <ConvexProvider client={convex}>{children}</ConvexProvider>;
// }

export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={zhCN} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex h-screen items-center justify-center">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullscreenLoader label="应用加载中..." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
