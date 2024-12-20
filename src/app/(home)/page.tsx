'use client';

import { Navbar } from './navbar';
import TemplatesGallery from './templates-gallery';
import { usePaginatedQuery, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useEffect } from 'react';
import { useStablePaginatedQuery } from '@/hooks/use-stable-paginated-query';
import { DocumentsTable } from './documents-table';
import { useSearchParam } from '@/hooks/use-search-param';

const Home = () => {
  const [search] = useSearchParam();
  const pageSize = 10;

  const {
    results: documents,
    status,
    loadMore,
    isLoading,
  } = useStablePaginatedQuery(api.documents.get, { search }, { initialNumItems: pageSize });

  useEffect(() => {
    if (!search) {
      return;
    }
    if (status === 'LoadingFirstPage' && documents.length === 0) {
      return;
    }
    if (status !== 'CanLoadMore' || isLoading) {
      return;
    }
    if (documents.length === 0) {
      return;
    }
    if (documents.length < pageSize) {
      loadMore(pageSize);
    }
  }, [documents, status, isLoading, loadMore, pageSize, search]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsTable
          documents={documents}
          loadMore={() => loadMore(pageSize)}
          status={status}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Home;
