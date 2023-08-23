'use client';
import { storeFile } from '@/api/spa/storage';
import { Button } from '@/components';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const handleUpload = async (file: File | null) => {
    const { data, error } = await storeFile(file as File);
    if (data) {
    } else if (error) {
    }
  };

  // We have implemented onChange in input 👇

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Button>Button</Button>
    </div>
  );
};

export default Home;
