"use client";
import InputText from "@/components/atoms/inputText/InputText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LocationDialog from "../locationDialog/LocationDialog";
import styles from "./searchBar.module.scss";

interface SearchBarProps {
  label?: string;
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
  onBlur,
  onFocus,
  customStyle,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("Location");
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateQueryParams = (search: string, location: string) => {
    const queryParams = new URLSearchParams();
    if (search) {
      queryParams.append("search", search);
    }
    if (location && location !== "Location") {
      queryParams.append("location", location);
    }
    router.push(`/products?${queryParams.toString()}`);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    updateQueryParams(value, location);
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    updateQueryParams(searchValue, selectedLocation);
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
          onChange={handleSearch}
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
          {location}
        </Button>
        {open && (
          <LocationDialog
            handleClose={handleClose}
            open={open}
            handleLocationSelect={handleLocationSelect}
          />
        )}
      </Stack>
    </>
  );
};

export default SearchBar;
