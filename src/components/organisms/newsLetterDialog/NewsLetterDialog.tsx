import NewsletterForm from "@/components/molecules/newsLetterFrom/NewsletterForm";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import styles from "./newsletter.module.scss";

import DialogContent from "@mui/material/DialogContent";
import * as React from "react";

const NewsLetterDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={"newsLetter__dialog"}
      >
        <DialogContent>
          {/* NewsLetter Main Content */}
          <Stack
            direction={"row"}
            className={`${styles.newsLetter} newsLetter`}
          >
            <Box className={styles.newsLetter__leftContent}>
              <Image
                src="/img/BG.png"
                width={354}
                height={380}
                alt="Picture of the author"
              />
              <IconButton
                onClick={handleClose}
                className={`${styles.newsLetter__CloseIcon} asd`}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Box className={styles.newsLetter__rightContent}>
              <Typography className={styles.newsLetter__heading}>
                Subcribe to Our Newsletter
              </Typography>
              <Typography className={styles.newsLetter__para}>
                Subscribe to our newlletter and Save your 20% money with
                discount code today.
              </Typography>
              <NewsletterForm customStyle={{ marginBottom: "45px" }} />
              <Box
                sx={{ textAlign: "center" }}
                className={"newsLetter__checkBox"}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Do not show this window"
                />
              </Box>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewsLetterDialog;
