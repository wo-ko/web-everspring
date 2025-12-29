"use client";

import { useThemeContext } from "@app/context/theme-context";
import dynamic from "next/dynamic";
import { ComponentType, useCallback, useEffect, useState } from "react";
import ImageManager, { ServerImage } from "./ImageManager";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ================= CONSTANT ================= */

const IMAGE_PATTERN_IDS = [3, 5, 7, 8, 10];
const IMAGE_2PIC_PATTERN_ID = 11;
const IMAGE_3PIC_PATTERN_ID = 13;

/* ================= SORTABLE ITEM ================= */

function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, transform, transition, listeners, attributes } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      {children}
    </div>
  );
}

/* ================= MAIN ================= */

export default function AdminPatternRenderer({
  pageName,
}: {
  pageName: string;
}) {
  const { lang } = useThemeContext();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [layouts, setLayouts] = useState<any[]>([]);
  const [components, setComponents] = useState<
    Record<number, ComponentType<any>>
  >({});
  const [productCategories, setProductCategories] = useState<any[]>([]);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  /* ===== Text ===== */
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState("");

  /* ===== Image (singleton target + title) ===== */
  const [editingImageTarget, setEditingImageTarget] = useState<{
    pageTranslationId: string;
    slot?: "image1" | "image2" | "image3";
    title: string;
  } | null>(null);

  /* ================= API ================= */

  async function saveText(
    pageTranslationId: string,
    content: Record<string, any>
  ) {
    await fetch(`${API_URL}/pattern-text`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageTranslationId, lang, content }),
    });
  }

  async function saveLayoutOrder(nextLayouts: any[]) {
    await fetch(`${API_URL}/page-layout/order`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageName,
        layoutOrder: nextLayouts.map((l) => l.pageTranslationId),
      }),
    });
  }

  async function savePatternImage(
    pageTranslationId: string,
    imageId: number,
    slot?: string
  ) {
    await fetch(`${API_URL}/pattern-image`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageTranslationId, imageId, slot }),
    });
  }

  /* ================= FETCH ================= */

  const fetchAll = async () => {
    const pageLayoutRes = await fetch(
      `${API_URL}/pages/page-display/${pageName}`
    ).then((r) => r.json());

    const patternRes = await fetch(`${API_URL}/pattern-layouts`).then((r) =>
      r.json()
    );

    const categoryRes = await fetch(`${API_URL}/product-category`).then((r) =>
      r.json()
    );

    const compMap = patternRes.reduce(
      (acc: Record<number, ComponentType<any>>, p: any) => {
        const cleanPath = p.patternLayoutPath.replace(/^\//, "");
        acc[p.patternLayoutId] = dynamic(
          () => import(`../../../components/layout-pattern/${cleanPath}`),
          { ssr: false }
        );
        return acc;
      },
      {}
    );

    setLayouts(pageLayoutRes.pageLayouts ?? []);
    setComponents(compMap);
    setProductCategories(categoryRes);
  };

  useEffect(() => {
    fetchAll();
  }, [pageName]);

  /* ================= DND ================= */

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLayouts((prev) => {
      const oldIndex = prev.findIndex((l) => l.pageTranslationId === active.id);
      const newIndex = prev.findIndex((l) => l.pageTranslationId === over.id);

      const next = arrayMove(prev, oldIndex, newIndex);
      saveLayoutOrder(next);

      setHighlightId(active.id);
      setTimeout(() => setHighlightId(null), 1500);

      return next;
    });
  };

  /* ================= RENDER ================= */

  const buildPatternProps = useCallback(
    (layout: any) =>
      layout.translation?.[lang] ?? layout.translation?.["th"] ?? {},
    [lang]
  );

  const renderComponent = (layout: any) => {
    const Component = components[layout.patternLayoutId];
    if (!Component) return null;

    const pageTranslationId = layout.pageTranslationId;
    const props = buildPatternProps(layout);
    const isTextEditing = editingTextId === pageTranslationId;

    return (
      <div
        className={`relative rounded-xl overflow-hidden border bg-white ${
          highlightId === pageTranslationId ? "ring-2 ring-black" : ""
        }`}
      >
        {/* ===== Header ===== */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between px-4 py-2 bg-white/90 border-b">
          <div>
            <div className="text-xs text-gray-500">
              {layout.patternLayout?.patternLayoutName}
            </div>
            <div className="text-[10px] text-gray-400">
              {pageTranslationId}
            </div>
          </div>

          <div className="flex gap-1">
            {/* Image 1 pic */}
            {IMAGE_PATTERN_IDS.includes(layout.patternLayoutId) && (
              <button
                onClick={() =>
                  setEditingImageTarget({
                    pageTranslationId,
                    title:
                      layout.patternLayout?.patternLayoutName ??
                      "Edit Image",
                  })
                }
                className="text-xs px-2 py-1 border rounded"
              >
                Edit Image
              </button>
            )}

            {/* Image 2 pic */}
            {layout.patternLayoutId === IMAGE_2PIC_PATTERN_ID && (
              <>
                <button
                  onClick={() =>
                    setEditingImageTarget({
                      pageTranslationId,
                      slot: "image1",
                      title: `${layout.patternLayout?.patternLayoutName} – Image 1`,
                    })
                  }
                  className="text-xs px-2 py-1 border rounded"
                >
                  Edit Image 1
                </button>
                <button
                  onClick={() =>
                    setEditingImageTarget({
                      pageTranslationId,
                      slot: "image2",
                      title: `${layout.patternLayout?.patternLayoutName} – Image 2`,
                    })
                  }
                  className="text-xs px-2 py-1 border rounded"
                >
                  Edit Image 2
                </button>
              </>
            )}

            {/* Image 3 pic */}
            {layout.patternLayoutId === IMAGE_3PIC_PATTERN_ID && (
              <>
                {(["image1", "image2", "image3"] as const).map(
                  (slot, index) => (
                    <button
                      key={slot}
                      onClick={() =>
                        setEditingImageTarget({
                          pageTranslationId,
                          slot,
                          title: `${layout.patternLayout?.patternLayoutName} – Image ${
                            index + 1
                          }`,
                        })
                      }
                      className="text-xs px-2 py-1 border rounded"
                    >
                      Edit Image {index + 1}
                    </button>
                  )
                )}
              </>
            )}

            {/* Text */}
            {typeof props.text === "string" && (
              <button
                onClick={() => {
                  setEditingTextId(
                    isTextEditing ? null : pageTranslationId
                  );
                  setDraftText(props.text ?? "");
                }}
                className="text-xs px-2 py-1 border rounded"
              >
                {isTextEditing ? "Cancel" : "Edit Text"}
              </button>
            )}
          </div>
        </div>

        {/* ===== Content ===== */}
        <div className="pt-12 px-6 pb-6 space-y-6">
          {isTextEditing ? (
            <>
              <textarea
                className="w-full min-h-[160px] border rounded p-3"
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
              />
              <button
                onClick={() => {
                  saveText(pageTranslationId, { text: draftText });
                  setEditingTextId(null);
                }}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Save Text
              </button>
            </>
          ) : (
            <div className="pointer-events-none max-w-[1280px] mx-auto">
              <Component {...props} categories={productCategories} />
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ================= RETURN ================= */

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={layouts.map((l) => l.pageTranslationId)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-8">
            {layouts.map((layout) => (
              <SortableItem
                key={layout.pageTranslationId}
                id={layout.pageTranslationId}
              >
                {renderComponent(layout)}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* ===== Image Manager Modal (Singleton) ===== */}
      {editingImageTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 w-[900px] max-h-[80vh] overflow-auto">
            {/* Modal Header */}
            <div className="mb-4 border-b pb-2">
              <div className="text-lg font-semibold">
                {editingImageTarget.title}
              </div>
              <div className="text-xs text-gray-400">
                {editingImageTarget.pageTranslationId}
              </div>
            </div>

            <ImageManager
              onSelect={async (img: ServerImage) => {
                await savePatternImage(
                  editingImageTarget.pageTranslationId,
                  img.id,
                  editingImageTarget.slot
                );
                setEditingImageTarget(null);
                await fetchAll();
              }}
            />

            <div className="text-right mt-4">
              <button
                onClick={() => setEditingImageTarget(null)}
                className="px-4 py-2 border rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
