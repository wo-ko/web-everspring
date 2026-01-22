import { arrayMove } from "@dnd-kit/sortable";

type IdKey<T> = keyof T;

export function usePatternDnD<T>(
  layouts: T[],
  setLayouts: (layouts: T[]) => void,
  idKey: IdKey<T>, // 👈 ส่ง key เข้ามา
) {
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = layouts.findIndex((l) => (l as any)[idKey] === active.id);
    const newIndex = layouts.findIndex((l) => (l as any)[idKey] === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newLayouts = arrayMove(layouts, oldIndex, newIndex).map(
      (l, index) => ({
        ...l,
        order: index + 1,
      }),
    );

    setLayouts(newLayouts);
  }

  return { handleDragEnd };
}
