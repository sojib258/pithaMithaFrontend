import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import styles from "./listItem.module.scss";
interface ListItemProps {
  text: string;
}
const ListItem: React.FC<ListItemProps> = ({ text }) => {
  return (
    <Box className={styles.listItem}>
      <Image
        className={styles.listItem__img}
        width={20}
        height={20}
        alt={"Icon"}
        src={"/icons/aboutPage/Check.svg"}
      />
      <Typography className={styles.listItem__text}>{text}</Typography>
    </Box>
  );
};

export default ListItem;
