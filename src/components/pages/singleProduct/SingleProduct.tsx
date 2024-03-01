"use client";
import Feedback from "@/components/molecules/cutomerFeedback/Feedback";
import Buttons from "@/components/molecules/singleProductBtn/Buttons";
import ProductSlider from "@/components/organisms/singleProduct/ProductDetails";
import Information from "@/components/organisms/singleProduct/additionalInformation/Information";
import Description from "@/components/organisms/singleProduct/description/Description";
import RelatedProduct from "@/components/organisms/singleProduct/relatedProduct/RelatedProduct";
import Box from "@mui/material/Box";
import { useState } from "react";
import styles from "./singleProduct.module.scss";

interface SingleProductProps {
  productId: string | number;
}

const SingleProduct: React.FC<SingleProductProps> = ({ productId }) => {
  const [activeBtn, setActiveBtn] = useState("description");
  const handleBtnClick = (value: string) => {
    setActiveBtn(value);
  };
  return (
    <>
      {/* Product Slider Area*/}
      <Box component={"section"} className={styles.sliderProduct}>
        <Box className={styles.sliderProduct__wrapper}>
          <ProductSlider productId={productId} />
        </Box>
      </Box>

      {/* Buttons Area*/}
      <Box component={"section"} className={styles.buttons}>
        <Box className={styles.buttons__wrapper}>
          <Buttons handleBtnClick={handleBtnClick} activeBtn={activeBtn} />
        </Box>
      </Box>

      {/* Product Details Area*/}
      <Box component={"section"} className={styles.productDetails}>
        <Box className={styles.productDetails__wrapper}>
          {activeBtn === "description" && <Description productId={productId} />}
          {activeBtn === "additionalInfo" && (
            <Information productId={productId} />
          )}
          {activeBtn === "customerFeedback" && (
            <Feedback productId={productId} />
          )}
        </Box>
      </Box>

      {/* Related Product Area*/}
      <Box component={"section"} className={styles.relatedProduct}>
        <Box className={styles.relatedProduct__wrapper}>
          <RelatedProduct productId={productId} />
        </Box>
      </Box>
    </>
  );
};
export default SingleProduct;
