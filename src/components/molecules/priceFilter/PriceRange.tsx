"use client";
import FilterAccordion from "@/components/molecules/filterAccordion/FilterAccordion";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import styles from "./priceRange.module.scss";

const PriceRange = () => {
  const [value, setValue] = useState<number[]>([0, 2000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <FilterAccordion title="Price">
      <Box className={styles.priceRange} sx={{ width: "100%" }}>
        <Slider
          getAriaLabel={() => "price range"}
          value={value}
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
          {value[0]} - {value[1]}
        </Typography>
      </Typography>
    </FilterAccordion>
  );
};

export default PriceRange;
