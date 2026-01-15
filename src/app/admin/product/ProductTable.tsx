import Swal from "sweetalert2";

export default function ProductTable({
  products,
  onEdit,
  onDeleted,
}: {
  products: any[];
  onEdit: (p: any) => void;
  onDeleted: () => void;
}) {
  async function handleDelete(productId: number, productName?: string) {
    const result = await Swal.fire({
      title: "ยืนยันการลบ",
      text: productName
        ? `ต้องการลบ "${productName}" ใช่หรือไม่`
        : "ต้องการลบสินค้านี้ใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#999",
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      await Swal.fire({
        title: "ลบสำเร็จ",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });

      onDeleted();
    } catch (err) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถลบสินค้าได้",
        icon: "error",
      });
    }
  }

  return (
    <table className="w-full border rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">ชื่อสินค้า</th>
          <th className="p-2">หมวด</th>
          <th className="p-2">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.productId} className="border-t">
            <td className="p-2">{p.productName?.th}</td>
            <td className="p-2 text-center">{p.productCategoryName?.th}</td>
            <td className="p-2 text-center space-x-2">
              <button onClick={() => onEdit(p)} className="text-blue-600">
                แก้ไข
              </button>

              <button
                onClick={() => handleDelete(p.productId, p.productName?.th)}
                className="text-red-600"
              >
                ลบ
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
