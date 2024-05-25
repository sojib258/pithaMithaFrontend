"use client";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { GlassMagnifier } from "react-image-magnifiers";
import styles from "./quickView.module.scss";

interface SliderProps {
  imageSrc: string;
  loading: boolean;
}

const QuickViewSlider: React.FC<SliderProps> = ({ imageSrc, loading }) => {
  return (
    <>
      <Box className={styles.slider}>
        {loading ? (
          <Skeleton
            sx={{ width: "100%", height: "420px", borderRadius: "20px" }}
            className={styles.skeleton__img}
            variant="rectangular"
          />
        ) : (
          <GlassMagnifier
            imageSrc={imageSrc}
            imageAlt="Product Image"
            magnifierSize={"50%"}
            magnifierBorderSize={3}
            magnifierBorderColor="rgba(255,255,255,.5)"
            square={false}
            style={{ borderRadius: "20px" }}
          />
        )}
      </Box>
    </>
  );
};

export default QuickViewSlider;
