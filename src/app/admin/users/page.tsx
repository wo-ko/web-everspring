'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Shield,
  User as UserIcon,
  KeyRound,
} from 'lucide-react';
import AddUserModal from './components/AddUserModal';
import EditUserModal from './components/EditUserModal';
import { User } from '../types/pattern';
import Swal from 'sweetalert2';

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentUser, setCurrentUser] = useState<{
    username: string;
    roleId: number;
  } | null>(null);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const isAdmin = (roleId: number) => {
    const role = Number(roleId);
    return role === 1 || role === 2 || role === 99;
  };

  const isDev = (roleId: number) => Number(roleId) === 99;

  const getRoleLabel = (roleId: number) => {
    const role = Number(roleId);

    if (role === 99) return 'Dev';
    if (role === 1) return 'Admin';
    if (role === 2) return 'Admin';
    return 'User';
  };

  const getRoleClass = (roleId: number) => {
    const role = Number(roleId);

    if (role === 99) return 'bg-purple-50 text-purple-700';
    if (role === 1) return 'bg-indigo-50 text-indigo-700';
    if (role === 2) return 'bg-blue-50 text-blue-700';
    return 'bg-slate-100 text-slate-700';
  };

  const filteredUsers = useMemo(() => {
    if (!currentUser) return [];

    const myRoleId = Number(currentUser.roleId);
    const searchLower = searchTerm.toLowerCase();

    return users.filter((user) => {
      const targetRoleId = Number(user.roleId);

      if (myRoleId !== 99 && targetRoleId === 99) {
        return false;
      }

      const name = user.name || '';
      const username = user.username || '';

      return (
        name.toLowerCase().includes(searchLower) ||
        username.toLowerCase().includes(searchLower)
      );
    });
  }, [users, currentUser, searchTerm]);

  const canEditUser = (user: User) => {
    const targetRoleId = Number(user.roleId);
    const myRoleId = Number(currentUser?.roleId);

    if (targetRoleId === 99) {
      return myRoleId === 99 || user.username === currentUser?.username;
    }

    return true;
  };

  const canDeleteUser = (user: User) => {
    const targetRoleId = Number(user.roleId);
    const myRoleId = Number(currentUser?.roleId);

    if (myRoleId !== 99 && targetRoleId === 99) return false;
    if (user.username === currentUser?.username) return false;

    return true;
  };

  const canResetPassword = (user: User) => {
    return (
      isDev(Number(currentUser?.roleId)) &&
      user.username !== currentUser?.username
    );
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');

    if (!savedUser) {
      router.replace('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);

      setCurrentUser(parsedUser);

      if (!isAdmin(Number(parsedUser.roleId))) {
        router.replace('/admin/home');
        return;
      }

      setIsAuthorized(true);
    } catch {
      router.replace('/login');
    }
  }, [router]);

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/admin/users`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        setUsers([]);
        return;
      }

      const data = await res.json();
      const rawUsers = Array.isArray(data) ? data : data.data || [];

      setUsers(rawUsers);
    } catch (error) {
      console.error('❌ Failed to fetch users:', error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchUsers();
    }
  }, [isAuthorized]);

  const handleDelete = async (userId: string | number) => {
    const result = await Swal.fire({
      title: 'ยืนยันการลบผู้ใช้งาน?',
      text: 'การกระทำนี้ไม่สามารถกู้คืนได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ลบเลย',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#dc2626',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${apiUrl}/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        Swal.fire({
          title: 'ลบสำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        fetchUsers();
      }
    } catch {
      Swal.fire({ title: 'ผิดพลาด', icon: 'error' });
    }
  };

  const handleResetPassword = async (user: User) => {
    const result = await Swal.fire({
      title: 'Reset Password',
      html: `<input id="swal-input1" class="swal2-input" type="password" placeholder="รหัสผ่านใหม่">`,
      showCancelButton: true,
      preConfirm: () => {
        const pass = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;

        if (!pass || pass.length < 6) {
          Swal.showValidationMessage('รหัสผ่านต้องมี 6 ตัวขึ้นไป');
          return false;
        }

        return pass;
      },
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `${apiUrl}/api/admin/users/${user.userId}/reset-password`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newPassword: result.value }),
        },
      );

      if (res.ok) {
        Swal.fire({ title: 'สำเร็จ', icon: 'success', timer: 1500 });
      }
    } catch {
      Swal.fire({ title: 'ผิดพลาด', icon: 'error' });
    }
  };

  if (!isAuthorized) return null;

  return (
    <div className='p-4 md:p-6 max-w-6xl mx-auto'>
      <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6 md:mb-8'>
        <div>
          <h1 className='text-xl md:text-2xl font-bold text-slate-800'>
            จัดการผู้ใช้งาน
          </h1>
          <p className='text-slate-500 text-xs md:text-sm mt-1'>
            สิทธิ์ของคุณ: {getRoleLabel(Number(currentUser?.roleId))}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className='flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95'
        >
          <Plus size={18} /> เพิ่มผู้ใช้ใหม่
        </button>
      </div>

      <div className='bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden'>
        <div className='p-4 border-b border-slate-100'>
          <div className='relative w-full md:max-w-md'>
            <Search
              className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
              size={18}
            />
            <input
              type='text'
              placeholder='ค้นหาชื่อ หรือ Username...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100'
            />
          </div>
        </div>

        <div className='md:hidden divide-y divide-slate-100'>
          {isLoading ? (
            <div className='text-center py-8 text-slate-400'>กำลังโหลด...</div>
          ) : filteredUsers.length === 0 ? (
            <div className='text-center py-8 text-slate-400'>ไม่พบข้อมูล</div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.userId} className='p-4 space-y-3'>
                <div className='flex justify-between items-start'>
                  <div>
                    <div className='font-semibold text-slate-800'>
                      {user.name}
                    </div>
                    <div className='text-sm text-slate-500'>
                      {user.username}
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${getRoleClass(
                      Number(user.roleId),
                    )}`}
                  >
                    {getRoleLabel(Number(user.roleId))}
                  </span>
                </div>

                <div className='flex justify-end gap-2'>
                  {canEditUser(user) && (
                    <button
                      onClick={() => setEditingUser(user)}
                      className='px-3 py-1.5 text-xs bg-indigo-50 text-indigo-600 rounded-lg'
                    >
                      แก้ไข
                    </button>
                  )}

                  {canDeleteUser(user) && (
                    <button
                      onClick={() => handleDelete(user.userId)}
                      className='px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg'
                    >
                      ลบ
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className='hidden md:block overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-slate-50 text-slate-500 font-medium'>
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
                  <td colSpan={4} className='text-center py-8'>
                    กำลังโหลด...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center py-8'>
                    ไม่พบข้อมูล
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.userId}
                    className='hover:bg-slate-50 transition-colors'
                  >
                    <td className='px-6 py-4 font-medium text-slate-800'>
                      {user.name}
                    </td>

                    <td className='px-6 py-4 text-slate-500'>
                      {user.username}{' '}
                      {user.username === currentUser?.username && (
                        <span className='ml-1 text-[10px] bg-indigo-100 text-indigo-700 px-1 rounded'>
                          ฉัน
                        </span>
                      )}
                    </td>

                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${getRoleClass(
                          Number(user.roleId),
                        )}`}
                      >
                        {isAdmin(Number(user.roleId)) ? (
                          <Shield size={12} />
                        ) : (
                          <UserIcon size={12} />
                        )}
                        {getRoleLabel(Number(user.roleId))}
                      </span>
                    </td>

                    <td className='px-6 py-4 text-right'>
                      <div className='flex justify-end gap-2'>
                        {canResetPassword(user) && (
                          <button
                            onClick={() => handleResetPassword(user)}
                            className='p-2 text-purple-600 hover:bg-purple-50 rounded-lg'
                          >
                            <KeyRound size={16} />
                          </button>
                        )}

                        {canEditUser(user) && (
                          <button
                            onClick={() => setEditingUser(user)}
                            className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg'
                          >
                            <Edit size={16} />
                          </button>
                        )}

                        {canDeleteUser(user) && (
                          <button
                            onClick={() => handleDelete(user.userId)}
                            className='p-2 text-red-600 hover:bg-red-50 rounded-lg'
                          >
                            <Trash2 size={16} />
                          </button>
                        )}

                        {!canEditUser(user) && !canDeleteUser(user) && (
                          <span className='text-xs text-slate-400 px-2 py-1'>
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
