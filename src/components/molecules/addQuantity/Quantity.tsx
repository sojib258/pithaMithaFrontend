"use client";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import styles from "./quantity.module.scss";

interface quantityProps {
  mediumScreen?: boolean;
  smallScreen?: boolean;
  quantityValue: number;
  productId?: number | string;
  updateQuantity: (
    quantity: number,
    type?: string,
    productId?: number | string,
    price?: number
  ) => void;
  sx?: object;
  iconSx?: object;
}

const Quantity: React.FC<quantityProps> = ({
  mediumScreen,
  smallScreen,
  quantityValue,
  updateQuantity,
  productId,
  sx,
  iconSx,
}) => {
  const handleIncrementValue = () => {
    // productId and price need to update from carts
    updateQuantity(quantityValue + 1, "increment", productId);
  };
  const handleDecrementValue = () => {
    // productId and price need to update from carts
    updateQuantity(quantityValue - 1, "decrement", productId);
  };

  return (
    <>
      <Stack
        className={`${styles.quantity} ${
          mediumScreen && styles.quantity__mediumScreen
        } ${smallScreen && styles.quantity__smallScreen}`}
        sx={sx}
      >
        {/* Decrement Button */}
        <IconButton
          className={styles.quantity__btn}
          onClick={handleDecrementValue}
          disabled={quantityValue <= 1}
          sx={iconSx}
        >
          <RemoveIcon className={styles.quantity__icon} />
        </IconButton>

        {/* Value */}
        <Typography className={styles.quantity__value}>
          {quantityValue}
        </Typography>

        {/* Increment Button */}
        <IconButton
          className={styles.quantity__btn}
          onClick={handleIncrementValue}
          sx={iconSx}
        >
          <AddIcon className={styles.quantity__icon} />
        </IconButton>
      </Stack>
    </>
  );
};

export default Quantity;
