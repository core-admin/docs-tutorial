'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { templates } from '@/constants/tempaltes';
import { cn } from '@/lib/utils';

export const TemplatesGallery = () => {
  const isCreating = false;

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
                      onClick={() => {}}
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
