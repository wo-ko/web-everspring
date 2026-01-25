// import { ImageField } from "@app/admin/config/imagePatternConfig";

// export default function PatternImageButtons({
//   fields,
//   obj = [],
//   onEdit,
// }: {
//   fields: ImageField[];
//   obj?: any[];
//   onEdit: (field: ImageField, index?: number) => void;
// }) {
//   return (
//     <div className="space-y-2">
//       {fields.map((field) => {
//         if (field.multiple && field.isObject) {
//           return (
//             <div key={field.key} className="space-y-1">
//               {obj?.map((_, index) => (
//                 <button
//                   key={index}
//                   type="button"
//                   onClick={() => onEdit(field, index)}
//                   className="text-sm underline text-blue-600 mr-2"
//                 >
//                   แก้รูป {index + 1}
//                 </button>
//               ))}

//               <button
//                 type="button"
//                 onClick={() => onEdit(field, obj.length)}
//                 className="text-sm text-green-600 underline"
//               >
//                 + เพิ่มรูป
//               </button>
//             </div>
//           );
//         }

//         if (field.isObject) {
//           return (
//             <button
//               key={field.key}
//               type="button"
//               onClick={() => onEdit(field, 0)}
//               className="text-sm underline text-blue-600"
//             >
//               {field.label}
//             </button>
//           );
//         }

//         return (
//           <button
//             key={field.key}
//             type="button"
//             onClick={() => onEdit(field)}
//             className="text-sm underline text-blue-600"
//           >
//             {field.label}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

import { ImageField } from "@app/admin/config/imagePatternConfig";

export default function PatternImageButtons({
  fields,
  obj = [],
  onEdit,
  patternLayoutId,
}: {
  fields: ImageField[];
  obj?: any[];
  onEdit: (field: ImageField, index?: number) => void;
  patternLayoutId: number;
}) {
  return (
    <div className="space-y-2">
      {fields.map((field) => {
        const isPattern5 = patternLayoutId === 5;
        if (field.multiple && field.isObject) {
          const limit = field.limit ?? Infinity;
          const canAddMore = !isPattern5 && (!limit || obj.length < limit);

          return (
            <div key={field.key} className="space-y-1">
              {obj.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onEdit(field, index)}
                  className="text-sm underline text-blue-600 mr-2"
                >
                  แก้รูป {index + 1}
                </button>
              ))}

              {canAddMore && (
                <button
                  type="button"
                  onClick={() => onEdit(field, obj.length)}
                  className="text-sm text-green-600 underline"
                >
                  + เพิ่มรูป
                </button>
              )}

              {/* (optional) แจ้ง limit */}
              {!canAddMore && field.limit && (
                <div className="text-xs text-gray-400">
                  เพิ่มได้สูงสุด {field.limit} รูป
                </div>
              )}
            </div>
          );
        }

        // object เดี่ยว (pattern 7 / 8)
        if (field.isObject) {
          return (
            <button
              key={field.key}
              type="button"
              onClick={() => onEdit(field, 0)}
              className="text-sm underline text-blue-600"
            >
              {field.label}
            </button>
          );
        }

        // single image ปกติ
        return (
          <button
            key={field.key}
            type="button"
            onClick={() => onEdit(field)}
            className="text-sm underline text-blue-600"
          >
            {field.label}
          </button>
        );
      })}
    </div>
  );
}
