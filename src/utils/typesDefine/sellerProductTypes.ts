export interface FormatImageData {
  width: number;
  height: number;
  url: string;
}

export interface Image {
  id: number;
  alternativeText: string;
  width: number;
  height: number;
  url: string;
  formats?: Record<string, FormatImageData>;
}

export interface CategoryData {
  id: number;
  name: string;
  description: string;
}

export interface TagData {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  stock: number;
  discountPrice?: number;
  isServiceAvailable: boolean;
  category: CategoryData;
  tags: TagData[];
  weight: string;
  completedDays: string;
  isPopular: boolean;
  isFeatured: boolean;
  isHotDeals: boolean;
  averageRating?: number;
  images: Image[];
}

export interface SellerProductState {
  items: Product[];
  loading: boolean;
  errorMsg: string;
}
