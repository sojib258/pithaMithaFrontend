"use client";
import InputText from "@/components/atoms/inputText/InputText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import LocationDialog from "../locationDialog/LocationDialog";
import styles from "./searchBar.module.scss";

interface SearchBarProps {
  label?: string;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  value?: string | number;
  type?: "text" | "email" | "password";
  customStyle?: object;
  icon?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  label,
  type,
  value,
  icon,
  onChange,
  onBlur,
  onFocus,
  customStyle,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <InputText
          label={label}
          type={type}
          value={value}
          icon={icon}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          customStyle={customStyle}
        />
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          className={styles.btn}
        >
          <LocationOnIcon className={styles.btn__icon} />
          Location
        </Button>
        {open && <LocationDialog handleClose={handleClose} open={open} />}
      </Stack>
    </>
  );
};

export default SearchBar;
