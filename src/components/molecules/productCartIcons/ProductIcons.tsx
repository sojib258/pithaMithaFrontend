import { addToCart } from "@/store/feature/cart/CartSlice";
import { toggleWishList } from "@/store/feature/wishlist/WishlistSlice";
import { RootState } from "@/store/store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { ProductData } from "@/utils/typesDefine/cartSliceTypes";
import { Seller } from "@/utils/typesDefine/productSliceTypes";
import styles from "./productIcons.module.scss";

interface productIconProps {
  id: number;
  name: string;
  imgSrc: string;
  price: number;
  discountPrice?: number;
  altText?: string;
  isServiceAvailable: boolean;
  seller: Seller;
  handleOpen: () => void;
}

const ProductIcon: React.FC<productIconProps> = ({
  handleOpen,
  id,
  name,
  imgSrc,
  altText,
  price,
  discountPrice,
  isServiceAvailable,
  seller,
}) => {
  const { auth, wishlist } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  const { firstName, lastName, averageResponseTime, responseTime, image } =
    seller.attributes;
  const isAuthenticated = auth.isAuthenticated;

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const toastId = toast.loading("Adding to Cart...");

      dispatch(
        addToCart({
          sellerId: seller.id,
          sellerImg: image?.attributes?.url,
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
      toast.success("Added Successful", {
        id: toastId,
      });
    } else {
      toast.error("You have to login first for adding to cart");
      router.push("/login");
    }
  };

  const allProducts = wishlist.items.reduce((acc: ProductData[], seller) => {
    return acc.concat(seller.products);
  }, []);

  const existInWishlist = allProducts.findIndex(
    (item: any) => item.productId === id
  );

  const handleAddToWishlist = () => {
    if (isAuthenticated) {
      dispatch(
        toggleWishList({
          sellerId: seller.id,
          sellerImg: image?.attributes?.url,
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
