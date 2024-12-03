interface DocumentIdPageProps {
  // https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
  params: Promise<{
    documentId: string;
  }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  return <div>DocumentIdPage {documentId}</div>;
};

export default DocumentIdPage;
