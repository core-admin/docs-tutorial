'use client';

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';
import FullscreenLoader from '@/components/fullscreen-loader';
import { getUsers } from './actions';

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

  const resolveRoomsInfo = ({ roomIds }: { roomIds: string[] }) => {
    return [];
  };

  /**
   * 根据用户id列表，返回用户信息列表
   */
  const resolveUsers = ({ userIds }: { userIds: string[] }) => {
    return userIds.map(id => users.find(user => user.id === id)).filter(Boolean);
  };

  return (
    <LiveblocksProvider
      // publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY!}
      authEndpoint={'/api/liveblocks-auth'}
      throttle={16}
      resolveMentionSuggestions={resolveMentionSuggestions}
      resolveRoomsInfo={resolveRoomsInfo}
      resolveUsers={resolveUsers}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullscreenLoader label="文档加载中..." />}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
