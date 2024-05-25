import Quantity from "@/components/molecules/addQuantity/Quantity";
import DeleteAlert from "@/components/molecules/deleteAlert/DeleteAlert";
import { removeToCart } from "@/store/feature/cart/CartSlice";
import { addToWishList } from "@/store/feature/wishlist/WishlistSlice";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import styles from "./shoppingCart.module.scss";
interface ShoppingCartRowsProps {
  id: number;
  imgSrc: string;
  productName: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  isServiceAvailable: boolean;
  altText?: string;
  updateQuantity: (
    quantity: number,
    type?: string,
    id?: number | string,
    price?: number
  ) => void;
  calculateTotalPrice: (price: number, quantity: number) => number;
  handleDeleteCart: (id: number | string) => void;
}
const ShoppingCartRows: React.FC<ShoppingCartRowsProps> = ({
  imgSrc,
  productName,
  price,
  id,
  quantity,
  isServiceAvailable,
  altText,
  discountPrice,
  updateQuantity,
  calculateTotalPrice,
  handleDeleteCart,
}) => {
  const totalPrice = calculateTotalPrice(
    discountPrice ? discountPrice : price,
    quantity
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const productPrice = discountPrice ? discountPrice : price;
  console.log("DIs", discountPrice);
  console.log("Price", price);
  console.log("ProductPrice", productPrice);

  const handleRemoveWishlist = () => {
    dispatch(
      addToWishList({
        productId: id,
        imgSrc: imgSrc,
        isServiceAvailable: isServiceAvailable,
        price: price,
        discountPrice: discountPrice,
        title: productName,
        altText: altText,
      })
    );
    dispatch(
      removeToCart({
        productId: id,
      })
    );
    toast.success("Move to Wishlist");
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <TableRow className={styles.shoppingCart__tableRow}>
      <Link href={`/products/${id}`}>
        <TableCell
          className={styles.shoppingCart__productImages}
          component="th"
          scope="row"
          sx={{ paddingRight: "0px", borderBottom: "none" }}
        >
          <Image
            width={100}
            height={100}
            src={imgSrc}
            alt="cart image"
            className={styles.shoppingCart__productImage}
          />
          <Typography className={styles.shoppingCart__productName}>
            {productName}
          </Typography>
        </TableCell>
      </Link>

      <TableCell className={styles.shoppingCart__tableCell}>
        <Typography className={styles.shoppingCart__price}>
          <Image
            width={40}
            height={40}
            src={"/icons/taka.png"}
            alt="Taka Logo"
            className={styles.shoppingCart__currencyIcon}
          />
          {productPrice}
        </Typography>
      </TableCell>
      <TableCell className={styles.shoppingCart__tableCell}>
        <Box>
          <Quantity
            updateQuantity={updateQuantity}
            productId={id}
            quantityValue={quantity}
            mediumScreen
            sx={{ width: "114px!important" }}
          />
        </Box>
      </TableCell>
      <TableCell className={styles.shoppingCart__tableCell}>
        <Typography className={styles.shoppingCart__price}>
          <Image
            width={40}
            height={40}
            src={"/icons/taka.png"}
            alt="Taka Logo"
            className={styles.shoppingCart__currencyIcon}
          />
          {totalPrice}
        </Typography>
      </TableCell>
      <TableCell className={styles.shoppingCart__tableCell}>
        <Tooltip className={styles.tooltip} title="Delete Cart" arrow>
          <IconButton onClick={() => handleDeleteCart(id)}>
            <DeleteForeverSharpIcon />
          </IconButton>
        </Tooltip>

        <Tooltip className={styles.tooltip} title="Move to Wishlist" arrow>
          <IconButton onClick={handleOpen}>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
      <DeleteAlert
        handleAction={handleRemoveWishlist}
        message={"Do you want to move it wishlist?"}
        btnTextClose="Close"
        btnTextAction="Move"
        open={open}
        handleClose={handleOpen}
      />
    </TableRow>
  );
};

export default ShoppingCartRows;
