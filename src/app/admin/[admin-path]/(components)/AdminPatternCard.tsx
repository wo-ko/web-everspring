import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  getPatternConfig,
  ImageField,
} from "@app/admin/config/imagePatternConfig";
import PatternImageButtons from "./PatternImageButtons";

export default function AdminPatternCard({
  layout,
  Component,
  lang,
  onEditText,
  onEditImage,
}: {
  layout: any;
  Component: React.ComponentType<any>;
  lang: string;
  onEditText: (layout: any) => void;
  // onEditImage: (layout: any, field: string, index?: number) => void;
  onEditImage: (layout: any, field: ImageField, index?: number) => void;
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: layout.pageTranslationId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const config = getPatternConfig(layout.patternLayoutId);
  const props = layout.translation?.[lang] ?? layout.translation?.["th"] ?? {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border rounded-lg p-4 space-y-3 bg-white transition
        ${isDragging ? "ring-2 ring-blue-400 shadow-lg" : ""}
      `}
    >
      {/* 🔥 Drag handle */}
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing select-none text-lg"
          title="ลากเพื่อจัดเรียง"
        >
          ⠿
        </span>
        <span className="text-xs">ลากเพื่อจัดเรียง</span>
      </div>

      {/* 🔥 Content (ไม่ trigger drag) */}
      <Component {...props} />

      {/* 🔥 Edit text button */}
      {config.hasText && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEditText(layout);
          }}
          className="text-sm text-blue-600 underline pointer-events-auto"
        >
          แก้ไขข้อความ
        </button>
      )}

      {config.imageFields.length > 0 && (
        <div onClick={(e) => e.stopPropagation()}>
          {/* <PatternImageButtons
            fields={config.imageFields}
            obj={props.obj}
            onEdit={(field, index) => onEditImage(layout, field.key, index)}
          /> */}
          <PatternImageButtons
            fields={config.imageFields}
            patternLayoutId={layout.patternLayoutId}
            obj={props.obj}
            onEdit={(field, index) => onEditImage(layout, field, index)}
          />
        </div>
      )}
    </div>
  );
}
