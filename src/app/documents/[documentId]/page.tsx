import { Editor } from './editor';
import { Navbar } from './navbar';
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
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] h-[104px] print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[104px] print:pt-0">
        <Editor />
      </div>
    </div>
  );
};

export default DocumentIdPage;
