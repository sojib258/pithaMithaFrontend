import Button from "@/components/atoms/button/Button";
import Stock from "@/components/atoms/stockStatus/Stock";
import ToasterMsg from "@/components/atoms/toastMsg/Toaster";
import {
  addToCart,
  handleAlreadyExistInCart,
} from "@/store/feature/cart/CartSlice";
import { removeWishlist } from "@/store/feature/wishlist/WishlistSlice";
import { RootState } from "@/store/store";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import styles from "./wishlist.module.scss";

interface WishlistRowsProps {
  id: string | number;
  imgSrc: string;
  productName: string;
  price: number;
  discountPrice?: number;
  isServiceAvailable: boolean;
  altText?: string;
}

const WishlistRows: React.FC<WishlistRowsProps> = ({
  imgSrc,
  price,
  productName,
  discountPrice,
  isServiceAvailable,
  id,
  altText,
}) => {
  const { cart } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const cartItems = cart.items;

  const handleDeleteWishlist = () => {
    dispatch(
      removeWishlist({
        productId: id,
      })
    );
  };

  const handleAddToCart = () => {
    const checkProductAlreadyExist = cartItems.findIndex(
      (item: any) => item.productId === id
    );

    if (checkProductAlreadyExist === -1) {
      dispatch(
        addToCart({
          productId: id,
          title: productName,
          imgSrc: imgSrc,
          altText: altText,
          quantity: 1,
          price: price,
          discountPrice: discountPrice,
          isServiceAvailable: isServiceAvailable,
        })
      );
      toast.success("Added to Cart");
    } else {
      dispatch(
        handleAlreadyExistInCart({
          productId: id,
          quantity: 1,
        })
      );
      toast.success("Added to Cart");
    }
    dispatch(
      removeWishlist({
        productId: id,
      })
    );
  };

  return (
    <TableRow className={styles.wishList__tableRow}>
      <Link href={`/products/${id}`}>
        <TableCell
          className={styles.wishList__productImages}
          component="th"
          scope="row"
          sx={{ paddingRight: "0px", borderBottom: "none" }}
        >
          <Image
            width={100}
            height={100}
            src={imgSrc}
            alt="wishlist image"
            className={styles.wishList__productImage}
          />
          <Typography className={styles.wishList__productName}>
            {productName}
          </Typography>
        </TableCell>
      </Link>

      <TableCell className={styles.wishList__tableCell}>
        {discountPrice ? (
          <Box sx={{ display: "flex" }}>
            <Typography className={styles.wishList__discountPrice}>
              <Image
                width={40}
                height={40}
                src={"/icons/taka.png"}
                alt="Taka Logo"
                className={styles.wishList__currencyIcon}
              />
              {discountPrice}
            </Typography>
            <Typography
              component={"span"}
              className={styles.wishList__priceCondition}
            >
              {price}
            </Typography>
          </Box>
        ) : (
          <Typography className={styles.wishList__price}>
            <Image
              width={40}
              height={40}
              src={"/icons/taka.png"}
              alt="Taka Logo"
              className={styles.wishList__currencyIcon}
            />
            {price}
          </Typography>
        )}
      </TableCell>
      <TableCell className={styles.wishList__tableCell}>
        <Stock isServiceAvailable={isServiceAvailable} />
      </TableCell>
      <TableCell className={styles.wishList__tableCell}>
        <Button
          sx={{
            padding: "6px 12px!important",
            fontSize: "12px!important",
          }}
          text="Add to Cart"
          disabled={!isServiceAvailable}
          onClick={handleAddToCart}
        />
      </TableCell>
      <TableCell className={styles.wishList__tableCell}>
        <IconButton onClick={handleDeleteWishlist}>
          <DeleteForeverSharpIcon />
        </IconButton>
      </TableCell>
      <ToasterMsg />
    </TableRow>
  );
};

export default WishlistRows;
