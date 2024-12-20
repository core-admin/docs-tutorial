import { useSearchParam } from '@/hooks/use-search-param';
import { useStableQuery } from '@/hooks/use-stable-query';
import { BsCloudCheck } from 'react-icons/bs';
import { api } from '../../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '../../../../convex/_generated/dataModel';

export const DocumentInput = () => {
  const { documentId } = useParams();
  const document = useStableQuery(api.documents.getById, { id: documentId as Id<'documents'> });

  return (
    <div className="DocumentInputComponent flex items-center gap-2">
      <span className="text-base px-1.5 truncate">{document?.title ?? '无标题文档'}</span>
      <BsCloudCheck />
    </div>
  );
};
