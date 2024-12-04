import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100">
      <Button variant="destructive">Click me</Button>
      <p className="mt-4">
        Click{' '}
        <Link href="/documents/123" className="text-blue-500 underline">
          here
        </Link>{' '}
        to go to document id
      </p>
    </div>
  );
};

export default Home;
