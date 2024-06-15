export interface Address {
  id: number;
  city: string;
  area: string;
  division: string;
  address: string;
  fullName: string;
  landmark: string;
  createdAt: string;
  deliveryOption: string;
  number: number | string;
}

export interface OrderProduct {
  productId: number;
  title: string;
  imgSrc: string;
  altText?: string;
  quantity: number;
  price: number;
  isServiceAvailable: boolean;
  discountPrice?: number;
}

export interface Seller {
  userId: number;
  firstName: string;
  responseTime?: number;
  averageResponseTime?: number;
  lastName?: string;
  sellerImg?: string;
  status: string;
  products: OrderProduct[];
}

export interface Order {
  id: number;
  rootStatus: string;
  totalPrice: number | null;
  paid: boolean;
  createdAt: string;
  transactionId: number | null;
  address: Address;
  sellers: Seller[];
}

export interface OrderState {
  items: Order[];
  loading: boolean;
  error: string | null;
}
