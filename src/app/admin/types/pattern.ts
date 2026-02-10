export interface PatternLayout {
  id: number;
  patternLayoutId: number;
  translation?: Record<string, any>;
  [key: string]: any;
}

export interface EditingImage {
  layout: PatternLayout;
  field: string;
}
