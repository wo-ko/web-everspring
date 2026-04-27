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

  const [currentUser, setCurrentUser] = useState<{
    username: string;
    roleId: number;
  } | null>(null);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const isAdmin = (roleId: number) => roleId === 1 || roleId === 99;
  const isDev = (roleId: number) => roleId === 99;

  const getRoleLabel = (roleId: number) => {
    if (roleId === 99) return 'Dev';
    if (roleId === 1) return 'Admin';
    return 'User';
  };

  const getRoleClass = (roleId: number) => {
    if (roleId === 99) return 'bg-purple-50 text-purple-700';
    if (roleId === 1) return 'bg-indigo-50 text-indigo-700';
    return 'bg-slate-100 text-slate-700';
  };

  const canEditUser = (user: User) => {
    return user.roleId !== 99 || user.username === currentUser?.username;
  };

  const canDeleteUser = (user: User) => {
    return user.roleId !== 99 && user.username !== currentUser?.username;
  };

  const canResetPassword = (user: User) => {
    return (
      isDev(Number(currentUser?.roleId)) &&
      user.username !== currentUser?.username
    );
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);

      if (!isAdmin(Number(parsedUser.roleId))) {
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
      reverseButtons: true,
      focusCancel: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl px-4 py-2',
        cancelButton: 'rounded-xl px-4 py-2',
      },
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${apiUrl}/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await Swal.fire({
          title: 'ลบสำเร็จ',
          text: 'ผู้ใช้งานถูกลบออกจากระบบแล้ว',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        fetchUsers();
      } else {
        await Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถลบผู้ใช้งานได้',
          icon: 'error',
          confirmButtonColor: '#4f46e5',
        });
      }
    } catch (error) {
      await Swal.fire({
        title: 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้',
        text: 'กรุณาลองใหม่อีกครั้ง',
        icon: 'error',
        confirmButtonColor: '#4f46e5',
      });
    }
  };

  const handleResetPassword = async (user: User) => {
    const result = await Swal.fire({
      title: 'Reset Password',
      text: `ต้องการ reset password ของ ${user.username} ใช่ไหม`,
      icon: 'warning',
      html: `
      <div style="text-align:left; margin-top:12px;">
        <label style="font-size:13px; font-weight:600; color:#334155;">
          Password ใหม่
        </label>

        <div style="position:relative; margin-top:8px;">
          <input
            id="reset-password-input"
            type="password"
            placeholder="Enter new password"
            autocomplete="new-password"
            style="
              width:100%;
              padding:12px 58px 12px 12px;
              border:1px solid #cbd5e1;
              border-radius:10px;
              font-size:14px;
              outline:none;
            "
          />

          <button
            id="toggle-reset-password"
            type="button"
            style="
              position:absolute;
              right:10px;
              top:50%;
              transform:translateY(-50%);
              font-size:12px;
              font-weight:600;
              color:#7c3aed;
              background:transparent;
              border:none;
              cursor:pointer;
            "
          >
            Show
          </button>
        </div>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Reset Password',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#7c3aed',
      cancelButtonColor: '#64748b',

      didOpen: () => {
        const input = document.getElementById(
          'reset-password-input',
        ) as HTMLInputElement | null;

        const toggleBtn = document.getElementById(
          'toggle-reset-password',
        ) as HTMLButtonElement | null;

        if (!input || !toggleBtn) return;

        toggleBtn.onclick = () => {
          if (input.type === 'password') {
            input.type = 'text';
            toggleBtn.innerText = 'Hide';
          } else {
            input.type = 'password';
            toggleBtn.innerText = 'Show';
          }
        };
      },

      preConfirm: () => {
        const input = document.getElementById(
          'reset-password-input',
        ) as HTMLInputElement | null;

        const password = input?.value?.trim();

        if (!password || password.length < 6) {
          Swal.showValidationMessage('Password ต้องมีอย่างน้อย 6 ตัวอักษร');
          return false;
        }

        return password;
      },
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `${apiUrl}/api/admin/users/${user.userId}/reset-password`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newPassword: result.value,
          }),
        },
      );

      if (!res.ok) throw new Error('Reset failed');

      await Swal.fire({
        title: 'Reset Password สำเร็จ',
        text: `เปลี่ยน password ของ ${user.username} แล้ว`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      await Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถ reset password ได้',
        icon: 'error',
        confirmButtonColor: '#4f46e5',
      });
    }
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className='p-4 md:p-6 max-w-6xl mx-auto'>
      <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6 md:mb-8'>
        <div>
          <h1 className='text-xl md:text-2xl font-bold text-slate-800'>
            จัดการผู้ใช้งาน
          </h1>
          <p className='text-slate-500 text-xs md:text-sm mt-1'>
            เพิ่ม ลบ และจัดการสิทธิ์ผู้ใช้งานในระบบ
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className='w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-indigo-200'
        >
          <Plus size={18} />
          เพิ่มผู้ใช้ใหม่
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
              className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 transition-shadow outline-none'
            />
          </div>
        </div>

        <div className='md:hidden divide-y divide-slate-100'>
          {isLoading ? (
            <div className='text-center py-8 text-slate-400 text-sm'>
              กำลังโหลดข้อมูล...
            </div>
          ) : users.length === 0 ? (
            <div className='text-center py-8 text-slate-400 text-sm'>
              ไม่พบข้อมูลผู้ใช้งาน
            </div>
          ) : (
            users.map((user) => (
              <div key={user.userId} className='p-4 space-y-3'>
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <div className='font-semibold text-slate-800 truncate'>
                      {user.name}
                    </div>
                    <div className='text-sm text-slate-500 truncate mt-0.5'>
                      {user.username}
                      {user.username === currentUser?.username && (
                        <span className='ml-2 text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold'>
                          ฉัน
                        </span>
                      )}
                    </div>
                  </div>

                  <span
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${getRoleClass(
                      Number(user.roleId),
                    )}`}
                  >
                    {Number(user.roleId) === 1 || Number(user.roleId) === 99 ? (
                      <Shield size={12} />
                    ) : (
                      <UserIcon size={12} />
                    )}
                    {getRoleLabel(Number(user.roleId))}
                  </span>
                </div>

                <div className='flex justify-end gap-2 pt-1'>
                  {canResetPassword(user) && (
                    <button
                      onClick={() => handleResetPassword(user)}
                      className='px-3 py-2 text-xs font-semibold text-purple-600 bg-purple-50 rounded-lg'
                    >
                      Reset
                    </button>
                  )}

                  {canEditUser(user) && (
                    <button
                      onClick={() => setEditingUser(user)}
                      className='px-3 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg'
                    >
                      แก้ไข
                    </button>
                  )}

                  {canDeleteUser(user) && (
                    <button
                      onClick={() => handleDelete(user.userId)}
                      className='px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 rounded-lg'
                    >
                      ลบ
                    </button>
                  )}

                  {!canEditUser(user) && !canDeleteUser(user) && (
                    <span className='text-xs text-slate-400 bg-slate-50 px-3 py-2 rounded-lg font-medium'>
                      สงวนสิทธิ์
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className='hidden md:block overflow-x-auto'>
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
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${getRoleClass(
                          Number(user.roleId),
                        )}`}
                      >
                        {Number(user.roleId) === 1 ||
                        Number(user.roleId) === 99 ? (
                          <Shield size={12} />
                        ) : (
                          <UserIcon size={12} />
                        )}
                        {getRoleLabel(Number(user.roleId))}
                      </span>
                    </td>

                    <td className='px-6 py-4 text-right'>
                      <div className='flex justify-end gap-2 items-center'>
                        {canResetPassword(user) && (
                          <button
                            onClick={() => handleResetPassword(user)}
                            className='p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors'
                            title='Reset Password'
                          >
                            <KeyRound size={16} />
                          </button>
                        )}

                        {canEditUser(user) && (
                          <button
                            onClick={() => setEditingUser(user)}
                            className='p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors'
                            title='แก้ไขข้อมูล'
                          >
                            <Edit size={16} />
                          </button>
                        )}

                        {canDeleteUser(user) && (
                          <button
                            onClick={() => handleDelete(user.userId)}
                            className='p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                            title='ลบผู้ใช้งาน'
                          >
                            <Trash2 size={16} />
                          </button>
                        )}

                        {!canResetPassword(user) &&
                          !canEditUser(user) &&
                          !canDeleteUser(user) && (
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
