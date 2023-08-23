'use client';
import { signInWithPassword } from '@/api/spa';
import { Button, Card, Form, Input, Spinner, Typography } from '@/components';
import { t } from '@/translations';
import { Routes, useMutation } from '@/utils';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type FromValues = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const router = useRouter();
  const { mutate, loading } = useMutation({
    onSuccess: () => router.push(Routes.Dashboard),
    onError: () => toast.error(t.auth.login.validation_error),
  });

  const handleSingIn = ({ email, password }: FromValues) => {
    mutate(() => signInWithPassword(email, password));
  };

  return (
    <Card className='flex items-center justify-center min-h-screen'>
      <div className='bg-white shadow-lg rounded-lg w-96 p-6'>
        <h2 className='text-2xl font-bold mb-4'>{t.auth.login.title}</h2>
        <Form<FromValues> onSubmit={handleSingIn}>
          <div className='mb-4'>
            <Typography className='mb-1.5'>
              {t.auth.login.email_placeholder}
            </Typography>
            <Input
              type='email'
              id='email'
              name='email'
              size='lg'
              label={t.auth.login.email}
            />
          </div>
          <div className='mb-6'>
            <Typography className='mb-1.5'>
              {t.auth.login.password_placeholder}
            </Typography>
            <Input
              type='password'
              id='password'
              name='password'
              size='lg'
              label={t.auth.login.password}
            />
          </div>
          <div className='flex items-center justify-between'>
            <Button
              type='submit'
              className='bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
            >
              {loading ? <Spinner /> : t.auth.login.log_in}
            </Button>
          </div>
        </Form>
      </div>
    </Card>
  );
};

export default Login;
