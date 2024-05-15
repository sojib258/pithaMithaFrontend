import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./sslPaymentList.module.scss";

type paymentData = {
  desc: [];
  gw: {};
};

interface SSLPaymentListProps {
  open: boolean;
  handleOpen: () => void;
  paymentData: paymentData;
}

const SSLPaymentList: React.FC<SSLPaymentListProps> = ({
  open,
  handleOpen,
  paymentData,
}) => {
  const [activeBtn, setActiveBtn] = useState("mobilebanking");

  const handleBtnClick = (value: string) => {
    setActiveBtn(value);
  };

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

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        className={`${styles.cart} sslPaymentOption`}
      >
        <DialogContent>
          <Box className={styles.cart__header}>
            <Box>
              <Typography component={"h2"} className={styles.cart__title}>
                Select your payment method
              </Typography>
              <Typography className={styles.cart__description}>
                Preferred method with secure transactions.
              </Typography>
            </Box>
            <IconButton
              aria-label="close"
              onClick={handleOpen}
              className={styles.cart__crossIcon}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className={styles.cart__body}>
            <Box className={styles.cart__paymentOptions}>
              <Button
                className={`${styles.cart__optionBtn} ${
                  activeBtn === "mobilebanking" ? styles.active : ""
                }`}
                onClick={() => handleBtnClick("mobilebanking")}
              >
                Mobile Banking
              </Button>
              <Button
                className={`${styles.cart__optionBtn} ${
                  activeBtn === "master" ? styles.active : ""
                }`}
                onClick={() => handleBtnClick("master")}
              >
                Master
              </Button>
              <Button
                className={`${styles.cart__optionBtn} ${
                  activeBtn === "visa" ? styles.active : ""
                }`}
                onClick={() => handleBtnClick("visa")}
              >
                Visa
              </Button>
              <Button
                className={`${styles.cart__optionBtn} ${
                  activeBtn === "internetbanking" ? styles.active : ""
                }`}
                onClick={() => handleBtnClick("internetbanking")}
              >
                Internet
              </Button>
              <Button
                className={`${styles.cart__optionBtn} ${
                  activeBtn === "amex" ? styles.active : ""
                }`}
                onClick={() => handleBtnClick("amex")}
              >
                Amex
              </Button>
            </Box>
            <Box className={styles.cart__paymentList}>
              {paymentData.desc.map(
                (item: any, index) =>
                  item.type === activeBtn && (
                    <Link key={index} href={item.redirectGatewayURL}>
                      <Image
                        className={styles.cart__paymentLogoImg}
                        width={100}
                        height={100}
                        src={item.logo}
                        alt="Logo Image"
                      />
                    </Link>
                  )
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className={styles.cart__action}></DialogActions>
      </Dialog>
    </>
  );
};

export default SSLPaymentList;
