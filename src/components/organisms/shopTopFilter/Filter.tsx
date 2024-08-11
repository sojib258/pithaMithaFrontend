"use client";
import SelectBox from "@/components/atoms/selectBox/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./filter.module.scss";

interface FilterProps {
  selectBoxValue: string[];
  selectValue: string | number;
  handleSelectValue: (value: string | number) => void;
  resultFound: number;
  resetFilter?: () => void;
}

const Filter: React.FC<FilterProps> = ({
  selectBoxValue,
  selectValue,
  handleSelectValue,
  resultFound,
  resetFilter,
}) => {
  return (
    <Box className={styles.filter}>
      <Box className={styles.filter__BtnArea}>
        <Button onClick={resetFilter} className={styles.filter__Btn}>
          Reset
          <Image
            className={styles.filter__BtnIcon}
            width={22}
            height={19}
            alt="filterIcon"
            src={"/icons/filterIcon.svg"}
          />
        </Button>
      </Box>
      <Box className={styles.filter__RightArea}>
        <Box className={styles.filter__selectArea}>
          <Typography className={styles.filter__sortByText}>
            Sort by:
          </Typography>
          <SelectBox
            options={selectBoxValue}
            value={selectValue}
            handleSelectValue={handleSelectValue}
            label="Filter"
          />
        </Box>
        <Typography className={styles.filter__resultFoundText}>
          <Typography
            className={styles.filter__resultFoundCount}
            component={"span"}
          >
            {resultFound}{" "}
          </Typography>
          Result found
        </Typography>
      </Box>
    </Box>
  );
};

export default Filter;
