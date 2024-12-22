'use server';

import { getUserOtherInfo } from '@/lib/utils';
import { auth, clerkClient, User } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getUsers() {
  const { sessionClaims } = await auth()!;

  if (!sessionClaims) {
    throw new Error('无权限访问');
  }

  const clerk = await clerkClient();

  const response = await clerk.users.getUserList({
    organizationId: [sessionClaims.org_id as string],
  });

  const users = response.data.map(user => {
    const { color, name } = getUserOtherInfo(user);
    return {
      id: user.id,
      name,
      avatar: user.imageUrl,
      color,
    };
  });

  return users;
}

export async function getDocuments(ids: Id<'documents'>[]) {
  return convex.query(api.documents.getByIds, { ids });
}
