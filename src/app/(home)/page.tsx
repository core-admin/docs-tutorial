'use client';

import { Navbar } from './navbar';
import TemplatesGallery from './templates-gallery';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useEffect } from 'react';
import { useStablePaginatedQuery } from '@/hooks/use-stable-paginated-query';
import { DocumentsTable } from './documents-table';

const Home = () => {
  const {
    results: documents,
    status,
    loadMore,
    isLoading,
  } = useStablePaginatedQuery(
    api.documents.get,
    {
      paginationOpts: {
        numItems: 10,
      },
    },
    { initialNumItems: 10 },
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsTable documents={documents} loadMore={loadMore} status={status} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home;
