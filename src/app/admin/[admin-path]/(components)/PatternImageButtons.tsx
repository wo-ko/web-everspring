import { ImageField } from "@app/admin/config/imagePatternConfig";

export default function PatternImageButtons({
  fields,
  data = {},
  onEdit,
  patternLayoutId,
}: {
  fields: ImageField[];
  data?: any;
  onEdit: (field: ImageField, index?: number) => void;
  patternLayoutId: number;
}) {
  return (
    <div className="space-y-2">
      {fields.map((field) => {
        const value = data?.[field.key];
        const isPattern5 = patternLayoutId === 5;

        // ===== MULTIPLE IMAGES =====
        if (field.multiple) {
          const images = Array.isArray(value) ? value : [];
          const limit = field.limit ?? Infinity;
          const canAddMore = !isPattern5 && images.length < limit;

          return (
            <div key={field.key} className="space-y-1">
              {images.map((_, index) => (
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
                  onClick={() => onEdit(field, images.length)}
                  className="text-sm text-green-600 underline"
                >
                  + เพิ่มรูป
                </button>
              )}

              {!canAddMore && field.limit && (
                <div className="text-xs text-gray-400">
                  เพิ่มได้สูงสุด {field.limit} รูป
                </div>
              )}
            </div>
          );
        }

        // ===== SINGLE IMAGE =====
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
