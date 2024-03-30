"use client";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./selectBox.module.scss";

interface SelectBoxProps {
  value: string | undefined;
  handleSelectValue?: (value: string) => void;
  options: string[];
  sx?: object;
  label: string;
  register?: UseFormRegisterReturn;
  disabled?: boolean;
}
const SelectBox: React.FC<SelectBoxProps> = ({
  value = "",
  handleSelectValue,
  options,
  sx,
  label,
  register,
  disabled = false,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    if (handleSelectValue) {
      handleSelectValue(event.target.value as string);
    }
  };

  return (
    <Box sx={sx} className={`${styles.selectBox} selectBox`}>
      <FormControl fullWidth>
        <InputLabel id={`demo-simple-select-${label}`}>{label}</InputLabel>
        <Select
          labelId={`demo-simple-select-${label}`}
          id={`demo-simple-select-id${label}`}
          value={value}
          label={label}
          className={styles.selectBox__text}
          disabled={disabled}
          onChange={handleChange}
          {...(register && register)}
        >
          {options.map((item, index) => (
            <MenuItem
              key={index}
              className={styles.selectBox__value}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectBox;
