// usePatternEditor.ts
import { useState } from "react";
import { PatternLayout } from "@app/admin/types/pattern";

export function usePatternEditor() {
  const [editingText, setEditingText] = useState<{
    layout: PatternLayout;
    field: "text";
  } | null>(null);

  const [draftText, setDraftText] = useState("");

  const [editingImage, setEditingImage] = useState<{
    layout: PatternLayout;
    field: "image1" | "image2" | "image3";
  } | null>(null);

  return {
    // text
    editingText,
    setEditingText,
    draftText,
    setDraftText,

    // image
    editingImage,
    setEditingImage,
  };
}
