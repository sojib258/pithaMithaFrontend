import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const fetchProducts = async (params: string = "") => {
  try {
    const response = await axios.get(`${API_URL}/products?${params}`);
    return response.data.data;
  } catch (error) {
    return "Error from fetching products";
  }
};

const fetchSingleProduct = async (productId: number, params: string = "") => {
  try {
    const response = await axios.get(
      `${API_URL}/products/${productId}?${params}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error from fetching single product");
  }
};

export { fetchProducts, fetchSingleProduct };
