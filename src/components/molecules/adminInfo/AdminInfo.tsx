"use client";
import dateFormat from "@/utils/dateFormat";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import styles from "./adminInfo.module.scss";
interface AdminInfoProps {
  src: string;
  alt?: string;
  firstName: string;
  lastName?: string;
  date: string;
  minRead?: number;
}
const AdminInfo: React.FC<AdminInfoProps> = ({
  src,
  alt,
  firstName,
  lastName,
  date,
  minRead,
}) => {
  console.log("ImgSrc", src);
  const { date: formatedDate } = dateFormat(date);
  return (
    <Box className={styles.admin}>
      {src ? (
        <Image
          className={styles.admin__img}
          width={80}
          height={80}
          src={src}
          alt={alt ? alt : "Admin Image"}
        />
      ) : (
        <Avatar className={styles.admin__adminAvatar}>
          {firstName.slice(0, 1)}
        </Avatar>
      )}

      <Box className={styles.admin__content}>
        <Typography className={styles.admin__name}>
          {`${firstName} ${lastName && lastName}`}
        </Typography>
        <Typography className={styles.admin__blogPostDate}>
          {`${formatedDate} • ${6} min read`}
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminInfo;
