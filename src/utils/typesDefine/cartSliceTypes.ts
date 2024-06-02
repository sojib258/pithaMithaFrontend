export interface ProductData {
  productId: number;
  title: string;
  imgSrc: string;
  altText?: string;
  quantity: number;
  price: number;
  discountPrice?: number;
  isServiceAvailable: boolean;
}

export interface CartSliceData {
  userId: number;
  userName: string;
  status: string;
  averageResponseTime: number;
  products: ProductData[];
}

export interface CartSliceType {
  items: CartSliceData[];
}
