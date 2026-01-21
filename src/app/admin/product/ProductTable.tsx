import Swal from "sweetalert2";

export default function ProductTable({
  products,
  onEdit,
  onDeleted,
  mode,
}: {
  products: any[];
  onEdit: (p: any) => void;
  onDeleted: () => void;
  mode: "active" | "deleted";
}) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

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
      const res = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Delete failed");
      }

      await Swal.fire({
        title: "ลบสำเร็จ",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });

      onDeleted();
    } catch (error: any) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: error.message || "ไม่สามารถลบสินค้าได้",
        icon: "error",
      });
    }
  }

  async function handleRestore(productId: number) {
    const result = await Swal.fire({
      title: "กู้คืนสินค้า?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "กู้คืน",
      cancelButtonText: "ยกเลิก",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/products/${productId}/restore`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Restore failed");

      await Swal.fire({
        title: "กู้คืนสำเร็จ",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });

      onDeleted();
    } catch (e: any) {
      Swal.fire("ผิดพลาด", e.message, "error");
    }
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-[600px] w-full border-collapse">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-3 text-left">ชื่อสินค้า</th>
            <th className="p-3 text-center">หมวด</th>
            <th className="p-3 text-center">จัดการ</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {products.map((p) => (
            <tr key={p.productId} className="border-t hover:bg-gray-50">
              <td className="p-3">{p.productName?.th ?? "-"}</td>

              <td className="p-3 text-center">
                {p.productCategoryName?.th ?? "-"}
              </td>

              <td className="p-3 text-center">
                <div className="inline-flex gap-3">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-blue-600 hover:underline"
                  >
                    แก้ไข
                  </button>

                  {mode === "deleted" ? (
                    <button
                      onClick={() => handleRestore(p.productId)}
                      className="text-green-600 hover:underline"
                    >
                      กู้คืน
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleDelete(p.productId, p.productName?.th)
                      }
                      className="text-red-600 hover:underline"
                    >
                      ลบ
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td colSpan={3} className="p-6 text-center text-gray-400">
                ไม่มีข้อมูลสินค้า
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
