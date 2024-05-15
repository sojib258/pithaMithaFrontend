"use client";
import Button from "@/components/atoms/button/Button";
import ToasterMsg from "@/components/atoms/toastMsg/Toaster";
import { RootState } from "@/store/store";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import styles from "./uploadDialog.module.scss";

interface AvatarUploadProps {
  open: boolean;
  handleOpen: () => void;
  userId: number | null;
  handleUpdateUser: () => void;
  handleLoading: (value: boolean) => void;
  loading: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const AvatarUplaod: React.FC<AvatarUploadProps> = ({
  open,
  handleOpen,
  userId,
  handleUpdateUser,
  handleLoading,
  loading,
}) => {
  const { id: previousImgId } = useSelector(
    (state: RootState) => state.user.profileImg
  );
  const [file, setFile] = useState<FileList | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (value: any) => {
    setErrorMsg("");
    setFile(value);
  };

  const notify = (msg: string) =>
    toast.error(`${msg}`, {
      duration: 2000,
    });

  if (errorMsg) {
    notify(errorMsg);
  }

  const token = Cookies.get("myAppAuthToken");

  const handleSubmit = async () => {
    setErrorMsg("");
    if (!file) {
      setErrorMsg("Please upload your picture");
      return;
    }
    if (!(file[0].type === "image/jpeg" || file[0].type === "image/jpeg")) {
      setErrorMsg("Image format must be png or jpg");
      return;
    }

    try {
      handleLoading(true);
      const formData = new FormData();
      formData.append("files", file[0]);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const promiseOne = axios.post(`${API_URL}/upload`, formData, { headers });
      toast.promise(promiseOne, {
        loading: "Picture Uploading...",
        success: "Upload Completed!",
        error: (error: any) => {
          return `${
            error.message
              ? error.message
              : error?.response?.data?.error?.message
          }`;
        },
      });

      const response = await promiseOne;

      const imageId = response.data[0].id;

      if (previousImgId) {
        const promiseTwo = axios.delete(
          `${API_URL}/upload/files/${previousImgId}`,
          {
            headers,
          }
        );
        toast.promise(promiseTwo, {
          loading: "Deleting you previous picture...",
          success: "Delete Completed your previous picture!",
          error: (error: any) => {
            return `${
              error.message
                ? error.message
                : error?.response?.data?.error?.message
            }`;
          },
        });
        await promiseTwo;
      }

      const promiseThree = axios.put(
        `${API_URL}/users/${userId}`,
        {
          image: imageId,
        },
        { headers }
      );
      toast.promise(promiseThree, {
        loading: "Updating profile picture..",
        success: "Update completed profile picture!",
        error: (error: any) => {
          return `${
            error.message
              ? error.message
              : error?.response?.data?.error?.message
          }`;
        },
      });

      await promiseThree;

      setFile(null);
      handleLoading(false);
      handleUpdateUser();
      handleOpen();
    } catch (error: any) {
      setErrorMsg(
        `${
          error.message ? error.message : error?.response?.data?.error?.message
        }`
      );
      handleLoading(false);
      handleOpen();
    }
  };

  return (
    <>
      <Dialog
        className={`${styles.upload} avatarUploadDialog`}
        onClose={handleOpen}
        open={open}
      >
        <DialogContent sx={{ padding: "20px" }}>
          <Box className={styles.upload__head}>
            <Typography className={styles.upload__headText}>
              Upload your avatar
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleOpen}
              className={styles.upload__crossIcon}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <input
            onChange={(e) => handleFileChange(e.target.files)}
            type="file"
          />
        </DialogContent>
        <DialogActions sx={{ padding: "20px" }}>
          <Button
            text={"Cancel"}
            sx={{
              backgroundColor: "#ff8a00!important",
              padding: "6px 20px!important ",
              "&:hover": {
                backgroundColor: "#d87300!important",
              },
            }}
            onClick={handleOpen}
          />
          <Button
            disabled={loading}
            text={"Submit"}
            sx={{ padding: "6px 20px!important " }}
            onClick={handleSubmit}
          />
        </DialogActions>
      </Dialog>
      <ToasterMsg />
    </>
  );
};

export default AvatarUplaod;
