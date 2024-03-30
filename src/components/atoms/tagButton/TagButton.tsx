import Button from "@mui/material/Button";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./tagButton.module.scss";

interface TagButtonProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
  register?: UseFormRegisterReturn;
  sx?: object;
}
const TagButton: React.FC<TagButtonProps> = ({
  selected,
  onClick,
  label,
  register,
  sx,
}) => {
  return (
    <Button
      className={`${styles.tagBtn} ${selected && styles.tagBtnActive}`}
      variant={"contained"}
      color={selected ? "success" : "primary"}
      onClick={onClick}
      {...register}
      sx={sx}
    >
      {label}
    </Button>
  );
};

export default TagButton;
