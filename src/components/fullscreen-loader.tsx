import { LoaderIcon } from 'lucide-react';

export type FullscreenLoaderProps = {
  label?: string;
};

const FullscreenLoader = ({ label }: FullscreenLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <LoaderIcon className="size-6 text-muted-foreground animate-spin" />
      {label && <span className="text-muted-foreground">{label}</span>}
    </div>
  );
};

export default FullscreenLoader;
