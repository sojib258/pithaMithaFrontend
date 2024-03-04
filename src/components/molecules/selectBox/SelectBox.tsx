import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styles from "./selectBox.module.scss";

interface SelectBoxProps {
  sortValue: string;
  setSortValue: (value: string) => void;
}
const SelectBox: React.FC<SelectBoxProps> = ({ sortValue, setSortValue }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as string);
  };

  return (
    <Box className={`${styles.selectBox} selectBox`}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortValue}
          label="Age"
          onChange={handleChange}
          className={styles.selectBox__text}
        >
          <MenuItem className={styles.selectBox__value} value={"latest"}>
            Latest
          </MenuItem>
          <MenuItem className={styles.selectBox__value} value={"popular"}>
            Popular
          </MenuItem>
          <MenuItem className={styles.selectBox__value} value={"lowToHigh"}>
            Price: Low to High
          </MenuItem>
          <MenuItem className={styles.selectBox__value} value={"highToLow"}>
            Price: High to Low
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectBox;
