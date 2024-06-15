import Button from "@/components/atoms/button/Button";
import Rating from "@/components/atoms/ratings/Rating";
import useResponsive from "@/hooks/useResponsive";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./reviewForm.module.scss";

interface ReviewFormProps {
  open: boolean;
  handleClose: () => void;
  handleAction: (data: any) => void;
}

type FormFields = {
  review: number;
  comment: string;
  images: FileList;
};

const ReviewForm: React.FC<ReviewFormProps> = ({
  open,
  handleClose,
  handleAction,
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormFields>();

  const { downMdScreen } = useResponsive();

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

  const handleCloseDialog = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") {
      return;
    }
    handleClose();
  };

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    try {
      await handleAction({ ...data, images: selectedImages });
      reset({
        comment: "",
        review: 0,
      });
    } catch (error) {
      console.error("Error in handleAction", error);
    }
  };

  return (
    <Dialog
      className={`${styles.dialog} review`}
      open={open}
      onClose={handleCloseDialog}
    >
      <Box className={styles.dialog__box}>
        <Box className={styles.dialog__action}>
          <CloseIcon
            className={styles.dialog__closeIcon}
            onClick={handleClose}
          />
        </Box>
        <Box className={styles.dialog__contentWrapper}>
          <Box className={styles.dialog__content}>
            <Box className={styles.dialog__ratingSection}>
              <Typography className={styles.dialog__ratingText}>
                Your rating *
              </Typography>
              <Typography className={styles.dialog__ratingInfoText}>
                1 star for a poor experience. 5 stars for a very good
                experience.
              </Typography>
              <Box sx={{ padding: "20px 0px" }}>
                <Controller
                  name="review"
                  control={control}
                  defaultValue={0}
                  rules={{
                    required: "Rating is required",
                    validate: (value) =>
                      (value >= 1 && value <= 5) ||
                      "কিরে ব্যাটা রেটিং দিতে ভুলে গেছিস",
                  }}
                  render={({ field }) => (
                    <Rating
                      value={field.value}
                      onChange={(_, value) => field.onChange(value)}
                      fontSize={
                        downMdScreen ? "1.5rem!important" : "2.5rem!important"
                      }
                      customStyle={{ justifyContent: "center" }}
                    />
                  )}
                />
                {errors.review && (
                  <Typography className={styles.dialog__errorMsg}>
                    {errors.review.message}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box className={styles.dialog__commentSection}>
              <Typography className={styles.dialog__reviewText}>
                Your review *
              </Typography>
              <Typography className={styles.dialog__reviewInfoText}>
                Help other shoppers make an informed purchase decision. Please
                write only about your personal experience.
              </Typography>
              <Box className={styles.dialog__formFields}>
                <Box
                  component="textarea"
                  placeholder="Type your experience"
                  {...register("comment", {
                    required: "তোর মূল্যবান মতামত দে",
                  })}
                  className={styles.dialog__textArea}
                />
                {errors.comment && (
                  <Typography className={styles.dialog__errorMsg}>
                    {errors.comment.message}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box className={styles.dialog__imageSection}>
              <Typography className={styles.dialog__imageText}>
                Upload Images *
              </Typography>
              <input
                type="file"
                multiple
                accept="image/*"
                {...register("images", {
                  validate: {
                    required: (value) =>
                      (value && value.length > 0) || "ইমেজ তো তোকে দিতেই হবে",
                    maxLength: (value) =>
                      (value && value.length <= 4) ||
                      "You can only upload up to 4 images",
                  },
                })}
                onChange={handleImageChange}
              />
              {errors.images && (
                <Typography className={styles.dialog__errorMsg}>
                  {errors.images.message}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box className={styles.dialog__buttons}>
          <Button
            sx={{
              padding: "6px 20px!important",
              backgroundColor: "#ea4b48!important",
              marginRight: "4px",
            }}
            onClick={handleClose}
            text="Cancel"
          />
          <Button
            sx={{ padding: "6px 20px!important" }}
            onClick={handleSubmit(onSubmit)}
            text="Submit"
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default ReviewForm;
