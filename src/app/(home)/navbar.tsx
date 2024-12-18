import Link from 'next/link';
import Image from 'next/image';
import { SearchInput } from './search-input';
import { UserButton, OrganizationSwitcher } from '@clerk/nextjs';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full p-4 gap-6">
      <div className="flex flex-col items-center shrink-0 sm:flex-row sm:gap-3">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>
        <h3 className="text-sm sm:text-xl">Docs</h3>
      </div>
      <SearchInput />
      <div className="flex gap-3 items-center">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};
