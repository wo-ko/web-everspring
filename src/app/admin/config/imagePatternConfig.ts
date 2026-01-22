export type ImageField = {
  key: string;
  label: string;
};

export type PatternConfig = {
  imageFields: ImageField[];
  hasText: boolean;
};

export const TEXT_PATTERN_IDS: readonly number[] = [1, 2, 4, 9, 12];

type InternalPatternConfig = PatternConfig & {
  ids: number[];
};

export const IMAGE_PATTERN_CONFIG: Record<string, InternalPatternConfig> = {
  imageLeftTextRight: {
    ids: [7],
    imageFields: [{ key: "imageLeft", label: "รูปซ้าย" }],
    hasText: true,
  },

  textLeftImageRight: {
    ids: [8],
    imageFields: [{ key: "imageRight", label: "รูปขวา" }],
    hasText: true,
  },

  imageOnly: {
    ids: [3, 5, 10],
    imageFields: [{ key: "image1", label: "รูปภาพ" }],
    hasText: false,
  },

  triple: {
    ids: [13],
    imageFields: [
      { key: "image1", label: "รูปที่ 1" },
      { key: "image2", label: "รูปที่ 2" },
      { key: "image3", label: "รูปที่ 3" },
    ],
    hasText: false,
  },
};

export function getPatternConfig(patternId: number): PatternConfig {
  for (const cfg of Object.values(IMAGE_PATTERN_CONFIG)) {
    if (cfg.ids.includes(patternId)) {
      return cfg; // ✅ return type ตรง PatternConfig
    }
  }

  if (TEXT_PATTERN_IDS.includes(patternId)) {
    return {
      imageFields: [],
      hasText: true,
    };
  }

  return {
    imageFields: [],
    hasText: false,
  };
}
