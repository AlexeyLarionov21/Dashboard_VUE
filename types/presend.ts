import type { Product } from "./product";

export interface PresendApplication {
  id: number;
  isPublished: boolean;
  products: Product[];
  status: string;
  createdAt: string;
}

export interface PresendStorage {
  [key: number]: PresendApplication;
}
