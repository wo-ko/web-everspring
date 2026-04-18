'use client';
import { useState, useEffect } from 'react';
import { Key, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ChangePasswordPage() {
  const [username, setUsername] = useState('');
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUsername(parsedUser.username);
      } catch (error) {
        console.error('Invalid user data in localStorage');
      }
    } else {
      setUsername('');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    if (!username) {
      setMessage({
        text: 'ไม่พบเซสชันการเข้าสู่ระบบ กรุณาล็อกอินใหม่อีกครั้ง',
        type: 'error',
      });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({
        text: 'รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน',
        type: 'error',
      });
      return;
    }

    if (passwords.newPassword.length < 6) {
      setMessage({
        text: 'รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append('username', username);
      form.append('oldPassword', passwords.oldPassword);
      form.append('newPassword', passwords.newPassword);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/admin/users/change-password`, {
        method: 'PUT',
        body: form,
      });

      const data = await res.json();

      if (res.ok || data.success) {
        setMessage({
          text: 'เปลี่ยนรหัสผ่านสำเร็จเรียบร้อยแล้ว!',
          type: 'success',
        });
        setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage({
          text: data.message || 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน',
          type: 'error',
        });
      }
    } catch (error) {
      setMessage({ text: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-slate-800'>เปลี่ยนรหัสผ่าน</h1>
        <p className='text-slate-500 text-sm mt-1'>
          อัปเดตรหัสผ่านของคุณเพื่อความปลอดภัยของบัญชี
        </p>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-w-2xl'>
        <div className='p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50'>
          <div className='p-2 bg-indigo-100 text-indigo-600 rounded-lg'>
            <Lock size={20} />
          </div>
          <div>
            <h3 className='font-bold text-slate-800'>ตั้งค่ารหัสผ่านใหม่</h3>
            <p className='text-xs text-slate-500'>
              บัญชีผู้ใช้:{' '}
              {username ? (
                <span className='font-semibold text-indigo-600'>
                  {username}
                </span>
              ) : (
                <span className='font-semibold text-red-500'>
                  ยังไม่ได้เข้าสู่ระบบ
                </span>
              )}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {message.text && (
            <div
              className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-100'
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              {message.text}
            </div>
          )}

          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              รหัสผ่านปัจจุบัน
            </label>
            <div className='relative'>
              <Key
                className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
                size={18}
              />
              <input
                type='password'
                required
                disabled={!username} // ปิดช่องกรอกถ้ายังไม่ Login
                value={passwords.oldPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, oldPassword: e.target.value })
                }
                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                placeholder='กรอกรหัสผ่านเดิมของคุณ'
              />
            </div>
          </div>

          <hr className='border-slate-100' />

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                รหัสผ่านใหม่
              </label>
              <input
                type='password'
                required
                minLength={6}
                disabled={!username}
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                placeholder='อย่างน้อย 6 ตัวอักษร'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                ยืนยันรหัสผ่านใหม่
              </label>
              <input
                type='password'
                required
                minLength={6}
                disabled={!username}
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
                className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                placeholder='กรอกให้ตรงกับรหัสผ่านใหม่'
              />
            </div>
          </div>

          <div className='pt-4 border-t border-slate-100 flex justify-end'>
            <button
              type='submit'
              disabled={isSubmitting || !username}
              className='px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-indigo-200 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center gap-2'
            >
              {isSubmitting ? 'กำลังตรวจสอบ...' : 'บันทึกรหัสผ่านใหม่'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
