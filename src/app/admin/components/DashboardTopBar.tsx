'use client';
import { signOut } from '@/api/spa';
import { Button } from '@/components';
import { t } from '@/translations';
import { Routes, useMutation } from '@/utils';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { LogOut } from 'react-feather';

const DashboardTopBar = ({ user }: { user: User }) => {
  const router = useRouter();

  const { mutate } = useMutation({
    onSuccess: () => router.push(Routes.Login),
  });

  const handleLogout = () => {
    mutate(() => signOut());
  };

  return (
    <div className='bg-brand-purple-dark py-4 px-6 flex items-center justify-between fixed w-full z-50'>
      <div className='text-white font-semibold text-lg'>
        {t.dashboard.welcome.replace('{userEmail}', `${user.email}`)}
      </div>
      <Button className='flex' color='blue' onClick={handleLogout}>
        <p className='mr-2'>{t.dashboard.log_out}</p>
        <LogOut size='14px' />
      </Button>
    </div>
  );
};

export default DashboardTopBar;
