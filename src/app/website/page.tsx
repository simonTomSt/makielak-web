import { storeFile } from '@/api/spa/storage';
import { getAllContents } from '@/api/ssr';
import { Button } from '@/components';
import type { NextPage } from 'next';

const Home: NextPage = async () => {
  const { data: homePageContent } = await getAllContents();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Button>Button</Button>
    </div>
  );
};

export default Home;
