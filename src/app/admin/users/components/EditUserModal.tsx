'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { User } from '@app/admin/types/pattern';
import Swal from 'sweetalert2';

interface EditUserModalProps {
  user: User | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserModal({
  user,
  onClose,
  onSuccess,
}: EditUserModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    roleId: 2,
  });

  // ใช้ useEffect เพื่อดูดข้อมูล User มาใส่ฟอร์มตอนเปิด Modal
  useEffect(() => {
    if (user) {
      setEditFormData({
        name: user.name,
        roleId: user.roleId,
      });
    }
  }, [user]);

  if (!user) return null;

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/admin/users/${user.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });

      const data = await res.json();

      if (res.ok || data.success) {
        await Swal.fire({
          title: 'อัปเดตข้อมูลสำเร็จ',
          text: 'ข้อมูลผู้ใช้งานได้รับการอัปเดตเรียบร้อยแล้ว',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#4f46e5',
          customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'rounded-xl px-4 py-2',
          },
        });
        onSuccess();
        onClose();
      } else {
        await Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: data.message || 'ไม่สามารถเพิ่มผู้ใช้งานได้',
          icon: 'error',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#4f46e5',
          customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'rounded-xl px-4 py-2',
          },
        });
      }
    } catch (error) {
      await Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้',
        icon: 'error',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#4f46e5',
        customClass: {
          popup: 'rounded-2xl',
          confirmButton: 'rounded-xl px-4 py-2',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200'>
        <div className='flex justify-between items-center p-5 border-b border-slate-100'>
          <h2 className='text-lg font-bold text-slate-800'>
            แก้ไขข้อมูล:{' '}
            <span className='text-indigo-600'>{user.username}</span>
          </h2>
          <button
            onClick={onClose}
            className='text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-lg transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleUpdateUser} className='p-5 space-y-4'>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-1'>
              ชื่อ - นามสกุล
            </label>
            <input
              type='text'
              required
              value={editFormData.name}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
              className='w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-1'>
              สิทธิ์การใช้งาน (Role)
            </label>
            <select
              value={editFormData.roleId}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  roleId: Number(e.target.value),
                })
              }
              className='w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all'
            >
              <option value={1}>Administrator (ผู้ดูแลระบบ)</option>
              <option value={2}>User (ผู้ใช้งานทั่วไป)</option>
            </select>
          </div>

          <div className='pt-4 mt-6 border-t border-slate-100 flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors'
            >
              ยกเลิก
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors disabled:bg-indigo-300'
            >
              {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
