"use client";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import styles from "./quantity.module.scss";

interface quantityProps {
  mediumScreen?: boolean;
  smallScreen?: boolean;
}

const Quantity: React.FC<quantityProps> = ({ mediumScreen, smallScreen }) => {
  const [value, setValue] = useState<number>(1);
  const handleIncrementValue = () => {
    setValue(value + 1);
  };
  const handleDecrementValue = () => {
    setValue(value - 1);
  };

  return (
    <>
      <Stack
        className={`${styles.quantity} ${
          mediumScreen && styles.quantity__mediumScreen
        } ${smallScreen && styles.quantity__smallScreen}`}
      >
        {/* Decrement Button */}
        <IconButton
          className={styles.quantity__btn}
          onClick={handleDecrementValue}
          disabled={value <= 0}
        >
          <RemoveIcon className={styles.quantity__icon} />
        </IconButton>

        {/* Value */}
        <Typography className={styles.quantity__value}>{value}</Typography>

        {/* Increment Button */}
        <IconButton
          className={styles.quantity__btn}
          onClick={handleIncrementValue}
        >
          <AddIcon className={styles.quantity__icon} />
        </IconButton>
      </Stack>
    </>
  );
};

export default Quantity;
