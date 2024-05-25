"use client";
import ProductModel from "@/components/organisms/productModel/ProductModel";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

type formData = {
  name: string;
  price: number | null;
  discountPrice: number | null;
  category: string;
  isAvailable: string;
  description: string;
  shortDescription: string;
  images: FileList;
  weights: string;
  selectedTagIds: (string | number)[];
};

const Page = () => {
  const { category: categories, auth } = useSelector(
    (state: RootState) => state
  );
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token, userId } = auth;

  const handleReRender = () => {
    setRender(!render);
  };

  const handleSubmit = async (data: formData) => {
    console.log("Data from Page", data);
    const formData = new FormData();

    Array.from(data.images).forEach((item) => {
      formData.append("files", item);
    });

    const isAvailable = data.isAvailable === "available";

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      // Upload the images first
      setLoading(true);

      const imageUploadPromise = axios.post(`${API_URL}/upload`, formData, {
        headers,
      });

      toast.promise(imageUploadPromise, {
        loading: "Product Images Uploading...",
        success: "Upload Completed!",
        error: (error: any) => {
          return `${
            error.response.data.error.message
              ? error?.response?.data?.error?.message
              : error.message
          }`;
        },
      });

      const imageUploadResponse = await imageUploadPromise;

      const imagesId = imageUploadResponse.data.map((img: any) => img.id);
      const category = categories.items.find(
        (item) => item.name === data.category
      );
      const discountPrice = data.discountPrice
        ? parseFloat(data.discountPrice as unknown as string)
        : null;

      const price = parseFloat(data.price as unknown as string);

      const postData = {
        name: data.name,
        description: data.description,
        shortDescription: data.shortDescription,
        price: price,
        discountPrice: discountPrice,
        weight: data.weights,
        category: category?.id ?? null,
        images: imagesId,
        serviceAvailable: isAvailable,
        users_permissions_user: userId,
        tags: data.selectedTagIds,
      };

      // // Send the rest of the product data to the backend
      const productUploadPromise = axios.post(
        `${API_URL}/products`,
        { data: postData },
        { headers }
      );

      toast.promise(productUploadPromise, {
        loading: "Product Details Uploading...",
        success: "Upload Completed!",
        error: (error: any) => {
          return `${
            error.message
              ? error.message
              : error?.response?.data?.error?.message
          }`;
        },
      });

      await productUploadPromise;

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading product", error);
    }
  };

  return (
    <Box>
      <ProductModel
        heading="Set your product details"
        btnText="Post Product"
        handleAction={handleSubmit}
        loading={loading}
      />
    </Box>
  );
};

export default Page;
