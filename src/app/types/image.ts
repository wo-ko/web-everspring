export type ImageItem = {
  imageId: number;
  imagePath: string;
  pageKey: string;
  sectionKey: string;
  sortOrder: number;
};

export interface ServerFile {
  id: string;
  createdAt?: string;
  imagePath: string;
}