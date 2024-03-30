"use client";
import Checkbox from "@mui/material/Checkbox";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./checkbox.module.scss";

interface CheckboxAtomProps {
  id?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  register?: UseFormRegisterReturn;
}

const CheckboxAtom: React.FC<CheckboxAtomProps> = ({
  id,
  checked = false,
  onChange,
  register,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <Checkbox
      id={id}
      className={styles.checkbox}
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
      {...(register && register)}
    />
  );
};

export default CheckboxAtom;
