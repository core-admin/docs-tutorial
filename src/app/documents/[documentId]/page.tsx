import { Editor } from './editor';
import { Navbar } from './navbar';
import { Toolbar } from './toolbar';
import { Room } from './room';
import { Id } from '../../../../convex/_generated/dataModel';
import { Document } from './document';
import { api } from '../../../../convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { preloadQuery } from 'convex/nextjs';

interface DocumentIdPageProps {
  // https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
  params: Promise<{
    documentId: Id<'documents'>;
  }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  const { getToken } = await auth();
  const token = (await getToken({ template: 'convex' })) ?? undefined;

  if (!token) {
    throw new Error('无权限访问');
  }

  const preloadedDocument = await preloadQuery(api.documents.getById, { id: documentId }, { token });

  return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentIdPage;
