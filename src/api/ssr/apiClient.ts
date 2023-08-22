import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../schema';
import { cookies } from 'next/headers';

export const createSSRClient = () =>
  createServerComponentClient<Database>({ cookies });
