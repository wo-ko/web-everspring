export default function DisabledNavItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className='flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-400 bg-slate-50 cursor-not-allowed opacity-70 select-none'
      title='ไม่มีสิทธิ์ใช้งาน'
    >
      <span className='text-slate-300'>{icon}</span>
      <span>{label}</span>
      <span className='ml-auto text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-md'>
        Admin
      </span>
    </div>
  );
}
