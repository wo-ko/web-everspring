export type ImageField = {
  key: string;
  label: string;
  isObject?: boolean;
  multiple?: boolean;
  limit?: number;
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
  sideImageText: {
    ids: [7, 8],
    imageFields: [
      {
        key: "obj",
        label: "รูปภาพ",
        isObject: true,
      },
    ],
    hasText: true,
  },

  imageOnlySingle: {
    ids: [3],
    imageFields: [{ key: "image1", label: "รูปภาพ" }],
    hasText: false,
  },

  imageOnlyMultiple: {
    ids: [10],
    imageFields: [
      {
        key: "obj",
        label: "รูปภาพ",
        isObject: true,
        multiple: true,
      },
    ],
    hasText: false,
  },

  double: {
    ids: [11],
    imageFields: [
      {
        key: "obj",
        label: "รูปภาพ",
        isObject: true,
        multiple: true,
        limit: 2,
      },
    ],
    hasText: false,
  },

  triple: {
    ids: [5, 13],
    imageFields: [
      {
        key: "obj",
        label: "รูปภาพ",
        isObject: true,
        multiple: true,
        limit: 3,
      },
    ],
    hasText: false,
  },
};

export function getPatternConfig(patternId: number): PatternConfig {
  for (const cfg of Object.values(IMAGE_PATTERN_CONFIG)) {
    if (cfg.ids.includes(patternId)) {
      return cfg; // return type ตรง PatternConfig
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
