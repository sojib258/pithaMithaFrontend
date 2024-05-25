"use client";
import { RootState } from "@/store/store";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ProductModel from "../productModel/ProductModel";
import styles from "./editProduct.module.scss";
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

interface EditProductDialogProps {
  open: boolean;
  productId: string | number;
  loading: boolean;
  handleClose: () => void;
  handleReRender: () => void;
  handleLoading: (value: boolean) => void;
}
const EditProductDialog: React.FC<EditProductDialogProps> = ({
  open,
  productId,
  loading,
  handleClose,
  handleReRender,
  handleLoading,
}) => {
  const {
    sellerProduct,
    auth,
    category: categories,
  } = useSelector((state: RootState) => state);

  const productTobeUpdate = sellerProduct.items.find(
    (product) => product.id === productId
  );

  const productImageIds = productTobeUpdate?.images.map((image) => image.id);
  const { userId, token } = auth;

  const handleCloseDialog = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") {
      // Ignore backdrop click events
      return;
    }
    handleClose();
  };

  const handleEditProduct = async (data: formData) => {
    try {
      handleLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      toast("Updating...");
      handleClose();
      // Step 1: Delete previous images if any new images are provided
      if (data.images.length > 0) {
        if (productImageIds) {
          const deleteImagePromises = productImageIds.map((id) =>
            axios.delete(`${API_URL}/upload/files/${id}`, { headers })
          );
          await Promise.all(deleteImagePromises);
        }
      }

      // Step 2: Upload new images if provided
      const formData = new FormData();
      Array.from(data.images).forEach((item) => {
        formData.append("files", item);
      });

      const imageUploadPrimise = axios.post(`${API_URL}/upload`, formData, {
        headers,
      });

      toast.promise(imageUploadPrimise, {
        loading: "Image Updating...",
        success: "Image Updated",
        error: (error: any) => {
          return `${error?.response?.data?.error?.message}`;
        },
      });
      const imageUploadResponse = await imageUploadPrimise;
      const newImageIds = imageUploadResponse.data.map((img: any) => img.id);

      // Step 3: Update product details
      const isAvailable = data.isAvailable === "available";
      const category = categories.items.find(
        (item) => item.name === data.category
      );

      const discountPrice = data.discountPrice
        ? parseFloat(data.discountPrice as unknown as string)
        : null;

      const price = parseFloat(data.price as unknown as string);

      const updatedProductData = {
        name: data.name,
        description: data.description,
        shortDescription: data.shortDescription,
        price: price,
        discountPrice: discountPrice,
        weight: data.weights,
        category: category?.id ?? null,
        images: newImageIds,
        serviceAvailable: isAvailable,
        users_permissions_user: userId,
        tags: data.selectedTagIds,
      };

      const productUpdatePromise = axios.put(
        `${API_URL}/products/${productId}`,
        { data: updatedProductData },
        { headers }
      );

      toast.promise(productUpdatePromise, {
        loading: "Product details updating..",
        success: "Product updated successfully!",
        error: (error: any) => {
          return `${error?.response?.data?.error?.message}`;
        },
      });

      const productUpdateResponse = await productUpdatePromise;
      handleLoading(false);
      handleReRender();
    } catch (error) {
      handleLoading(false);
      console.error("Error updating product", error);
      toast.error("Error updating product");
    }
  };

  return (
    <Dialog
      className={`${styles.product} editProductDialog`}
      onClose={handleCloseDialog}
      open={open}
    >
      <Box className={styles.product__iconBox}>
        <CloseIcon
          className={styles.product__closeIcon}
          onClick={handleClose}
        />
      </Box>
      <DialogContent>
        <ProductModel
          heading="Edit your product details"
          btnText="Edit Product"
          handleAction={handleEditProduct}
          initialData={productTobeUpdate}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
