"use client";
import ToasterMsg from "@/components/atoms/toastMsg/Toaster";
import Avatar from "@/components/molecules/avatar/Avatar";
import ShoppingCartDialog from "@/components/organisms/shoppingCartDialog/ShoppingCartDialog";
import useResponsive from "@/hooks/useResponsive";
import { RootState } from "@/store/store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import styles from "./navbarIcon.module.scss";
const NavbarIcon: React.FC = () => {
  const { downSmScreen } = useResponsive();
  const router = useRouter();
  const { auth, cart, wishlist } = useSelector((state: RootState) => state);
  const [open, setOpen] = useState(false);

  const isAuthenticated = auth.isAuthenticated;

  const wishlistItemsTotal = wishlist.items.reduce((acc, seller) => {
    acc += seller.products.length;
    return acc;
  }, 0);

  const cartsTotal = cart.items.reduce((acc, seller) => {
    acc += seller.products.length;
    return acc;
  }, 0);

  const handleWishlist = () => {
    if (isAuthenticated) {
      router.push("/wishlist");
    } else {
      toast.error("You have to login first to see your wishlist");
    }
  };

  const handleShoppingCartOpen = () => {
    if (isAuthenticated) {
      setOpen(!open);
    } else {
      toast.error("You have to login first to see your cart");
    }
  };

  return (
    <Box
      className={`${downSmScreen && styles.navbarIcon}`}
      sx={{ display: "flex", alignItems: "center" }}
    >
      {/* WishList Icon ================== */}
      <Tooltip className={styles.tooltip} arrow title="Wishlist">
        <IconButton
          onClick={handleWishlist}
          size="large"
          aria-label={
            isAuthenticated
              ? `You have ${wishlistItemsTotal} wishlist items`
              : `Please login first to see you wishlist`
          }
          color="inherit"
          sx={{
            marginRight: "20px",
            padding: "6px",
            "&:hover": { backgroundColor: "#e6e6e6" },
          }}
        >
          <Badge
            badgeContent={isAuthenticated ? wishlistItemsTotal : 0}
            color="success"
          >
            <FavoriteBorderIcon sx={{ color: "#1a1a1a" }} />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Shopping Cart Icon =================== */}
      <Tooltip
        onClick={handleShoppingCartOpen}
        className={styles.tooltip}
        title="Cart Item"
        arrow
      >
        <IconButton
          size="large"
          aria-label={
            isAuthenticated
              ? `You have ${cartsTotal} cart items`
              : `Please login first to see your cart items`
          }
          color="inherit"
          sx={{
            marginRight: "20px",
            padding: "6px",
            "&:hover": { backgroundColor: "#e6e6e6" },
          }}
        >
          <Badge
            badgeContent={isAuthenticated ? cartsTotal : 0}
            color="success"
            sx={{}}
          >
            <ShoppingCartOutlinedIcon sx={{ color: "#1a1a1a" }} />
          </Badge>
        </IconButton>
      </Tooltip>

      <ShoppingCartDialog open={open} handleClose={handleShoppingCartOpen} />

      {/* Login Button ================= */}
      {isAuthenticated ? (
        <Avatar />
      ) : (
        <Link href={"/login"}>
          <Button
            sx={{
              backgroundColor: "#00b207",
              fontSize: { xs: ".7rem", sm: ".8rem", md: ".9rem" },
              textTransform: "none",
              "&:hover": { backgroundColor: "#2c742f" },
            }}
            variant="contained"
          >
            <PersonIcon sx={{ fontSize: "1.2rem" }} />
            Login
          </Button>
        </Link>
      )}
      <ToasterMsg />
    </Box>
  );
};

export default NavbarIcon;
