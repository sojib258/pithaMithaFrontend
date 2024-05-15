import Button from "@/components/atoms/button/Button";
import { removeToCart } from "@/store/feature/cart/CartSlice";
import { RootState } from "@/store/store";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import styles from "./shoppingCartDialog.module.scss";
interface ShoppingCartDialogProps {
  open: boolean;
  handleClose: () => void;
}

const ShoppingCartDialog: React.FC<ShoppingCartDialogProps> = ({
  open = true,
  handleClose,
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();
  const dispatch = useDispatch();

  const cartTotalItem = cartItems.length;

  const subTotal = cartItems.reduce((acc, cur) => {
    const priceToUse = cur.discountPrice ? cur.discountPrice : cur.price;
    const totalPrice = priceToUse * cur.quantity;
    acc += totalPrice;

    return acc;
  }, 0);

  const handleCheckoutBtn = () => {
    handleClose();
    router.push("/shopping-cart/checkout");
  };

  const handleCartBtn = () => {
    handleClose();
    router.push("/shopping-cart");
  };

  const handleRemoveCart = (id: string | number) => {
    dispatch(
      removeToCart({
        productId: id,
      })
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={`${styles.cart} shoppingCart`}
    >
      <Box className={styles.cart__header}>
        <Typography className={styles.cart__heading}>
          {`Shopping Card (${cartTotalItem})`}
        </Typography>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon sx={{ color: "#1a1a1a" }} />
        </IconButton>
      </Box>
      <DialogContent className={styles.cart__body}>
        {cartItems.map((item) => (
          <Box className={styles.cart__item} key={item.productId}>
            <Box className={styles.cart__details}>
              <Image
                width={80}
                height={80}
                src={item.imgSrc}
                alt={item.altText ? item.altText : "cart image"}
                className={styles.cart__img}
              />
              <Typography className={styles.cart__title}>
                {item.title}
                <Typography className={styles.cart__price}>
                  <Image
                    width={40}
                    height={40}
                    src={"/icons/taka.png"}
                    alt="Taka Logo"
                    className={styles.cart__currencyIcon}
                  />
                  {item.discountPrice ? item.discountPrice : item.price}
                  <Typography
                    className={styles.cart__quantity}
                    component={"span"}
                  >
                    QTY: {item.quantity}
                  </Typography>
                </Typography>
              </Typography>
            </Box>

            <IconButton
              sx={{ padding: "2px" }}
              className={styles.cart__deleteIcon}
              aria-label="delete"
              onClick={() => handleRemoveCart(item.productId)}
            >
              <CloseIcon sx={{ color: "#1a1a1a" }} />
            </IconButton>
          </Box>
        ))}
      </DialogContent>
      <DialogActions className={styles.cart__action}>
        <Box className={styles.cart__priceSection}>
          <Typography className={styles.cart__priceTitle}>
            {cartTotalItem} Products
          </Typography>
          <Typography className={styles.cart__price}>
            <Image
              width={40}
              height={40}
              src={"/icons/taka.png"}
              alt="Taka Logo"
              className={styles.cart__currencyIcon}
            />
            {subTotal}
          </Typography>
        </Box>
        <Box mb={1} sx={{ width: "100%" }}>
          <Button
            sx={{ width: "100%" }}
            disabled={cartTotalItem <= 0}
            text="Checkout"
            onClick={handleCheckoutBtn}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Button
            sx={{
              width: "100%",
              backgroundColor: "#dae5da!important",
              color: "#00b207!important",
              boxShadow: "none!important",
              "&:hover": {
                backgroundColor: "#00b207!important",
                color: "#fff!important",
              },
            }}
            text="Go To Cart"
            onClick={handleCartBtn}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ShoppingCartDialog;
