"use client";
import Box from "@mui/material/Box";
import { GlassMagnifier } from "react-image-magnifiers";
import styles from "./quickView.module.scss";

interface SliderProps {
  imageSrc: string;
}

const QuickViewSlider: React.FC<SliderProps> = ({ imageSrc }) => {
  return (
    <>
      <Box className={styles.slider}>
        <GlassMagnifier
          imageSrc={imageSrc}
          imageAlt="Product Image"
          magnifierSize={"50%"}
          magnifierBorderSize={3}
          magnifierBorderColor="rgba(255,255,255,.5)"
          square={false}
        />
      </Box>
    </>
  );
};

export default QuickViewSlider;
