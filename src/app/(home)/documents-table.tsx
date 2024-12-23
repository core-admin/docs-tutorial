import { PaginationStatus, UsePaginatedQueryResult } from 'convex/react';
import { Doc } from '../../../convex/_generated/dataModel';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LoaderIcon, ShareIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocumentRow } from './document-row';
import { useMemo } from 'react';

type PaginatedQueryResult = UsePaginatedQueryResult<Doc<'documents'>>;

interface DocumentsTableProps {
  documents: PaginatedQueryResult['results'];
  // loadMore: PaginatedQueryResult['loadMore'];
  loadMore: () => void;
  status: PaginationStatus;
  isLoading: boolean;
}

export const DocumentsTable = ({ documents, status, isLoading, loadMore }: DocumentsTableProps) => {
  const loadText = useMemo(() => {
    if (status === 'LoadingMore') {
      return '正在加载';
    } else if (status === 'Exhausted') {
      return '没有更多了';
    } else if (status === 'CanLoadMore') {
      return '加载更多';
    }
    return null;
  }, [status]);

  const isMoreData = status === 'CanLoadMore';

  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <LoaderIcon className="animate-spin text-muted-foreground size-5" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead>名称</TableHead>
              <TableHead className="select-none">&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">分享</TableHead>
              <TableHead className="hidden md:table-cell">创建时间</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                  还没创建过文档，快去创建吧
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map(document => {
                return <DocumentRow key={document._id} document={document} />;
              })}
            </TableBody>
          )}
        </Table>
      )}

      {!isLoading && documents.length !== 0 && (
        <div className="flex items-center justify-center">
          {/* TODO: 添加禁用样式 */}
          <Button variant="ghost" size="sm" disabled={!isMoreData} onClick={() => loadMore()}>
            {loadText}
          </Button>
        </div>
      )}
    </div>
  );
};
