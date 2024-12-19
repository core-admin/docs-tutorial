'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { templates } from '@/constants/tempaltes';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const TemplatesGallery = () => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const [isCreating, setIsCreating] = useState(false);

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreating(true);
    create({
      title,
      initialContent,
    })
      .then(docId => {
        toast.success('文档已创建');
        router.push(`/documents/${docId}`);
      })
      .catch(error => {
        console.error(error);
        toast.error(error.data || error.message || '创建文档失败');
        setIsCreating(false);
      });
  };

  return (
    <div className="bg-[#f1f3f4]">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="font-medium">Templates</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map(template => {
              return (
                <CarouselItem
                  key={template.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.28571%] pl-4"
                >
                  <div
                    className={cn(
                      'aspect-[3/4] flex flex-col gap-y-2.5',
                      isCreating && 'pointer-events-none opacity-50',
                    )}
                  >
                    <button
                      style={{
                        backgroundImage: `url(${template.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                      className="size-full rounded-sm border hover:border-blue-500 hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                      disabled={isCreating}
                      // TODO: 初始化内容未完善
                      onClick={() => onTemplateClick(template.label, '')}
                    />
                    <p className="text-sm font-medium truncate">{template.label}</p>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default memo(TemplatesGallery);
