import { TableCell, TableRow } from '@/components/ui/table';
import { Building2Icon, CircleUserIcon } from 'lucide-react';
import { Doc } from '../../../convex/_generated/dataModel';
import { SiGoogledocs } from 'react-icons/si';
import { format } from 'date-fns';
import { DocumentMenu } from './document-menu';
import { useRouter } from 'next/navigation';

export const DocumentRow = ({ document }: { document: Doc<'documents'> }) => {
  const router = useRouter();

  return (
    <TableRow>
      <TableCell colSpan={2} className="md:w-[45%]">
        <div
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => {
            router.push(`/documents/${document._id}`);
          }}
        >
          <SiGoogledocs className="size-6 fill-blue-500 flex-shrink-0" />
          <span className="font-medium transition-colors group-hover:text-blue-500">{document.title}</span>
        </div>
      </TableCell>
      {/* <TableCell className="font-medium md:w-[50%]">{document.title}</TableCell> */}
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? <Building2Icon className="size-4" /> : <CircleUserIcon className="size-4" />}
        {document.organizationId ? '组织' : '个人'}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(document._creationTime, 'yyyy-MM-dd HH:mm')}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={id => window.open(`/documents/${id}`, '_blank')}
        />
      </TableCell>
    </TableRow>
  );
};
