import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import styles from "./feature.module.scss";

interface FeatureProps {
  src: string;
  heading: string;
  description: string;
  altText?: string;
}

const Feature: React.FC<FeatureProps> = ({
  src,
  altText,
  heading,
  description,
}) => {
  return (
    <Box className={styles.feature}>
      <Image
        className={styles.feature__icon}
        width={100}
        height={100}
        alt={altText ? altText : "about-image"}
        src={src}
      />
      <Box className={styles.feature__rightContent}>
        <Typography component={"h4"} className={styles.feature__heading}>
          {heading}
        </Typography>
        <Typography className={styles.feature__description}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default Feature;
