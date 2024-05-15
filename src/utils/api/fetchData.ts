import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const fetchData = async (
  endpoint: string,
  headers?: Record<string, string>
) => {
  try {
    const config = headers ? { headers } : undefined;

    const response = await axios.get(`${API_URL}/${endpoint}`, config);
    return response;
  } catch (error) {
    console.error("Error from fetchData", error);
    throw error;
  }
};

// export const postData = async () => {
//   try {
//     const config = headers ? { headers } : undefined; // Create the config object conditionally
//     const response = await axios.get(`${API_URL}/${endpoint}`, config);
//     return response;
//   } catch (error) {
//     console.error("Error from fetchData", error);
//     throw error;
//   }
// }

export default fetchData;
