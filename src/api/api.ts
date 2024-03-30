import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;
const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products?populate=*`);
  const data = response.data.data.map((item: any) => ({
    id: item.id,
    attributes: {
      name: item.attributes.name,
      description: item.attributes.description,
      price: item.attributes.price,
      createdAt: item.attributes.createdAt,
      updatedAt: item.attributes.updatedAt,
      publishedAt: item.attributes.publishedAt,
      stock: item.attributes.stock,
      discountPrice: item.attributes.discountPrice,
      Availability: item.attributes.Availability,
      ratingValue: item.attributes.ratingValue,
      isPopular: item.attributes.isPopular,
      isFeatured: item.attributes.isFeatured,
      isHotDeals: item.attributes.isHotDeals,
      category: {
        id: item.attributes.category.data?.id,
        name: item.attributes.category.data?.attributes?.name,
        description: item.attributes.category.data?.attributes?.description,
      },
      images: item.attributes.images.data.slice(0, 4).map((image: any) => ({
        id: image.id,
        alternativeText: image.attributes.alternativeText,
        width: image.attributes.width,
        height: image.attributes.height,
        url: image.attributes.url,
        formats: Object.keys(image.attributes.formats).reduce(
          (acc: any, key) => {
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

  return {
    data,
  };
};

export default getAllProducts;
