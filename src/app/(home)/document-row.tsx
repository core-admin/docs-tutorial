import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { UsePaginatedQueryResult } from 'convex/react';
import { Building2Icon, CircleUserIcon, MoreVerticalIcon, ShareIcon } from 'lucide-react';
import { Doc } from '../../../convex/_generated/dataModel';
import { SiGoogledocs } from 'react-icons/si';
import { format } from 'date-fns';

export const DocumentRow = ({ document }: { document: Doc<'documents'> }) => {
  return (
    // <TableRow className="hover:bg-transparent">
    //   <TableCell colSpan={2}>{document.title}</TableCell>
    //   <TableCell colSpan={2}>
    //     <Button variant="outline" size="icon">
    //       <ShareIcon className="size-4" />
    //     </Button>
    //   </TableCell>
    //   <TableCell>{new Date(document._creationTime).toLocaleString()}</TableCell>
    // </TableRow>

    <TableRow className="cursor-pointer">
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? <Building2Icon className="size-4" /> : <CircleUserIcon className="size-4" />}
        {document.organizationId ? '组织' : '个人'}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(document._creationTime, 'yyyy-MM-dd HH:mm')}
      </TableCell>
      <TableCell className="flex justify-end">
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
