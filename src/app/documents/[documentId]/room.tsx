'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';
import FullscreenLoader from '@/components/fullscreen-loader';
import { getDocuments, getUsers } from './actions';
import { Id } from '../../../../convex/_generated/dataModel';

interface User {
  id: string;
  name: string;
  avatar: string;
}

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const list = await getUsers();
      setUsers(list);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const resolveMentionSuggestions = ({ roomId, text }: { roomId: string; text: string }) => {
    let filteredUsers = users;

    if (text) {
      filteredUsers = users.filter(user => {
        return user.name.toLocaleLowerCase().includes(text.toLocaleLowerCase());
      });
    }

    return filteredUsers.map(user => user.id);
  };

  const resolveRoomsInfo = async ({ roomIds }: { roomIds: string[] }) => {
    const documents = await getDocuments(roomIds as Id<'documents'>[]);
    return documents.map(document => ({
      id: document.id,
      name: document.name,
    }));
  };

  /**
   * 根据用户id列表，返回用户信息列表
   */
  const resolveUsers = ({ userIds }: { userIds: string[] }) => {
    return userIds.map(id => users.find(user => user.id === id)).filter(Boolean);
  };

  const authEndpoint = async () => {
    const endpoint = '/api/liveblocks-auth';
    const room = params.documentId as string;

    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ room }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch auth endpoint');
    }

    return response.json();
  };

  return (
    <LiveblocksProvider
      // publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY!}
      // authEndpoint={'/api/liveblocks-auth'}
      authEndpoint={authEndpoint}
      throttle={16}
      resolveMentionSuggestions={resolveMentionSuggestions}
      resolveRoomsInfo={resolveRoomsInfo}
      resolveUsers={resolveUsers}
    >
      <RoomProvider
        id={params.documentId as string}
        initialStorage={{
          leftMargin: 56,
          rightMargin: 56,
        }}
      >
        <ClientSideSuspense fallback={<FullscreenLoader label="建立连接中 ..." />}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
