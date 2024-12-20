'use server';

import { getUserName } from '@/lib/utils';
import { auth, clerkClient, User } from '@clerk/nextjs/server';

export async function getUsers() {
  const { sessionClaims } = await auth()!;

  if (!sessionClaims) {
    throw new Error('无权限访问');
  }

  const clerk = await clerkClient();

  const response = await clerk.users.getUserList({
    organizationId: [sessionClaims.org_id as string],
  });

  const users = response.data.map(user => ({
    id: user.id,
    name: getUserName(user),
    avatar: user.imageUrl,
  }));

  return users;
}
