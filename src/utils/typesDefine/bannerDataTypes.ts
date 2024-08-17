import { ImageData } from "./productSliceTypes";

export interface bannerAttributes {
  welcome: string;
  heading: string;
  para: string;
  sellText: string;
  sellDiscount: string;
  image: {
    data: ImageData;
  };
}

export interface bannerData {
  id: number;
  attributes: bannerAttributes;
}
