"use client";

import Swal from "sweetalert2";

export default function NewsTable({
  news,
  loading,
  onEdit,
  onDeleted,
}: {
  news: any[];
  loading?: boolean;
  onEdit: (n: any) => void;
  onDeleted: () => void;
}) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
  async function deleteNews(n: any) {
    const result = await Swal.fire({
      title: "ยืนยันการปิดการแสดงผล",
      text: "คุณต้องการปิดการแสดงผลรายการนี้ใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ปิดการใช้งาน",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    await fetch(`${API_URL}/api/admin/news/${n.newsId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isEnabled: 1,
      }),
    });

    Swal.fire("สำเร็จ", "ปิดการแสดงผลเรียบร้อยแล้ว", "success");
    onDeleted();
  }

  async function recoveryNews(n: any) {
    const result = await Swal.fire({
      title: "ยืนยันการเปิดการแสดงผล",
      text: "คุณต้องการเปิดการแสดงผลรายการนี้ใช่หรือไม่?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "เปิดการใช้งาน",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#16a34a",
    });

    if (!result.isConfirmed) return;

    await fetch(`${API_URL}/api/admin/news/${n.newsId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isEnabled: 0,
      }),
    });

    Swal.fire("สำเร็จ", "เปิดการแสดงผลเรียบร้อยแล้ว", "success");
    onDeleted();
  }

  // async function toggleEnable(n: any) {
  //   await fetch(`${API_URL}/api/admin/news/${n.newsId}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       isEnabled: !n.isEnabled,
  //     }),
  //   });

  //   onDeleted();
  // }

  if (loading) {
    return <div className="text-sm text-gray-500">กำลังโหลดข้อมูล…</div>;
  }

  if (!news.length) {
    return (
      <div className="text-sm text-gray-400 text-center py-8">ไม่มีข้อมูล</div>
    );
  }

  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b bg-gray-50 text-gray-600">
          <th className="text-left p-2">ชื่อ</th>
          <th className="text-center p-2 w-28">ประเภท</th>
          <th className="text-center p-2 w-24">สถานะ</th>
          <th className="text-center p-2 w-28">จัดการ</th>
        </tr>
      </thead>

      <tbody>
        {news.map((n) => (
          <tr key={n.newsId} className="border-b hover:bg-gray-50">
            <td className="p-2 max-w-[420px] truncate">{n.newsTitle}</td>

            <td className="p-2 text-center">
              <TypeBadge value={n.isEvents} />
            </td>

            <td className="p-2 text-center">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  n.isEnabled == 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {n.isEnabled == 0 ? "เปิดใช้งาน" : "ปิดใช้งาน"}
              </span>
            </td>

            <td className="p-2 text-center space-x-2">
              <button
                onClick={() => onEdit(n)}
                className="text-blue-600 hover:underline"
              >
                แก้ไข
              </button>

              {n.isEnabled == 0 ? (
                <button
                  onClick={() => deleteNews(n)}
                  className="text-red-600 hover:underline"
                >
                  ปิดการใช้งาน
                </button>
              ) : (
                <button
                  onClick={() => recoveryNews(n)}
                  className="text-green-600 hover:underline"
                >
                  เปิดการใช้งาน
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TypeBadge({ value }: { value: number }) {
  const map: Record<number, string> = {
    1: "ข่าวสาร",
    2: "กิจกรรม",
    3: "ตำแหน่งงาน",
  };

  return (
    <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-700">
      {map[value] ?? "-"}
    </span>
  );
}
