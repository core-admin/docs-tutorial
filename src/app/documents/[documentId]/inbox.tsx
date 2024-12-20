import { ClientSideSuspense, useInboxNotifications } from '@liveblocks/react/suspense';
import { BellIcon } from 'lucide-react';
import { InboxNotification, InboxNotificationList } from '@liveblocks/react-ui';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="InboxMenuComponent_Trigger">
          <Button variant="ghost" className="relative focus-visible:ring-0" size="icon">
            <BellIcon className="size-5" />
            {inboxNotifications?.length > 0 && (
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-blue-500 text-xs text-white flex items-center justify-center">
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList className="_c_InboxNotificationList">
              {inboxNotifications.map(notification => (
                <InboxNotification key={notification.id} inboxNotification={notification} />
              ))}
            </InboxNotificationList>
          ) : (
            <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">无消息通知</div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
};

export const Inbox = () => {
  return (
    <ClientSideSuspense
      fallback={
        <Button variant="ghost" className="relative" size="icon">
          <BellIcon className="size-5" />
        </Button>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );
};
