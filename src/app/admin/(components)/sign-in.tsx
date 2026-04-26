'use client';
import { signIn } from 'next-auth/react';
import { useRef, useState } from 'react';
import { Lock, User, ShieldAlert, ArrowRight } from 'lucide-react';

export function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isIncorrect, setIsIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorClass = 'border-red-500';

    if (!usernameRef.current || !passwordRef.current) return;

    usernameRef.current.classList.remove(errorClass);
    passwordRef.current.classList.remove(errorClass);

    const inputUsername = usernameRef.current.value.trim();
    const inputPassword = passwordRef.current.value;

    if (!inputUsername || !inputPassword) {
      setIsIncorrect(false);

      if (!inputUsername) usernameRef.current.classList.add(errorClass);
      if (!inputPassword) passwordRef.current.classList.add(errorClass);

      return;
    }

    setLoading(true);
    setIsIncorrect(false);

    try {
      const result = await signIn('credentials', {
        username: inputUsername,
        password: inputPassword,
        redirect: false,
      });

      if (result?.error) {
        setIsIncorrect(true);
        passwordRef.current.value = '';
        passwordRef.current.focus();
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const usersRes = await fetch(`${apiUrl}/api/admin/users`, {
        cache: 'no-store',
      });

      const usersData = await usersRes.json();

      const loggedInUser = usersData.find(
        (u: any) => u.username === inputUsername,
      );

      localStorage.setItem(
        'user',
        JSON.stringify({
          username: inputUsername,
          roleId: loggedInUser ? loggedInUser.roleId : 2,
        }),
      );

      window.dispatchEvent(new Event('user-role-updated'));

      window.location.href = '/admin/home';
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการล็อกอิน:', error);
      setIsIncorrect(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-50 px-4'>
      <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50/50 blur-3xl' />
        <div className='absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-3xl' />
      </div>

      <div className='relative z-10 w-full max-w-md'>
        <div className='bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-3xl p-8 md:p-10'>
          <div className='mb-10 text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-200'>
              <Lock className='text-white w-8 h-8' />
            </div>
            <h1 className='text-2xl font-bold text-slate-800 tracking-tight'>
              Internal System
            </h1>
            <p className='text-slate-500 mt-2 text-sm'>
              Please enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <label
                htmlFor='credentials-username'
                className='block text-sm font-semibold text-slate-700 ml-1'
              >
                Username
              </label>
              <div className='relative group'>
                <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors'>
                  <User size={18} />
                </div>
                <input
                  ref={usernameRef}
                  type='text'
                  id='credentials-username'
                  className='w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3
                             text-sm outline-none
                             focus:bg-white focus:ring-4 focus:ring-indigo-500/10
                             focus:border-indigo-500 transition-all duration-200'
                  placeholder='Corporate username'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='credentials-password'
                className='block text-sm font-semibold text-slate-700 ml-1'
              >
                Password
              </label>
              <div className='relative group'>
                <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors'>
                  <Lock size={18} />
                </div>
                <input
                  ref={passwordRef}
                  type='password'
                  id='credentials-password'
                  className='w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3
                             text-sm outline-none
                             focus:bg-white focus:ring-4 focus:ring-indigo-500/10
                             focus:border-indigo-500 transition-all duration-200'
                  placeholder='••••••••'
                />
              </div>
            </div>

            {isIncorrect && (
              <div className='flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl animate-shake'>
                <ShieldAlert size={18} className='shrink-0' />
                <span className='text-xs font-medium'>
                  Invalid username or password
                </span>
              </div>
            )}

            <button
              type='submit'
              disabled={loading}
              className='group w-full relative flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3.5 
                         text-sm font-bold text-white hover:bg-slate-800 
                         active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {loading ? (
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
              ) : (
                <>
                  <span>Sign in to System</span>
                  <ArrowRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
                </>
              )}
            </button>
          </form>

          <div className='mt-8 flex flex-col items-center gap-4'>
            <div className='h-px w-full bg-slate-100' />
            <div className='flex items-center gap-1.5 text-xs text-slate-400'>
              <div className='w-1 h-1 rounded-full bg-slate-300' />
              <span>Authorized personnel only</span>
              <div className='w-1 h-1 rounded-full bg-slate-300' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
