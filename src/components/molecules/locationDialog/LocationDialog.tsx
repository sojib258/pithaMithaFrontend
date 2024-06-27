"use client";
import Location from "@/components/molecules/location/Location";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import React from "react";
import styles from "./locationDialog.module.scss";

interface LocationDialogProps {
  open: boolean;
  handleClose: () => void;
  handleLocationSelect: (location: string) => void;
}

const LocationDialog: React.FC<LocationDialogProps> = ({
  open,
  handleClose,
  handleLocationSelect,
}) => {
  return (
    <Dialog
      className={`${styles.location} locationDialog`}
      open={open}
      onClose={handleClose}
    >
      <Box className={styles.location__head}>
        <Typography className={styles.location__headText} component={"h2"}>
          Select Location
        </Typography>
        <CloseIcon
          className={styles.location__closeIcon}
          onClick={handleClose}
        />
      </Box>
      <Box className={styles.location__content}>
        <Location
          handleClose={handleClose}
          handleLocationSelect={handleLocationSelect}
        />
      </Box>
    </Dialog>
  );
};

export default LocationDialog;
