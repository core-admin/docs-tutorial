const DocumentsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <nav className="w-full bg-red-500">Document navbar</nav>
      {children}
    </div>
  );
};

export default DocumentsLayout;
