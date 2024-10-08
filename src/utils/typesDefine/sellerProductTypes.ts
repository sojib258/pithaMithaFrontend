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

export interface Seller {
  sellerId: number;
  firstName: string;
  lastName?: string;
  sellerImg?: string;
  responseTime?: number;
  averageResponseTime?: number;
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
  weight: string;
  completedDays: string;
  isPopular: boolean;
  isFeatured: boolean;
  isHotDeals: boolean;
  averageRating?: number;
  category: CategoryData;
  tags: TagData[];
  images: Image[];
  seller: Seller;
  location: string;
}

export interface SellerProductState {
  items: Product[];
  loading: boolean;
  errorMsg: string;
}
