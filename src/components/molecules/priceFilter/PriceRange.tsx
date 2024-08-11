"use client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import styles from "./priceRange.module.scss";

interface PriceFilterProps {
  price: number[];
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
}
const PriceRange: React.FC<PriceFilterProps> = ({ price, setPrice }) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  return (
    <>
      <Box className={styles.priceRange}>
        <Slider
          getAriaLabel={() => "price range"}
          value={price}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={0} // Set the minimum value of the range
          max={2000} // Set the maximum value of the range
          step={1} // Set the step value for the slider
        />
      </Box>
      <Typography className={styles.priceRange__priceText}>
        Price:{" "}
        <Typography
          className={styles.priceRange__priceNumber}
          component={"span"}
        >
          {price[0]} - {price[1]}
        </Typography>
      </Typography>
    </>
  );
};

export default PriceRange;
