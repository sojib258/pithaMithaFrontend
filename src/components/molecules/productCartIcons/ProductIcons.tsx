import {
  addToCart,
  handleAlreadyExistInCart,
} from "@/store/feature/cart/CartSlice";
import {
  addToWishList,
  removeWishlist,
} from "@/store/feature/wishlist/WishlistSlice";
import { RootState } from "@/store/store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import styles from "./productIcons.module.scss";

interface productIconProps {
  id: string | number;
  title: string;
  imgSrc: string;
  price: number;
  discountPrice?: number;
  altText?: string;
  isServiceAvailable: boolean;
  handleOpen: () => void;
}

const ProductIcon: React.FC<productIconProps> = ({
  handleOpen,
  id,
  title,
  imgSrc,
  altText,
  price,
  discountPrice,
  isServiceAvailable,
}) => {
  const { auth, cart, wishlist } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isAuthenticated = auth.isAuthenticated;
  const carts = cart.items;
  const wishlists = wishlist.items;

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const toastId = toast.loading("Adding to Cart...");
      setLoading(true);
      const checkProductAlreadyExist = carts.findIndex(
        (item: any) => item.productId === id
      );

      if (checkProductAlreadyExist === -1) {
        dispatch(
          addToCart({
            productId: id,
            title: title,
            imgSrc: imgSrc,
            altText: altText,
            quantity: 1,
            price: price,
            isServiceAvailable: isServiceAvailable,
            discountPrice: discountPrice,
          })
        );
        toast.success("Added Successful", {
          id: toastId,
        });
        setLoading(false);
      } else {
        dispatch(
          handleAlreadyExistInCart({
            productId: id,
            quantity: 1,
          })
        );
        toast.success("Added Successful", {
          id: toastId,
        });
        setLoading(false);
      }
    } else {
      toast.error("You have to login first for adding to cart");
      router.push("/login");
    }
  };

  const existInWishlist = wishlists.findIndex(
    (item: any) => item.productId === id
  );
  const handleAddToWishlist = () => {
    if (isAuthenticated) {
      const toastId = toast.loading("Adding to Wishlist...");
      setLoading(true);

      if (existInWishlist === -1) {
        dispatch(
          addToWishList({
            productId: id,
            imgSrc: imgSrc,
            price: price,
            discountPrice: discountPrice,
            altText: altText,
            isServiceAvailable: isServiceAvailable,
            title: title,
          })
        );
        toast.success("Added to Wishlist", {
          id: toastId,
        });
        setLoading(false);
      } else {
        dispatch(
          removeWishlist({
            productId: id,
          })
        );
        toast.success("Remove from Wishlist", {
          id: toastId,
        });
        setLoading(false);
      }
    } else {
      toast.error("You have to login first for adding to cart");
      router.push("/login");
      return;
    }
  };
  return (
    <Box className={styles.productIcons}>
      {/* Quick View Icon ================== */}
      <Tooltip className={styles.tooltip} arrow title="Quick View">
        <IconButton
          onClick={handleOpen}
          className={styles.productIcons__quickViewIcon}
        >
          <VisibilityOutlinedIcon className={styles.productCart__icon} />
        </IconButton>
      </Tooltip>

      {/* WishList Icon ================== */}
      {existInWishlist === -1 ? (
        <Tooltip className={styles.tooltip} arrow title="Add Wishlist">
          <IconButton
            onClick={handleAddToWishlist}
            className={styles.productIcons__whilistIcon}
          >
            <FavoriteBorderIcon className={styles.productCart__icon} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip className={styles.tooltip} arrow title="Remove Wishlist">
          <IconButton
            onClick={handleAddToWishlist}
            className={styles.productIcons__whilistIconActive}
          >
            <FavoriteOutlinedIcon className={styles.productCart__iconActive} />
          </IconButton>
        </Tooltip>
      )}

      {/* Shopping Cart Icon =================== */}
      <Tooltip className={styles.tooltip} title="Add to Cart" arrow>
        <IconButton
          onClick={handleAddToCart}
          className={styles.productIcons__cartIcon}
        >
          <ShoppingCartOutlinedIcon className={styles.productCart__icon} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ProductIcon;
