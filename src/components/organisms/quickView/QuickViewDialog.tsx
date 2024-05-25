"use client";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import ProductDetails from "./ProductDetails";
import styles from "./quickView.module.scss";
interface Image {
  id: number;
  width: number;
  height: number;
  url: string;
  alternativeText?: string | undefined;
}

interface quickViewProps {
  id: number;
  discountPrice?: number;
  open: boolean;
  handleClose: () => void;
  price: number;
  productTitle: string;
  description?: string;
  ratingValue?: number;
  category?: string;
  images: Image[];
  isServiceAvailable: boolean;
}

const QuickViewDialog: React.FC<quickViewProps> = ({
  id,
  price,
  productTitle,
  description,
  ratingValue,
  category,
  discountPrice,
  open,
  images,
  isServiceAvailable,
  handleClose,
}) => {
  return (
    <>
      <Dialog className={"quickViewDialog"} onClose={handleClose} open={open}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className={styles.quickView__crossIcon}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box>
            <ProductDetails
              id={id}
              price={price}
              productTitle={productTitle}
              description={description}
              ratingValue={ratingValue}
              category={category}
              discountPrice={discountPrice}
              images={images}
              isServiceAvailable={isServiceAvailable}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickViewDialog;
