import { BsCloudCheck } from 'react-icons/bs';

export const DocumentInput = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base px-1.5 cursor-pointer truncate">无标题文档</span>
      <BsCloudCheck />
    </div>
  );
};
