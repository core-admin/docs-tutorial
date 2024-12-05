import { Editor } from './editor';
import { Toolbar } from './toolbar';

interface DocumentIdPageProps {
  // https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
  params: Promise<{
    documentId: string;
  }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  return (
    <div className="min-h-full bg-[#fafbfd]">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
