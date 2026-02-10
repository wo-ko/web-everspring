"use client";

import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { useAdminPatternApi } from "@app/admin/hook/useAdminPatternApi";
import { usePatternDnD } from "@app/admin/hook/usePatternDnD";

import AdminPatternCard from "./AdminPatternCard";
import PatternImageModal from "./PatternImageModal";
import { PatternLayout } from "@app/admin/types/pattern";
import { useAdminLang } from "@app/admin/(components)/AdminLangContext";
import Swal from "sweetalert2";
import {
  renderImageUrl,
  resolveImageUrl,
} from "@app/admin/hook/useMediaImages";
import { ImageField } from "@app/admin/config/imagePatternConfig";

export default function AdminPatternRenderer({
  pageName,
}: {
  pageName: string;
}) {
  const { lang } = useAdminLang();

  const [_layouts, setLayouts] = useState<PatternLayout[]>([]);
  const [draftLayouts, setDraftLayouts] = useState<PatternLayout[]>([]);
  const [hasChange, setHasChange] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [components, setComponents] = useState<
    Record<number, React.ComponentType<any>>
  >({});
  const [categories, setCategories] = useState<any[]>([]);

  /** ===== TEXT EDIT ===== */
  const [editingTextLayout, setEditingTextLayout] =
    useState<PatternLayout | null>(null);
  const [draftText, setDraftText] = useState("");

  /** ===== IMAGE EDIT ===== */
  const [editingImage, setEditingImage] = useState<{
    layout: PatternLayout;
    field: ImageField;
    index?: number; // ใช้เฉพาะ obj
  } | null>(null);

  const api = useAdminPatternApi(pageName);

  /* ================= FETCH ================= */
  useEffect(() => {
    api.fetchAll().then((res) => {
      if (!res) return;
      setLayouts(res.layouts); // snapshot
      setDraftLayouts(res.layouts); // ตัวที่แก้จริง
      setComponents(res.components);
      setCategories(res.categories);
    });
  }, [pageName]);

  /* ================= DND ================= */
  const { handleDragEnd } = usePatternDnD(
    draftLayouts,
    (nextLayouts) => {
      setDraftLayouts(nextLayouts);
      setHasChange(true);
    },
    "pageTranslationId",
  );

  /* ================= SAVE PAGE ================= */
  async function handleSavePage() {
    if (isSaving) return;

    try {
      setIsSaving(true);

      Swal.fire({
        title: "กำลังบันทึก...",
        text: "กรุณารอสักครู่",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const payload = draftLayouts.map((l, index) => ({
        row: index + 1,
        patternLayoutId: l.patternLayoutId,
        translation: l.translation ?? {},
      }));

      await api.savePage(pageName, payload);

      console.log(payload);
      setLayouts(draftLayouts);
      setHasChange(false);

      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลเรียบร้อย",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "บันทึกไม่สำเร็จ",
        text: "กรุณาลองใหม่อีกครั้ง",
      });
    } finally {
      setIsSaving(false);
    }
  }

  /* ================= RENDER ================= */
  return (
    <>
      {/* ===== SAVE BUTTON ===== */}
      {hasChange && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleSavePage}
            className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            อัพเดทข้อมูลใหม่
          </button>
        </div>
      )}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="space-y-8">
          {draftLayouts.map((layout) => {
            const Component = components[layout.patternLayoutId];
            if (!Component) return null;

            const translated = layout.translation?.[lang];

            let renderTranslated: any = { ...translated };
            //image / image1
            Object.keys(renderTranslated || {}).forEach((key) => {
              if (key.toLowerCase().includes("image")) {
                renderTranslated[key] = renderImageUrl(
                  renderTranslated[key],
                  `${layout.pageTranslationId}-${key}-${hasChange ? "draft" : "saved"}`,
                );
              }
            });

            // obj[].image
            // if (Array.isArray(renderTranslated.obj)) {
            //   renderTranslated.obj = renderTranslated.obj.map(
            //     (item: any, index: number) => ({
            //       ...item,
            //       image: renderImageUrl(
            //         item.image,
            //         `${layout.pageTranslationId}-obj-${index}-${hasChange ? "draft" : "saved"}`,
            //       ),
            //     }),
            //   );
            // }

            if (Array.isArray(renderTranslated.obj)) {
              renderTranslated.obj = renderTranslated.obj.map(
                (item: any, index: number) => {
                  const nextItem: any = { ...item };

                  Object.keys(item || {}).forEach((key) => {
                    if (key.toLowerCase().includes("image") || key === "logo") {
                      nextItem[key] = renderImageUrl(
                        item[key],
                        `${layout.pageTranslationId}-obj-${key}-${index}-${hasChange ? "draft" : "saved"}`,
                      );
                    }
                  });

                  return nextItem;
                },
              );
            }

            const layoutForRender: PatternLayout = {
              ...layout,
              translation: {
                ...layout.translation,
                [lang]: renderTranslated,
              },
            };

            return (
              // <AdminPatternCard
              //   key={layout.pageTranslationId}
              //   layout={layoutForRender}
              //   Component={(props: any) => (
              //     <Component {...props} categories={categories} />
              //   )}
              //   lang={lang}
              //   onEditText={(l) => {
              //     const text =
              //       l.translation?.[lang]?.text ??
              //       l.translation?.["th"]?.text ??
              //       "";
              //     setDraftText(text);
              //     setEditingTextLayout(l);
              //   }}
              //   onEditImage={(l, field) =>
              //     setEditingImage({ layout: l, field })
              //   }
              // />
              <AdminPatternCard
                key={layout.pageTranslationId}
                layout={layoutForRender}
                Component={(props: any) => (
                  <Component {...props} categories={categories} />
                )}
                lang={lang}
                // onEditText={(l) => {
                //   const text =
                //     l.translation?.[lang]?.text ??
                //     l.translation?.["th"]?.text ??
                //     "";
                //   setDraftText(text);
                //   setEditingTextLayout(l);
                // }}
                onEditText={(l) => {
                  const current = l.translation?.[lang] ?? {};
                  setDraftText(JSON.stringify(current, null, 2));
                  setEditingTextLayout(l);
                }}
                onEditImage={(layout, field, index) =>
                  setEditingImage({ layout, field, index })
                }
              />
            );
          })}
        </div>
      </DndContext>

      {/* ===== TEXT MODAL ===== */}
      {editingTextLayout && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 w-[700px] space-y-4">
            <h3 className="font-semibold">แก้ไขข้อความ</h3>

            <textarea
              className="w-full min-h-[200px] border rounded p-3"
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTextLayout(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  try {
                    const parsed = JSON.parse(draftText);

                    setDraftLayouts((prev) =>
                      prev.map((l) =>
                        l.pageTranslationId ===
                        editingTextLayout.pageTranslationId
                          ? {
                              ...l,
                              translation: {
                                ...l.translation,
                                [lang]: parsed,
                              },
                            }
                          : l,
                      ),
                    );

                    setHasChange(true);
                    setEditingTextLayout(null);
                  } catch (e) {
                    Swal.fire(
                      "ข้อมูลไม่ถูกต้อง",
                      "กรุณาตรวจสอบรูปแบบข้อความ",
                      "error",
                    );
                  }
                }}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== IMAGE MODAL ===== */}
      {editingImage && (
        <PatternImageModal
          target={editingImage}
          onClose={() => setEditingImage(null)}
          // onSelect={(image) => {
          //   if (!editingImage) return;

          //   const { layout, field, index } = editingImage;

          //   setDraftLayouts((prev) =>
          //     prev.map((l) => {
          //       if (l.pageTranslationId !== layout.pageTranslationId) return l;

          //       const current = l.translation?.[lang] ?? {};
          //       const next: any = { ...current };

          //       // ===== OBJECT IMAGE (pattern 7) =====
          //       if (field.isObject) {
          //         const arr = Array.isArray(current[field.key])
          //           ? [...current[field.key]]
          //           : [{}];

          //         const targetIndex = index ?? 0;

          //         arr[targetIndex] = {
          //           ...(arr[targetIndex] ?? {}),
          //           image: image.imagePath,
          //         };

          //         next[field.key] = arr;
          //       }

          //       // ===== MULTIPLE IMAGE (non-object) =====
          //       else if (field.multiple) {
          //         const arr = Array.isArray(current[field.key])
          //           ? [...current[field.key]]
          //           : [];

          //         const targetIndex = index ?? arr.length;
          //         arr[targetIndex] = image.imagePath;

          //         next[field.key] = arr;
          //       }

          //       // ===== SINGLE IMAGE =====
          //       else {
          //         next[field.key] = image.imagePath;
          //       }

          //       return {
          //         ...l,
          //         translation: {
          //           ...l.translation,
          //           [lang]: next,
          //         },
          //       };
          //     }),
          //   );

          //   setHasChange(true);
          //   setEditingImage(null);
          // }}
          onSelect={(image) => {
            if (!editingImage) return;

            const { layout, field, index } = editingImage;

            setDraftLayouts((prev) =>
              prev.map((l) => {
                if (l.pageTranslationId !== layout.pageTranslationId) return l;

                const current = l.translation?.[lang] ?? {};
                const next: any = { ...current };

                // ===== OBJECT IMAGE (pattern 7, 15, etc.) =====
                if (field.isObject) {
                  const arr = Array.isArray(current[field.key])
                    ? [...current[field.key]]
                    : [{}];

                  const targetIndex = index ?? 0;
                  const imgKey = field.imageKey ?? "image"; // ⭐ fallback ปลอดภัย

                  arr[targetIndex] = {
                    ...(arr[targetIndex] ?? {}),
                    [imgKey]: image.imagePath,
                  };

                  next[field.key] = arr;
                }

                // ===== MULTIPLE IMAGE (non-object) =====
                else if (field.multiple) {
                  const arr = Array.isArray(current[field.key])
                    ? [...current[field.key]]
                    : [];

                  const targetIndex = index ?? arr.length;
                  arr[targetIndex] = image.imagePath;

                  next[field.key] = arr;
                }

                // ===== SINGLE IMAGE =====
                else {
                  next[field.key] = image.imagePath;
                }

                return {
                  ...l,
                  translation: {
                    ...l.translation,
                    [lang]: next,
                  },
                };
              }),
            );

            setHasChange(true);
            setEditingImage(null);
          }}
        />
      )}
    </>
  );
}
