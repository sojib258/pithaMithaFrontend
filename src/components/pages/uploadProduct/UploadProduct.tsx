"use client";
import Button from "@/components/atoms/button/Button";
import InputText from "@/components/atoms/inputText/InputText";
import RadioAtom from "@/components/atoms/radio/Radio";
import SelectBox from "@/components/atoms/selectBox/Select";
import { fetchTags } from "@/store/feature/tags/TagsSlice";
import { RootState } from "@/store/store";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import styles from "./uploadProduct.module.scss";
type formFields = {
  name: string;
  price: number | null;
  discountPrice: number | null;
  category: string;
  isAvailable: string;
  description: string;
  images: FileList;
  weights: string;
};
type Tag = {
  id: string | number;
  name: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const UploadProduct = () => {
  const { category, auth } = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState(false);
  const [radioValue, setRadiovalue] = useState("available");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<(string | number)[]>([]);
  const dispatch = useDispatch();
  const { items: tagsList, loading: tagsLoading } = useSelector(
    (state: RootState) => state.tags
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<formFields>();

  const categories = category.items;
  const { token, userId } = auth;
  const weights = ["kg", "pcs", "bundle"];
  watch(["category", "weights"]);

  const handleRadioChange = (data: string) => {
    setRadiovalue(data);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 4) {
      setError("images", {
        type: "manual",
        message: "You can only upload up to 4 images.",
      });
    } else {
      // Clear the image error if the number of files is within the limit
      clearErrors("images");
      setSelectedImages(files);
    }
  };

  const handleTagToggle = (tagId: string | number) => {
    if (selectedTagIds.includes(tagId)) {
      setSelectedTagIds(
        selectedTagIds.filter((selectedTagId) => selectedTagId !== tagId)
      );
    } else if (selectedTagIds.length < 5) {
      // Select the tag
      setSelectedTagIds([...selectedTagIds, tagId]);
    } else {
      // Show an error if more than 5 tags are selected
      toast.error("You can add a maximum of 5 tags");
    }
  };

  const onSubmit: SubmitHandler<formFields> = async (data: formFields) => {
    const formData = new FormData();

    selectedImages.forEach((item) => {
      console.log("item", item);
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
      console.log("ResponseImage", imageUploadResponse);

      const imagesId = imageUploadResponse.data.map((img: any) => img.id);
      const category = categories.find((item) => item.name === data.category);
      const discountPrice = data.discountPrice
        ? parseFloat(data.discountPrice as unknown as string)
        : null;

      const price = parseFloat(data.price as unknown as string);

      const postData = {
        name: data.name,
        description: data.description,
        price: price,
        discountPrice: discountPrice,
        weight: data.weights,
        category: category?.id ?? null,
        images: imagesId,
        serviceAvailable: isAvailable,
        users_permissions_user: userId,
        tags: selectedTagIds,
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

      const productUploadResponse = await productUploadPromise;

      console.log("Product Upload Response", productUploadResponse);
      setLoading(false);
      reset({
        category: "",
        description: "",
        discountPrice: null,
        name: "",
        price: null,
      });
      setSelectedImages([]);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading product", error);
    }
  };

  useEffect(() => {
    dispatch(fetchTags() as any);
  }, [dispatch]);

  console.log("Values", getValues());
  console.log("Errors", errors);
  console.log("SelectedImages", selectedImages);
  return (
    <Box className={styles.product}>
      <Box className={styles.product__head}>
        <Typography className={styles.product__headText}>
          Set your product details
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box className={styles.product__leftContent}>
            <Box className={styles.product__formField}>
              <Typography
                component={"label"}
                className={styles.product__labelText}
              >
                Product Name:
              </Typography>
              <InputText
                register={register("name", {
                  required: "Product name is required",
                })}
                type="text"
                label="name"
              />
              {errors.name && (
                <Typography
                  component={"span"}
                  className={styles.product__errorMsg}
                >
                  {errors.name.message}
                </Typography>
              )}
            </Box>
            <Box className={styles.product__formField}>
              <Typography
                component={"label"}
                className={styles.product__labelText}
              >
                Product Price:
              </Typography>
              <InputText
                register={register("price", {
                  required: "Product price is required",
                })}
                type="number"
                label="price"
              />
              {errors.price && (
                <Typography
                  component={"span"}
                  className={styles.product__errorMsg}
                >
                  {errors.price.message}
                </Typography>
              )}
            </Box>
            <Box className={styles.product__formField}>
              <Typography
                component={"label"}
                className={styles.product__labelText}
              >
                Discount Price:
              </Typography>
              <InputText
                register={register("discountPrice")}
                type="number"
                label="discount price"
              />
            </Box>

            <Box className={styles.product__formField}>
              <Typography
                component={"label"}
                className={styles.product__labelText}
              >
                Service Availability:
              </Typography>
              <Controller
                control={control}
                name="isAvailable"
                defaultValue={radioValue}
                rules={{
                  required: "You need to provide your service availability",
                }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={radioValue}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleRadioChange(e.target.value);
                    }}
                  >
                    <RadioAtom
                      label="I want to show it public"
                      value="available"
                      onChange={handleRadioChange}
                    />
                    <RadioAtom
                      onChange={handleRadioChange}
                      label={"Temporary Deactivate"}
                      value={"notAvailable"}
                    />
                  </RadioGroup>
                )}
              />

              {errors.isAvailable && (
                <Typography
                  component={"span"}
                  className={styles.product__errorMsg}
                >
                  {errors.isAvailable.message}
                </Typography>
              )}
            </Box>
            <Box className={styles.product__formField}>
              <Typography className={styles.product__labelText}>
                Product Images:
              </Typography>
              <input
                type="file"
                multiple
                accept="image/*"
                {...register("images", {
                  validate: {
                    required: (value) =>
                      (value && value.length > 0) ||
                      "Please upload at least 1 image and maximum 4 image",
                    maxLength: (value) =>
                      (value && value.length <= 4) ||
                      "You can only upload up to 4 images",
                  },
                })}
                onChange={handleImageChange}
              />

              {errors.images && (
                <Typography
                  component="span"
                  className={styles.product__errorMsg}
                >
                  {errors.images.message}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={styles.product__rightContent}>
            <Box className={styles.product__formField}>
              <Typography
                component={"label"}
                className={styles.product__labelText}
              >
                Category of your product:
              </Typography>
              <SelectBox
                value={getValues("category")}
                options={categories.map((item) => item.name)}
                label="Select category"
                register={register("category", {
                  required: "Please provide your category",
                })}
                sx={{ width: "100%!important" }}
              />
              {errors.category && (
                <Typography
                  component={"span"}
                  className={styles.product__errorMsg}
                >
                  {errors.category.message}
                </Typography>
              )}
            </Box>

            <Box className={styles.product__formField}>
              <Typography
                component={"label"}
                className={styles.product__labelText}
              >
                Select weights of your product
              </Typography>
              <SelectBox
                value={getValues("weights")}
                options={weights.map((value) => value)}
                label="Select weight"
                register={register("weights", {
                  required: "Please provide your product weight",
                })}
                sx={{ width: "100%!important" }}
              />
              {errors.weights && (
                <Typography
                  component={"span"}
                  className={styles.product__errorMsg}
                >
                  {errors.weights.message}
                </Typography>
              )}
            </Box>

            <Box className={styles.product__formField}>
              <Typography
                component={"label"}
                className={styles.product__labelText}
              >
                Product Description:
              </Typography>
              <Box
                component="textarea"
                placeholder="Enter product description"
                {...register("description", {
                  required: "Product description is required",
                })}
                className={styles.product__textArea}
              />
              {errors.description && (
                <Typography
                  component={"span"}
                  className={styles.product__errorMsg}
                >
                  {errors.description.message}
                </Typography>
              )}
            </Box>
            <Box className={styles.product__formField}>
              <Typography className={styles.product__labelText}>
                Tags:
              </Typography>

              <Box className={styles.product__tagsList}>
                {tagsList.map((tag: Tag, index) => (
                  <Box key={index} className={styles.product__tagContents}>
                    <Typography
                      onClick={() => handleTagToggle(tag.id)}
                      className={`${styles.product__tagItem} ${
                        selectedTagIds.includes(tag.id)
                          ? styles.product__tagItemActive
                          : ""
                      }`}
                    >
                      {tag.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box my={5}>
        <Button
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
          text="Post Product"
        />
      </Box>
    </Box>
  );
};

export default UploadProduct;
