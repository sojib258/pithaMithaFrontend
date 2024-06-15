export interface FormatImage {
  width: number;
  height: number;
  url: string;
}

export interface ImageData {
  id: number;
  alternativeText: string;
  width: number;
  height: number;
  url: string;
  formats: Record<string, FormatImage>;
}

export interface Seller {
  sellerId: number;
  firstName: string;
  lastName?: string;
  sellerImg?: string;
  responseTime?: number;
  averageResponseTime?: number;
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface ProductAttributes {
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  stock: number;
  discountPrice?: number; // Make this optional
  isServiceAvailable: boolean;
  averageRating?: number;
  category: Category;
  tags: Tag[];
  weight: string;
  isPopular: boolean;
  isFeatured: boolean;
  isHotDeals: boolean;
  images: ImageData[];
  seller: Seller;
}

export interface ProductData {
  id: number;
  attributes: ProductAttributes;
}

export interface ProductState {
  items: ProductData[];
  loading: boolean;
  errorMsg: string;
}
