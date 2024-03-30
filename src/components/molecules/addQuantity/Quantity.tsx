"use client";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import styles from "./quantity.module.scss";

interface quantityProps {
  id: string | number;
  mediumScreen?: boolean;
  smallScreen?: boolean;
  quantityValue: number;
  updateQuantity: (id: string | number, quantity: number) => void;
  sx?: object;
  iconSx?: object;
}

const Quantity: React.FC<quantityProps> = ({
  id,
  mediumScreen,
  smallScreen,
  quantityValue,
  updateQuantity,
  sx,
  iconSx,
}) => {
  const handleIncrementValue = () => {
    updateQuantity(id, quantityValue + 1);
  };
  const handleDecrementValue = () => {
    updateQuantity(id, quantityValue - 1);
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
          disabled={quantityValue <= 0}
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
