import Button from "@/components/atoms/button/Button";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./paymentMethodDialog.module.scss";

interface PaymentMethodProps {
  open: boolean;
  cashOnDelivery: boolean;
  loading: boolean;
  handleOpen: () => void;
  handleCashOnDelivery: (value: boolean) => void;
  handleOtherPayment: () => void;
  handleOrderSubmit: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  open,
  handleOpen,
  handleCashOnDelivery,
  handleOtherPayment,
  handleOrderSubmit,
  cashOnDelivery,
  loading,
}) => {
  const handleCloseDialog = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") {
      // Ignore backdrop click events
      return;
    }
    handleOpen();
  };

  const closePaymentDialog = () => {
    handleCashOnDelivery(false);
    handleOpen();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        className={`${styles.cart} paymentOption`}
      >
        <DialogContent>
          <Box className={styles.cart__header}>
            <Box>
              <Typography component={"h2"} className={styles.cart__title}>
                How do you want to pay?
              </Typography>
              <Typography className={styles.cart__description}>
                Preferred method with secure transactions.
              </Typography>
            </Box>
            <IconButton
              aria-label="close"
              onClick={closePaymentDialog}
              className={styles.cart__crossIcon}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className={styles.cart__body}>
            <Box
              onClick={() => handleCashOnDelivery(true)}
              className={`${styles.cart__item} ${
                cashOnDelivery && styles.cart__cashOnDelivery
              }`}
            >
              <Image
                className={styles.cart__img}
                width={80}
                height={80}
                src={"/icons/cod.png"}
                alt={"Cash-on-delivery"}
              />
              <Typography className={styles.cart__cashText}>
                Cash On Delivery
              </Typography>
              {cashOnDelivery && (
                <CheckCircleOutlineSharpIcon
                  className={styles.cart__checkIcon}
                />
              )}
            </Box>
            <Box onClick={handleOtherPayment} className={styles.cart__item}>
              <Image
                width={40}
                height={40}
                src={"/icons/taka.png"}
                alt="Taka Logo"
                className={styles.cart__currencyIcon}
              />
              <Typography className={styles.cart__cashText}>Others</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className={styles.cart__action}>
          <Button
            disabled={loading}
            onClick={handleOrderSubmit}
            sx={{ width: "100%" }}
            text="Submit"
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentMethod;
