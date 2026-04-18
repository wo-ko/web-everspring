'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Shield,
  User as UserIcon,
} from 'lucide-react';
import AddUserModal from './components/AddUserModal';
import EditUserModal from './components/EditUserModal';
import { User } from '../types/pattern';

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [currentUser, setCurrentUser] = useState<{
    username: string;
    roleId: number;
  } | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);

      if (parsedUser.roleId !== 1) {
        router.replace('/admin/home');
      } else {
        setIsAuthorized(true);
      }
    } else {
      router.replace('/login');
    }
  }, [router]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/admin/users`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setUsers(data);
        else if (data && data.data && Array.isArray(data.data))
          setUsers(data.data);
        else setUsers([]);
      }
    } catch (error) {
      console.error('❌ Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string | number) => {
    if (
      !window.confirm(
        'คุณแน่ใจหรือไม่ที่จะลบผู้ใช้งานรายนี้? การกระทำนี้ไม่สามารถกู้คืนได้',
      )
    )
      return;

    try {
      const res = await fetch(`${apiUrl}/api/admin/users/${userId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('ลบผู้ใช้งานสำเร็จ');
        fetchUsers();
      } else {
        alert('เกิดข้อผิดพลาดในการลบ');
      }
    } catch (error) {
      alert('ไม่สามารถติดต่อเซิร์ฟเวอร์ได้');
    }
  };
  if (!isAuthorized) {
    return null;
  }
  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800'>จัดการผู้ใช้งาน</h1>
          <p className='text-slate-500 text-sm mt-1'>
            เพิ่ม ลบ และจัดการสิทธิ์ผู้ใช้งานในระบบ
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-indigo-200'
        >
          <Plus size={18} />
          เพิ่มผู้ใช้ใหม่
        </button>
      </div>

      <div className='bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden'>
        <div className='p-4 border-b border-slate-100 flex gap-4'>
          <div className='relative flex-1 max-w-md'>
            <Search
              className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
              size={18}
            />
            <input
              type='text'
              placeholder='ค้นหาชื่อ หรือ Username...'
              className='w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 transition-shadow outline-none'
            />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-slate-50/50 text-slate-500 font-medium'>
              <tr>
                <th className='px-6 py-4'>ชื่อ - นามสกุล</th>
                <th className='px-6 py-4'>Username</th>
                <th className='px-6 py-4'>สิทธิ์การใช้งาน</th>
                <th className='px-6 py-4 text-right'>จัดการ</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className='text-center py-8 text-slate-400'>
                    กำลังโหลดข้อมูล...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center py-8 text-slate-400'>
                    ไม่พบข้อมูลผู้ใช้งาน
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.userId}
                    className='hover:bg-slate-50/50 transition-colors'
                  >
                    <td className='px-6 py-4 font-medium text-slate-800'>
                      {user.name}
                    </td>
                    <td className='px-6 py-4 text-slate-500'>
                      {user.username}
                      {user.username === currentUser?.username && (
                        <span className='ml-2 text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold'>
                          ฉัน
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${user.roleId === 1 ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}
                      >
                        {user.roleId === 1 ? (
                          <Shield size={12} />
                        ) : (
                          <UserIcon size={12} />
                        )}
                        {user.roleId === 1 ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <div className='flex justify-end gap-2 items-center'>
                        {(user.roleId !== 1 ||
                          user.username === currentUser?.username) && (
                          <button
                            onClick={() => setEditingUser(user)}
                            className='p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors'
                            title='แก้ไขข้อมูล'
                          >
                            <Edit size={16} />
                          </button>
                        )}
                        {user.roleId !== 1 && (
                          <button
                            onClick={() => handleDelete(user.userId)}
                            className='p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                            title='ลบผู้ใช้งาน'
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                        {user.roleId === 1 &&
                          user.username !== currentUser?.username && (
                            <span className='text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-md font-medium'>
                              สงวนสิทธิ์
                            </span>
                          )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchUsers}
      />

      <EditUserModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSuccess={fetchUsers}
      />
    </div>
  );
}
