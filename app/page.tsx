import { Pathname } from '@/lib/constants';
import { Database } from '@/types/db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const authService = createServerComponentClient<Database>(
    { cookies },
    {
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    }
  ).auth;

  const {
    data: { session },
  } = await authService.getSession();

  if (!session) {
    redirect(Pathname.LOGIN_PAGE);
  }

  return (
    <main
      id="home-main"
      className="min-h-screen w-screen flex justify-center items-center"
    ></main>
  );
}
