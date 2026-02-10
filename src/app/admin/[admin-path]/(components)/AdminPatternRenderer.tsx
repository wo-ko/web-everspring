// "use client";

// import { useThemeContext } from "@app/context/theme-context";
// import dynamic from "next/dynamic";
// import { ComponentType, useCallback, useEffect, useState } from "react";
// import ImageManager, { ServerImage } from "./ImageManager";

// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   useSortable,
//   verticalListSortingStrategy,
//   arrayMove,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// /* ================= CONSTANT ================= */

// const IMAGE_PATTERN_IDS = [3, 5, 7, 8, 10];
// const IMAGE_2PIC_PATTERN_ID = 11;
// const IMAGE_3PIC_PATTERN_ID = 13;

// /* ================= SORTABLE ITEM ================= */

// function SortableItem({
//   id,
//   children,
// }: {
//   id: string;
//   children: React.ReactNode;
// }) {
//   const { setNodeRef, transform, transition, listeners, attributes } =
//     useSortable({ id });

//   return (
//     <div
//       ref={setNodeRef}
//       style={{
//         transform: CSS.Transform.toString(transform),
//         transition,
//       }}
//       {...attributes}
//       {...listeners}
//       className="cursor-grab active:cursor-grabbing"
//     >
//       {children}
//     </div>
//   );
// }

// /* ================= MAIN ================= */

// export default function AdminPatternRenderer({
//   pageName,
// }: {
//   pageName: string;
// }) {
//   const { lang } = useThemeContext();
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   const [layouts, setLayouts] = useState<any[]>([]);
//   const [components, setComponents] = useState<
//     Record<number, ComponentType<any>>
//   >({});
//   const [productCategories, setProductCategories] = useState<any[]>([]);
//   const [highlightId, setHighlightId] = useState<string | null>(null);

//   /* ===== Text ===== */
//   const [editingTextId, setEditingTextId] = useState<string | null>(null);
//   const [draftText, setDraftText] = useState("");

//   /* ===== Image (singleton target + title) ===== */
//   const [editingImageTarget, setEditingImageTarget] = useState<{
//     pageTranslationId: string;
//     slot?: "image1" | "image2" | "image3";
//     title: string;
//   } | null>(null);

//   /* ================= API ================= */

//   async function saveText(
//     pageTranslationId: string,
//     content: Record<string, any>,
//   ) {
//     await fetch(`${API_URL}/pattern-text`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ pageTranslationId, lang, content }),
//     });
//   }

//   async function saveLayoutOrder(nextLayouts: any[]) {
//     await fetch(`${API_URL}/page-layout/order`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         pageName,
//         layoutOrder: nextLayouts.map((l) => l.pageTranslationId),
//       }),
//     });
//   }

//   async function savePatternImage(
//     pageTranslationId: string,
//     imageId: number,
//     slot?: string,
//   ) {
//     await fetch(`${API_URL}/pattern-image`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ pageTranslationId, imageId, slot }),
//     });
//   }

//   /* ================= FETCH ================= */

//   const fetchAll = async () => {
//     const pageLayoutRes = await fetch(
//       `${API_URL}/pages/page-display/${pageName}`,
//     ).then((r) => r.json());

//     const patternRes = await fetch(`${API_URL}/pattern-layouts`).then((r) =>
//       r.json(),
//     );

//     const categoryRes = await fetch(`${API_URL}/product-category`).then((r) =>
//       r.json(),
//     );

//     const compMap = patternRes.reduce(
//       (acc: Record<number, ComponentType<any>>, p: any) => {
//         const cleanPath = p.patternLayoutPath.replace(/^\//, "");
//         acc[p.patternLayoutId] = dynamic(
//           () => import(`../../../components/layout-pattern/${cleanPath}`),
//           { ssr: false },
//         );
//         return acc;
//       },
//       {},
//     );

//     setLayouts(pageLayoutRes.pageLayouts ?? []);
//     setComponents(compMap);
//     setProductCategories(categoryRes);
//   };

//   useEffect(() => {
//     fetchAll();
//   }, [pageName]);

//   /* ================= DND ================= */

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
//   );

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     setLayouts((prev) => {
//       const oldIndex = prev.findIndex((l) => l.pageTranslationId === active.id);
//       const newIndex = prev.findIndex((l) => l.pageTranslationId === over.id);

//       const next = arrayMove(prev, oldIndex, newIndex);
//       saveLayoutOrder(next);

//       setHighlightId(active.id);
//       setTimeout(() => setHighlightId(null), 1500);

//       return next;
//     });
//   };

//   /* ================= RENDER ================= */

//   const buildPatternProps = useCallback(
//     (layout: any) =>
//       layout.translation?.[lang] ?? layout.translation?.["th"] ?? {},
//     [lang],
//   );

//   const renderComponent = (layout: any) => {
//     const Component = components[layout.patternLayoutId];
//     if (!Component) return null;

//     const pageTranslationId = layout.pageTranslationId;
//     const props = buildPatternProps(layout);
//     const isTextEditing = editingTextId === pageTranslationId;

//     return (
//       <div
//         className={`relative rounded-xl overflow-hidden border bg-white ${
//           highlightId === pageTranslationId ? "ring-2 ring-black" : ""
//         }`}
//       >
//         {/* ===== Header ===== */}
//         <div className="absolute top-0 left-0 right-0 z-20 flex justify-between px-4 py-2 bg-white/90 border-b">
//           <div>
//             <div className="text-xs text-gray-500">
//               {layout.patternLayout?.patternLayoutName}
//             </div>
//             <div className="text-[10px] text-gray-400">{pageTranslationId}</div>
//           </div>

//           <div className="flex gap-1">
//             {/* Image 1 pic */}
//             {IMAGE_PATTERN_IDS.includes(layout.patternLayoutId) && (
//               <button
//                 onClick={() =>
//                   setEditingImageTarget({
//                     pageTranslationId,
//                     title:
//                       layout.patternLayout?.patternLayoutName ?? "Edit Image",
//                   })
//                 }
//                 className="text-xs px-2 py-1 border rounded"
//               >
//                 Edit Image
//               </button>
//             )}

//             {/* Image 2 pic */}
//             {layout.patternLayoutId === IMAGE_2PIC_PATTERN_ID && (
//               <>
//                 <button
//                   onClick={() =>
//                     setEditingImageTarget({
//                       pageTranslationId,
//                       slot: "image1",
//                       title: `${layout.patternLayout?.patternLayoutName} – Image 1`,
//                     })
//                   }
//                   className="text-xs px-2 py-1 border rounded"
//                 >
//                   Edit Image 1
//                 </button>
//                 <button
//                   onClick={() =>
//                     setEditingImageTarget({
//                       pageTranslationId,
//                       slot: "image2",
//                       title: `${layout.patternLayout?.patternLayoutName} – Image 2`,
//                     })
//                   }
//                   className="text-xs px-2 py-1 border rounded"
//                 >
//                   Edit Image 2
//                 </button>
//               </>
//             )}

//             {/* Image 3 pic */}
//             {layout.patternLayoutId === IMAGE_3PIC_PATTERN_ID && (
//               <>
//                 {(["image1", "image2", "image3"] as const).map(
//                   (slot, index) => (
//                     <button
//                       key={slot}
//                       onClick={() =>
//                         setEditingImageTarget({
//                           pageTranslationId,
//                           slot,
//                           title: `${layout.patternLayout?.patternLayoutName} – Image ${
//                             index + 1
//                           }`,
//                         })
//                       }
//                       className="text-xs px-2 py-1 border rounded"
//                     >
//                       Edit Image {index + 1}
//                     </button>
//                   ),
//                 )}
//               </>
//             )}

//             {/* Text */}
//             {typeof props.text === "string" && (
//               <button
//                 onClick={() => {
//                   setEditingTextId(isTextEditing ? null : pageTranslationId);
//                   setDraftText(props.text ?? "");
//                 }}
//                 className="text-xs px-2 py-1 border rounded"
//               >
//                 {isTextEditing ? "Cancel" : "Edit Text"}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ===== Content ===== */}
//         <div className="pt-12 px-6 pb-6 space-y-6">
//           {isTextEditing ? (
//             <>
//               <textarea
//                 className="w-full min-h-[160px] border rounded p-3"
//                 value={draftText}
//                 onChange={(e) => setDraftText(e.target.value)}
//               />
//               <button
//                 onClick={() => {
//                   saveText(pageTranslationId, { text: draftText });
//                   setEditingTextId(null);
//                 }}
//                 className="px-4 py-2 bg-black text-white rounded"
//               >
//                 Save Text
//               </button>
//             </>
//           ) : (
//             <div className="pointer-events-none max-w-[1280px] mx-auto">
//               <Component {...props} categories={productCategories} />
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   /* ================= RETURN ================= */

//   return (
//     <>
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={layouts.map((l) => l.pageTranslationId)}
//           strategy={verticalListSortingStrategy}
//         >
//           <div className="space-y-8">
//             {layouts.map((layout) => (
//               <SortableItem
//                 key={layout.pageTranslationId}
//                 id={layout.pageTranslationId}
//               >
//                 {renderComponent(layout)}
//               </SortableItem>
//             ))}
//           </div>
//         </SortableContext>
//       </DndContext>

//       {/* ===== Image Manager Modal (Singleton) ===== */}
//       {editingImageTarget && (
//         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
//           <div className="bg-white rounded-xl p-4 w-[900px] max-h-[80vh] overflow-auto">
//             {/* Modal Header */}
//             <div className="mb-4 border-b pb-2">
//               <div className="text-lg font-semibold">
//                 {editingImageTarget.title}
//               </div>
//               <div className="text-xs text-gray-400">
//                 {editingImageTarget.pageTranslationId}
//               </div>
//             </div>

//             <ImageManager
//               onSelect={async (img: ServerImage) => {
//                 await savePatternImage(
//                   editingImageTarget.pageTranslationId,
//                   img.id,
//                   editingImageTarget.slot,
//                 );
//                 setEditingImageTarget(null);
//                 await fetchAll();
//               }}
//             />

//             <div className="text-right mt-4">
//               <button
//                 onClick={() => setEditingImageTarget(null)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

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

      {/* <DndContext onDragEnd={handleDragEnd}>
        <div className="space-y-8">
          {draftLayouts.map((layout) => {
            const Component = components[layout.patternLayoutId];
            if (!Component) return null;

            const translated = layout.translation?.[lang];

            const renderTranslated = { ...translated };

            Object.keys(renderTranslated || {}).forEach((key) => {
              if (key.toLowerCase().includes("image")) {
                renderTranslated[key] = renderImageUrl(
                  renderTranslated[key],
                  `${layout.pageTranslationId}-${key}-${hasChange ? "draft" : "saved"}`,
                );
              }
            });

            const layoutForRender: PatternLayout = {
              ...layout,
              translation: {
                ...layout.translation,
                [lang]: renderTranslated,
              },
            };

            return (
              <AdminPatternCard
                key={layout.pageTranslationId}
                layout={layoutForRender} // ⭐ ใช้ตัว render แล้ว
                Component={(props: any) => (
                  <Component {...props} categories={categories} />
                )}
                lang={lang}
                onEditText={(l) => {
                  const text =
                    l.translation?.[lang]?.text ??
                    l.translation?.["th"]?.text ??
                    "";
                  setDraftText(text);
                  setEditingTextLayout(l);
                }}
                onEditImage={(l, field) =>
                  setEditingImage({ layout: l, field })
                }
              />
            );
          })}
        </div>
      </DndContext> */}

      <DndContext onDragEnd={handleDragEnd}>
        <div className="space-y-8">
          {draftLayouts.map((layout) => {
            const Component = components[layout.patternLayoutId];
            if (!Component) return null;

            const translated = layout.translation?.[lang];

            let renderTranslated: any = { ...translated };

            // if (renderTranslated?.obj && Array.isArray(renderTranslated.obj)) {
            //   const outerImage =
            //     renderTranslated.image || renderTranslated.image1;

            //   if (outerImage) {
            //     renderTranslated.obj = renderTranslated.obj.map(
            //       (item: any) => ({
            //         ...item,
            //         image: outerImage,
            //       }),
            //     );
            //   }
            // }

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
            if (Array.isArray(renderTranslated.obj)) {
              renderTranslated.obj = renderTranslated.obj.map(
                (item: any, index: number) => ({
                  ...item,
                  image: renderImageUrl(
                    item.image,
                    `${layout.pageTranslationId}-obj-${index}-${hasChange ? "draft" : "saved"}`,
                  ),
                }),
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

              {/* <button
                onClick={() => {
                  setDraftLayouts((prev) =>
                    prev.map((l) =>
                      l.pageTranslationId ===
                      editingTextLayout.pageTranslationId
                        ? {
                            ...l,
                            translation: {
                              ...l.translation,
                              [lang]: {
                                ...l.translation?.[lang],
                                text: draftText,
                              },
                            },
                          }
                        : l,
                    ),
                  );

                  setHasChange(true);
                  setEditingTextLayout(null);
                }}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Save
              </button> */}
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
        // <PatternImageModal
        //   target={editingImage}
        //   onClose={() => setEditingImage(null)}
        //   onSelect={(image) => {
        //     setDraftLayouts((prev) =>
        //       prev.map((l) => {
        //         if (
        //           l.pageTranslationId !== editingImage.layout.pageTranslationId
        //         )
        //           return l;

        //         const current = l.translation?.[lang] ?? {};

        //         let nextTranslation: any = {
        //           ...current,
        //           image: image.imagePath,
        //         };

        //         if (Array.isArray(current.obj)) {
        //           nextTranslation.obj = current.obj.map((item: any) => ({
        //             ...item,
        //             image: image.imagePath,
        //           }));
        //         }

        //         return {
        //           ...l,
        //           translation: {
        //             ...l.translation,
        //             [lang]: nextTranslation,
        //           },
        //         };
        //       }),
        //     );

        //     setHasChange(true);
        //     setEditingImage(null);
        //   }}
        // />
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
          //       const next = { ...current };

          //       // 🔥 MULTIPLE IMAGE (pattern 10)
          //       if (field.multiple && field.isObject) {
          //         const objArr = Array.isArray(current.obj)
          //           ? [...current.obj]
          //           : [];
          //         console.log("EDIT IMAGE", {
          //           index,
          //           before: current.obj,
          //         });

          //         const targetIndex = index ?? objArr.length;

          //         objArr[targetIndex] = {
          //           ...(objArr[targetIndex] ?? {}),
          //           image: image.imagePath, // ✅ ทับตาม index จริง
          //         };

          //         next.obj = objArr;
          //       }
          //       // 🔹 SINGLE IMAGE
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

            const { layout, index } = editingImage;

            setDraftLayouts((prev) =>
              prev.map((l) => {
                if (l.pageTranslationId !== layout.pageTranslationId) return l;

                const current = l.translation?.[lang] ?? {};

                const objArr = Array.isArray(current.obj)
                  ? [...current.obj]
                  : [];

                const targetIndex = index ?? 0; // 🔥 รูปเดียว = index 0

                objArr[targetIndex] = {
                  ...(objArr[targetIndex] ?? {}),
                  image: image.imagePath,
                };

                return {
                  ...l,
                  translation: {
                    ...l.translation,
                    [lang]: {
                      ...current,
                      obj: objArr,
                    },
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
