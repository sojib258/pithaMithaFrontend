import Button from "@mui/material/Button";
import React from "react";
import styles from "./tagButton.module.scss";

interface TagButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}
const TagButton: React.FC<TagButtonProps> = ({ selected, onClick, label }) => {
  return (
    <Button
      className={`${styles.tagBtn} ${selected && styles.tagBtnActive}`}
      variant={"contained"}
      color={selected ? "success" : "primary"}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default TagButton;
