"use client";
import { ImageData, Seller, Tag } from "@/utils/typesDefine/productSliceTypes";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import ProductDetails from "./ProductDetails";
import styles from "./quickView.module.scss";

interface quickViewProps {
  id: number;
  discountPrice?: number;
  open: boolean;
  handleClose: () => void;
  price: number;
  productTitle: string;
  shortDescription?: string;
  ratingValue?: number;
  category?: string;
  tags?: Tag[];
  images: ImageData[];
  isServiceAvailable: boolean;
  seller: Seller;
  weight: string;
}

const QuickViewDialog: React.FC<quickViewProps> = ({
  id,
  price,
  productTitle,
  shortDescription,
  ratingValue,
  category,
  discountPrice,
  open,
  images,
  isServiceAvailable,
  seller,
  weight,
  tags,
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
              shortDescription={shortDescription}
              ratingValue={ratingValue}
              category={category}
              tags={tags}
              discountPrice={discountPrice}
              images={images}
              isServiceAvailable={isServiceAvailable}
              weight={weight}
              seller={seller}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickViewDialog;
