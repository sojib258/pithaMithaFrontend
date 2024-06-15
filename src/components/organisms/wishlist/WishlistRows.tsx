import Button from "@/components/atoms/button/Button";
import Stock from "@/components/atoms/stockStatus/Stock";
import ToasterMsg from "@/components/atoms/toastMsg/Toaster";
import { addToCart } from "@/store/feature/cart/CartSlice";
import {
  removeWishlist,
  toggleWishList,
} from "@/store/feature/wishlist/WishlistSlice";
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
  id: number;
  imgSrc: string;
  name: string;
  price: number;
  discountPrice?: number;
  isServiceAvailable: boolean;
  altText?: string;
  sellerId: number;
  firstName: string;
  lastName?: string;
  sellerImg?: string;
  responseTime?: number;
  averageResponseTime?: number;
}

const WishlistRows: React.FC<WishlistRowsProps> = ({
  imgSrc,
  price,
  name,
  discountPrice,
  isServiceAvailable,
  id,
  altText,
  sellerId,
  firstName,
  lastName,
  sellerImg,
  responseTime,
  averageResponseTime,
}) => {
  const { cart } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const cartItems = cart.items;

  const handleDeleteWishlist = () => {
    dispatch(
      toggleWishList({
        sellerId: sellerId,
        sellerImg: sellerImg,
        firstName: firstName,
        lastName: lastName,
        averageResponseTime: averageResponseTime,
        product: {
          productId: id,
          imgSrc: imgSrc,
          isServiceAvailable: isServiceAvailable,
          price: price,
          discountPrice: discountPrice,
          quantity: 1,
          title: name,
          altText: altText,
        },
      })
    );
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        sellerId: sellerId,
        sellerImg: sellerImg,
        firstName: firstName,
        lastName: lastName,
        responseTime: responseTime,
        averageResponseTime: averageResponseTime,
        product: {
          productId: id,
          imgSrc: imgSrc,
          isServiceAvailable: isServiceAvailable,
          price: price,
          discountPrice: discountPrice,
          quantity: 1,
          title: name,
          altText: altText,
        },
      })
    );
    toast.success("Added to Cart");

    dispatch(
      removeWishlist({
        productId: id,
        sellerId: sellerId,
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
            {name}
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
