'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddUserModal({
  isOpen,
  onClose,
  onSuccess,
}: AddUserModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    roleId: 2,
  });
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append('username', formData.username);
      form.append('password', formData.password);
      form.append('name', formData.name);
      form.append('roleId', formData.roleId.toString());

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/admin/users/add`, {
        method: 'POST',
        body: form,
      });

      const data = await res.json();

      if (res.ok || data.success) {
        alert('เพิ่มผู้ใช้งานสำเร็จ!');
        setFormData({ username: '', password: '', name: '', roleId: 2 }); // ล้างฟอร์ม
        onSuccess();
        onClose();
      } else {
        alert(data.message || 'เกิดข้อผิดพลาด');
      }
    } catch (error) {
      alert('ไม่สามารถติดต่อเซิร์ฟเวอร์ได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200'>
        <div className='flex justify-between items-center p-5 border-b border-slate-100'>
          <h2 className='text-lg font-bold text-slate-800'>เพิ่มผู้ใช้ใหม่</h2>
          <button
            onClick={onClose}
            className='text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-lg transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-5 space-y-4'>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-1'>
              ชื่อ - นามสกุล
            </label>
            <input
              type='text'
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className='w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all'
              placeholder='เช่น สมชาย ใจดี'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-1'>
              Username
            </label>
            <input
              type='text'
              required
              minLength={4}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className='w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all'
              placeholder='เช่น somchai_admin'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-1'>
              รหัสผ่านชั่วคราว
            </label>
            <input
              type='password'
              required
              minLength={6}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className='w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all'
              placeholder='อย่างน้อย 6 ตัวอักษร'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-1'>
              สิทธิ์การใช้งาน (Role)
            </label>
            <select
              value={formData.roleId}
              onChange={(e) =>
                setFormData({ ...formData, roleId: Number(e.target.value) })
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
              className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors disabled:bg-indigo-300 flex items-center'
            >
              {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
