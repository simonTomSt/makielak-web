import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../schema';

export const createSPAClient = () => createClientComponentClient<Database>();
