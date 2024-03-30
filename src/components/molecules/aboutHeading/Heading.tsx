import Typography from "@mui/material/Typography";
import React from "react";
import styles from "./heading.module.scss";

interface HeadingProps {
  heading: string;
  para: string;
}

const Heading: React.FC<HeadingProps> = ({ heading, para }) => {
  return (
    <>
      <Typography
        pr={{ sm: 0, md: 8 }}
        component={"h2"}
        className={styles.heading}
      >
        {heading}
      </Typography>
      <Typography className={styles.para}>{para}</Typography>
    </>
  );
};

export default Heading;
