import {
  FormatImage,
  ProductData,
} from "@/utils/typesDefine/productSliceTypes";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const fetchProductsByAttribute = async (
  attribute: string,
  pageSize = 10
): Promise<ProductData[]> => {
  let page = 1;
  let products: ProductData[] = [];
  let hasMore = true;

  while (products.length < pageSize && hasMore) {
    const response = await axios.get(`${API_URL}/products`, {
      params: {
        populate: {
          tags: true,
          category: true,
          images: true,
          users_permissions_user: {
            populate: "image",
          },
        },
        filters: {
          [attribute]: true,
        },
        pagination: {
          page,
          pageSize,
        },
      },
    });

    console.log("RRRRRR", response);

    const newProducts: ProductData[] = response.data.data.map((item: any) => ({
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
          description: item.attributes.category.data?.attributes?.description,
          createdAt: item.attributes.category.data?.attributes?.createdAt,
          updatedAt: item.attributes.category.data?.attributes?.updatedAt,
          publishedAt: item.attributes.category.data?.attributes?.publishedAt,
        },
        tags:
          item.attributes.tags.data?.map((tag: any) => ({
            id: tag.id,
            name: tag.attributes.name,
          })) ?? [],
        images:
          item.attributes.images.data?.slice(-4).map((image: any) => ({
            id: image.id,
            alternativeText: image.attributes.alternativeText,
            width: image.attributes.width,
            height: image.attributes.height,
            url: image.attributes.url,
            formats: Object.keys(image.attributes.formats).reduce(
              (acc: Record<string, FormatImage>, key: string) => {
                acc[key] = {
                  width: image.attributes.formats[key]?.width,
                  height: image.attributes.formats[key]?.height,
                  url: image.attributes.formats[key]?.url,
                };
                return acc;
              },
              {}
            ),
          })) ?? [],
        seller: {
          sellerId: item.attributes.users_permissions_user.data?.id,
          firstName:
            item.attributes.users_permissions_user.data?.attributes.firstName,
          lastName:
            item.attributes.users_permissions_user.data?.attributes?.lastName,
          sellerImg:
            item.attributes.users_permissions_user.data?.attributes.image?.data
              ?.attributes?.url,
          responseTime:
            item.attributes.users_permissions_user.data?.attributes
              ?.responseTime,
          averageResponseTime:
            item.attributes.users_permissions_user.data?.attributes
              ?.averageResponseTime,
        },
      },
    }));

    console.log("New Products", newProducts);

    products = [...products, ...newProducts];
    hasMore =
      response.data.meta.pagination.page <
      response.data.meta.pagination.pageCount;
    page += 1;
  }

  return products.slice(0, pageSize);
};

export const fetchPopularProducts = () => fetchProductsByAttribute("isPopular");
export const fetchFeaturedProducts = () =>
  fetchProductsByAttribute("isFeatured", 10);
export const fetchHotDealsProducts = () =>
  fetchProductsByAttribute("isHotDeals", 10);
