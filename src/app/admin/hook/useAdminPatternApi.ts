"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

export function useAdminPatternApi(pageName: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  /* ================= FETCH ALL ================= */
  const fetchAll = async () => {
    const pageLayoutRes = await fetch(
      `${API_URL}/pages/page-display/${pageName}`,
    ).then((r) => r.json());

    const patternRes = await fetch(`${API_URL}/pattern-layouts`).then((r) =>
      r.json(),
    );

    const categoryRes = await fetch(`${API_URL}/product-category`).then((r) =>
      r.json(),
    );

    const components = patternRes.reduce(
      (acc: Record<number, ComponentType<any>>, p: any) => {
        const cleanPath = p.patternLayoutPath.replace(/^\//, "");
        acc[p.patternLayoutId] = dynamic(
          () => import(`@app/components/layout-pattern/${cleanPath}`),
          { ssr: false },
        );
        return acc;
      },
      {},
    );

    return {
      layouts: pageLayoutRes.pageLayouts ?? [],
      categories: categoryRes ?? [],
      components,
    };
  };

  /* ================= SAVE TEXT ================= */
  const saveText = async (
    pageTranslationId: string,
    lang: string,
    content: any,
  ) => {
    await fetch(`${API_URL}/pattern-text`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageTranslationId, lang, content }),
    });
  };

  const savePatternText = async (
    pageTranslationId: string,
    lang: string,
    content: Record<string, any>,
  ) => {
    await fetch(`${API_URL}/pattern-text`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageTranslationId, lang, content }),
    });
  };

  /* ================= SAVE IMAGE ================= */
  const savePatternImage = async (
    pageTranslationId: string,
    imageId: number,
    slot?: string,
  ) => {
    await fetch(`${API_URL}/pattern-image`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageTranslationId, imageId, slot }),
    });
  };

  /* ================= SAVE ORDER ================= */
  const saveLayoutOrder = async (pageName: string, layoutOrder: string[]) => {
    await fetch(`${API_URL}/page-layout/order`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageName, layoutOrder }),
    });
  };

  /* ================= SAVE PAGE ================= */
  const savePage = async (
    pageName: string,
    layouts: {
      row: number;
      patternLayoutId: number;
      translation: Record<string, any>;
    }[],
  ) => {
    await fetch(`${API_URL}/pages/page-display/${pageName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(layouts),
    });
  };

  return {
    fetchAll,
    savePatternImage,
    saveLayoutOrder,
    saveText,
    savePatternText,
    savePage,
  };
}
