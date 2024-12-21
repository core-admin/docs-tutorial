// import { useSearchParam } from '@/hooks/use-search-param';
// import { useStableQuery } from '@/hooks/use-stable-query';
import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs';
// import { api } from '../../../../convex/_generated/api';
// import { useParams } from 'next/navigation';
import { Id } from '../../../../convex/_generated/dataModel';
import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from 'sonner';
import { useStatus } from '@liveblocks/react';
import { LoaderIcon } from 'lucide-react';

interface DocumentInputProps {
  title: string;
  id: Id<'documents'>;
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  // const { documentId } = useParams();
  // const document = useStableQuery(api.documents.getById, { id: documentId as Id<'documents'> });

  const status = useStatus();

  const [value, setValue] = useState(title);
  // const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const toastId = useRef<string | number | undefined>(undefined);

  const mutate = useMutation(api.documents.updateById);

  const toastWrapper = (fn: () => string | number | undefined) => {
    // if (toastId.current) {
    //   toast.dismiss(toastId.current);
    // }
    // toastId.current = fn();

    fn();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounceUpdate(newValue);
  };

  const debounceUpdate = useDebounce((newValue: string) => {
    if (newValue === title) {
      return;
    }

    if (newValue.trim() === '') {
      toastWrapper(() => toast.error('标题不能为空'));
      debounceUpdate('未命名文档');
      setIsEditing(false);
      return;
    }

    setIsPending(true);
    mutate({ id, title: newValue })
      .then(() => toastWrapper(() => toast.success('文档已更新')))
      .catch(() => toastWrapper(() => toast.error('更新失败')))
      .finally(() => setIsPending(false));
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value === title) {
      setIsEditing(false);
      return;
    }

    if (title.trim() === '') {
      toastWrapper(() => toast.error('标题不能为空'));
      debounceUpdate('未命名文档');
      setIsEditing(false);
      return;
    }

    setIsPending(true);
    mutate({ id, title: value })
      .then(() => {
        toastWrapper(() => toast.success('文档已更新'));
        setIsEditing(false);
      })
      .catch(() => toastWrapper(() => toast.error('更新失败')))
      .finally(() => setIsPending(false));
  };

  const showLoader = isPending || status === 'connecting' || status === 'reconnecting';
  const showError = status === 'disconnected';

  return (
    <div className="DocumentInputComponent flex items-center gap-2">
      {isEditing ? (
        <form className="relative w-fit max-w-[50ch]" onSubmit={handleSubmit}>
          <span className="invisible whitespace-pre px-1.5 text-base">{value || ''}</span>
          <input
            type="text"
            ref={inputRef}
            value={value}
            onChange={handleInputChange}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 text-base text-black px-1.5 bg-transparent truncate outline-none ring-2 ring-blue-500 rounded-sm"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            });
          }}
          className="max-w-[50ch] text-base px-1.5 truncate"
          title={title}
        >
          {title ?? '无标题文档'}
        </span>
      )}
      {showError && <BsCloudSlash className="size-4" />}
      {!showError && !showLoader && <BsCloudCheck className="size-4" />}
      {showLoader && <LoaderIcon className="size-4 animate-spin text-muted-foreground" />}
    </div>
  );
};
