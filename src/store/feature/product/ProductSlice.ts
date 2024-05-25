import fetchData from "@/utils/api/fetchData";
import {
  FormatImage,
  ProductState,
} from "@/utils/typesDefine/productSliceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

// Define initial state
const initialState: ProductState = {
  items: [],
  loading: false,
  errorMsg: "",
};

// Define async thunk for fetching products
export const fetchItems = createAsyncThunk("products/fetchItems", async () => {
  try {
    const response = await fetchData("products?populate=*");
    console.log("ProductSlice", response);
    return response?.data.data;
  } catch (error) {
    console.error("Error from productSlice", error);
  }
});

// Create slice for products
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.errorMsg = "";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map((item: any) => ({
          id: item.id,
          attributes: {
            name: item.attributes.name,
            shortDescription: item.attributes.shortDescription,
            description: item.attributes.description,
            price: item.attributes.price,
            weight: item.attributes.weight,
            createdAt: item.attributes.createdAt,
            updatedAt: item.attributes.updatedAt,
            publishedAt: item.attributes.publishedAt,
            stock: item.attributes.stock,
            discountPrice: item.attributes.discountPrice,
            isServiceAvailable: item.attributes.serviceAvailable,
            isPopular: item.attributes.isPopular,
            isFeatured: item.attributes.isFeatured,
            isHotDeals: item.attributes.isHotDeals,
            averageRating: item.attributes.averageRating,
            category: {
              id: item.attributes.category.data?.id,
              name: item.attributes.category.data?.attributes?.name,
              description:
                item.attributes.category.data?.attributes?.description,
            },
            tags: item.attributes.tags.data.map((tag: any) => ({
              id: tag.id,
              name: tag.attributes.name,
            })),
            images: item.attributes.images.data
              ?.slice(-4)
              .map((image: any) => ({
                id: image.id,
                alternativeText: image.attributes.alternativeText,
                width: image.attributes.width,
                height: image.attributes.height,
                url: image.attributes.url,
                formats: Object.keys(image.attributes.formats).reduce(
                  (acc: Record<string, FormatImage>, key: string) => {
                    acc[key] = {
                      width: image.attributes.formats[key].width,
                      height: image.attributes.formats[key].height,
                      url: image.attributes.formats[key].url,
                    };
                    return acc;
                  },
                  {}
                ),
              })),
          },
        }));
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = "Error from ProductSlice";
      });
  },
});

// Export actions and reducer
export const {} = productSlice.actions;
export default productSlice.reducer;
