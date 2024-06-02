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

export interface Order {
  id: number;
  status: string;
  totalPrice: number;
  paid: boolean;
  products: OrderProduct[];
  address: Address;
  createdAt: string;
  transactionId: string;
}

export interface OrderState {
  items: Order[];
  loading: boolean;
  error: string | null;
}
