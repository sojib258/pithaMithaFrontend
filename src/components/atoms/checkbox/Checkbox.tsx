"use client";
import Checkbox from "@mui/material/Checkbox";
import styles from "./checkbox.module.scss";

interface CheckboxAtomProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxAtom: React.FC<CheckboxAtomProps> = ({
  id,
  checked,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <Checkbox
      id={id}
      className={styles.checkbox}
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default CheckboxAtom;
