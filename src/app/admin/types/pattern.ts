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

export type User = {
  userId: string | number;
  username: string;
  name: string;
  roleId: number;
  createdAt?: string;
};
