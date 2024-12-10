'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, XIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import { useSearchParam } from '@/hooks/use-search-param';

export const SearchInput = () => {
  const [search, setSearch] = useSearchParam();
  const [value, setValue] = useState(search || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    setSearch('');
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input
          placeholder="搜索"
          className="md:text-base placeholder:text-neutral-600 px-14 border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,0.3),0_1px_3px_1px_rgba(65,69,73,0.15)] bg-[#f0f4f8] rounded-full focus-visible:ring-0 focus-visible:bg-white h-[48px]"
          ref={inputRef}
          value={value}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full"
        >
          <SearchIcon className="!size-5" />
        </Button>
        {search !== '' && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
            onClick={handleClear}
          >
            <XIcon className="!size-5" />
          </Button>
        )}
      </form>
    </div>
  );
};
