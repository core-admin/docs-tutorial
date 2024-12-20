import { ClientSideSuspense } from '@liveblocks/react/suspense';
import { useOthers, useSelf } from '@liveblocks/react/suspense';
import { Separator } from '@/components/ui/separator';

/* eslint-disable @next/next/no-img-element */
const AVATAR_SIZE = 36;

interface AvatarProps {
  src: string;
  name: string;
}

const AvatarStack = () => {
  let users = useOthers();
  const currentUser = useSelf();

  if (!users.length) return null;

  users = users.filter(user => user.id !== currentUser.id);

  return (
    <>
      <div className="AvatarStackComponent flex items-center">
        {currentUser && (
          <div className="relative ml-2">
            <Avatar src={currentUser.info.avatar} name="You" />
          </div>
        )}
        <div className="flex">
          {users.map(({ connectionId, info }) => (
            <Avatar key={connectionId} src={info.avatar} name={info.name} />
          ))}
        </div>
      </div>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
};

export const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <div
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
      }}
      className="AvatarComponent group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
    >
      <img src={src} alt={name} className="size-full object-cover rounded-full" />
      <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-1.5 text-white text-xs rounded-sm mt-2 z-10 bg-black whitespace-nowrap transition-opacity">
        {name}
      </div>
    </div>
  );
};

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};
