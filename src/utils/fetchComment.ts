import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const fetchComment = async (blogId: number, params: string) => {
  try {
    const response = await axios.get(`${API_URL}/comments/${blogId}?${params}`);
    return response.data.data;
  } catch (error) {
    return "Error from fetching comment";
  }
};

export { fetchComment };
