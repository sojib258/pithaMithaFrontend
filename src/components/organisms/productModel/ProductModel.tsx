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
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import styles from "./productModel.module.scss";

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

type Tag = {
  id: string | number;
  name: string;
};

type InitialData = {};

type formFields = {
  name: string;
  price: number | null;
  discountPrice: number | null;
  category: string;
  isAvailable: string;
  description: string;
  shortDescription: string;
  images: FileList;
  weights: string;
  completedDays: string;
  selectedTagIds: (string | number)[];
};

interface ProductModelProps {
  handleAction: (data: formFields) => Promise<void>;
  ReRender?: () => void;
  btnText: string;
  heading: string;
  initialData?: {
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    discountPrice?: number | null;
    category: {
      id: number;
      name: string;
    };
    isServiceAvailable: boolean;
    images: {
      id: number;
    }[];
    weight: string;
    completedDays: string;
    tags: {
      id: string | number;
    }[];
  };
  loading: boolean;
}

const ProductModel: React.FC<ProductModelProps> = ({
  handleAction,
  btnText,
  heading,
  initialData,
  loading,
}) => {
  const { category, auth } = useSelector((state: RootState) => state);
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
  const completedDays = ["1 Day", "2 Days", "3 Days", "4 Days", "5 Days"];
  watch(["category", "weights", "completedDays"]);

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
      setSelectedTagIds([...selectedTagIds, tagId]);
    } else {
      toast.error("You can add a maximum of 5 tags");
    }
  };

  const onSubmit: SubmitHandler<formFields> = async (data: formFields) => {
    try {
      await handleAction({ ...data, selectedTagIds });
      reset({
        category: "",
        description: "",
        discountPrice: null,
        name: "",
        price: null,
        shortDescription: "",
      });
      setSelectedImages([]);
      setRadiovalue("available");
      setSelectedTagIds([]);
    } catch (error) {
      console.error("Error in handleAction", error);
    }
  };

  useEffect(() => {
    dispatch(fetchTags() as any);

    if (initialData) {
      const availableValue = initialData.isServiceAvailable
        ? "available"
        : "notAvailable";
      const tagIds = initialData.tags.map((item) => item.id);
      reset({
        category: initialData.category.name,
        description: initialData.description,
        discountPrice: initialData.discountPrice,
        isAvailable: availableValue,
        name: initialData.name,
        price: initialData.price,
        selectedTagIds: tagIds,
        shortDescription: initialData.shortDescription,
        weights: initialData.weight,
        completedDays: initialData.completedDays,
      });
      setSelectedTagIds(tagIds);
      setRadiovalue(availableValue);
      // setSelectedTagIds(initialData.selectedTagIds);
      // setRadiovalue(initialData.isAvailable ? "available" : "unavailable");
    }
  }, [dispatch, initialData, reset]);

  return (
    <Box className={styles.product}>
      <Box className={styles.product__head}>
        <Typography className={styles.product__headText}>{heading}</Typography>
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
                Short Description:
              </Typography>
              <InputText
                register={register("shortDescription", {
                  required: "short description is required",
                })}
                type="text"
                label="Short description"
                placeholder="Describe your product shortly 2-3 sentences"
              />
              {errors.shortDescription && (
                <Typography
                  component={"span"}
                  className={styles.product__errorMsg}
                >
                  {errors.shortDescription.message}
                </Typography>
              )}
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
                Estimate product completed days
              </Typography>
              <SelectBox
                value={getValues("completedDays")}
                options={completedDays.map((value) => value)}
                label="Select estimate completed days"
                register={register("completedDays", {
                  required: "Please provide product processing completed days",
                })}
                sx={{ width: "100%!important" }}
              />
              {errors.completedDays && (
                <Typography
                  component={"span"}
                  className={styles.product__errorMsg}
                >
                  {errors.completedDays.message}
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
          text={btnText}
        />
      </Box>
    </Box>
  );
};

export default ProductModel;
