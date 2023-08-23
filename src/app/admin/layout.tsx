import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import DashboardSidebar from './components/DashboardSidebar';
import DashboardTopBar from './components/DashboardTopBar';
import { redirect } from 'next/navigation';
import { Routes } from '@/utils';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

type RootLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = async ({ children }: RootLayoutProps) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(Routes.Login);
  }

  return (
    <div className='bg-blue-gray-50	w-full min-h-screen h-full'>
      <DashboardSidebar />
      <main className='pl-[20rem] pt-8 pr-8 max-w-screen-2xl mx-auto py-5'>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
