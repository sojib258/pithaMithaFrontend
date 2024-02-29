import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import styles from "./buttons.module.scss";

interface ButtonProps {
  handleBtnClick: (value: string) => void;
  activeBtn: string;
}

const Buttons: React.FC<ButtonProps> = ({ handleBtnClick, activeBtn }) => {
  console.log("ACtiveB", activeBtn);
  return (
    <Box className={styles.buttonWrapper}>
      <Button
        className={`${styles.buttonWrapper__btn} ${
          activeBtn === "description" ? styles.active : ""
        }`}
        onClick={() => handleBtnClick("description")}
      >
        Descriptions
      </Button>
      <Button
        className={`${styles.buttonWrapper__btn} ${
          activeBtn === "additionalInfo" ? styles.active : ""
        }`}
        onClick={() => handleBtnClick("additionalInfo")}
      >
        Additional Information
      </Button>
      <Button
        className={`${styles.buttonWrapper__btn} ${
          activeBtn === "customerFeedback" ? styles.active : ""
        }`}
        onClick={() => handleBtnClick("customerFeedback")}
      >
        Customer Feedback
      </Button>
    </Box>
  );
};

export default Buttons;
