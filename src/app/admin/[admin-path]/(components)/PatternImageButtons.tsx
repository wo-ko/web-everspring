import { ImageField } from "@app/admin/config/imagePatternConfig";

export default function PatternImageButtons({
  fields,
  onEdit,
}: {
  fields: ImageField[];
  onEdit: (field: ImageField) => void;
}) {
  return (
    <div className="flex gap-2">
      {fields.map((field) => (
        <button
          key={field.key}
          onClick={() => onEdit(field)}
          className="px-3 py-1 border rounded text-sm"
        >
          🖼 {field.label}
        </button>
      ))}
    </div>
  );
}
