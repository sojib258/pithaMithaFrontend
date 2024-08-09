import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const fetchSingleBlog = async (blogId: number, params: string) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/${blogId}?${params}`);
    return response.data.data;
  } catch (error) {
    return "Error from fetching single blog";
  }
};

const fetchBlogs = async (params: string) => {
  try {
    const response = await axios.get(`${API_URL}/blogs?${params}`);
    return response.data.data;
  } catch (error) {
    return "Error from fetching blogs";
  }
};

export { fetchBlogs, fetchSingleBlog };
