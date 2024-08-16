export interface FormatImage {
  width: number;
  height: number;
  url: string;
}

export interface ImageData {
  id: number;
  attributes: {
    alternativeText: string;
    width: number;
    height: number;
    url: string;
    formats: {
      small: FormatImage;
      medium: FormatImage;
      thumbnail: FormatImage;
      large: FormatImage;
    };
  };
}

export interface Seller {
  id: number;
  attributes: {
    firstName: string;
    lastName?: string;
    image?: ImageData;
    responseTime?: number;
    averageResponseTime?: number;
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Tag {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
  };
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
  serviceAvailable: boolean;
  averageRating?: number;
  weight: string;
  isPopular: boolean;
  isFeatured: boolean;
  isHotDeals: boolean;
  location: string;
  category: {
    data: Category;
  };
  tags: {
    data: Tag[];
  };
  images: {
    data: ImageData[];
  };
  users_permissions_user: {
    data: Seller;
  };
}

export interface ProductData {
  id: number;
  attributes: ProductAttributes;
}

export interface ProductState {
  items: ProductData[];
  loading: boolean;
  errorMsg: string;
  meta?: {
    pagination?: {
      start?: number;
      limit?: number;
      total?: number;
    };
  };
}
