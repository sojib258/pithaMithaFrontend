"use client";
import Feedback from "@/components/molecules/cutomerFeedback/Feedback";
import RatingCount from "@/components/molecules/ratingCount/RatingCount";
import Buttons from "@/components/molecules/singleProductBtn/Buttons";
import AverageRatingSkeleton from "@/components/molecules/skeleton/AverageRating/AverageRatingSkeleton";
import ReviewSkeleton from "@/components/molecules/skeleton/review/ReviewSkeleton";
import SingleProSkeleton from "@/components/molecules/skeleton/singleProduct/SingleProSkeleton";
import ProductDetails from "@/components/organisms/singleProduct/ProductDetails";
import Description from "@/components/organisms/singleProduct/description/Description";
import RelatedProduct from "@/components/organisms/singleProduct/relatedProduct/RelatedProduct";
import { fetchRatingData } from "@/store/feature/rating/RatingSlice";
import { RootState } from "@/store/store";
import { fetchSingleProduct } from "@/utils/fetchProduct";
import { ProductData } from "@/utils/typesDefine/productSliceTypes";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./singleProduct.module.scss";

interface SingleProductProps {
  productId: number;
}

const SingleProduct: React.FC<SingleProductProps> = ({ productId }) => {
  const { ratings } = useSelector((state: RootState) => state);
  const [product, setProduct] = useState<ProductData>();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [activeBtn, setActiveBtn] = useState("description");

  const { items: ratingItems, loading: ratingLoading } = ratings;

  const handleBtnClick = (value: string) => {
    setActiveBtn(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (productId) {
        dispatch(fetchRatingData(productId) as any);
        const productData = await fetchSingleProduct(
          productId,
          `populate[category]=true&populate[tags]=true&populate[images]=true&populate[users_permissions_user][populate]=image`
        );

        setProduct(productData);
        console.log("ProductsFromSinglePageInsideUseEffect", product);
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch, productId]);

  console.log("Loading", loading);
  console.log("Product", product);

  return (
    <>
      {loading ? (
        <Box component={"section"} className={styles.skeleton}>
          <Box className={styles.skeleton__wrapper}>
            <SingleProSkeleton />
          </Box>
        </Box>
      ) : product ? (
        <>
          {/* Product Slider Area*/}
          <Box component={"section"} className={styles.sliderProduct}>
            <Box className={styles.sliderProduct__wrapper}>
              <ProductDetails productDetails={product} />
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
              {activeBtn === "description" && (
                <Description
                  description={product?.attributes?.description || ""}
                />
              )}
              {activeBtn === "customerFeedback" &&
                (ratings.items.length >= 1 ? (
                  <Grid container>
                    <Grid item xs={12} md={8}>
                      {ratingItems.map((rating) => (
                        <Box
                          key={rating.ratingId}
                          className={styles.productDetails__cusRating}
                        >
                          {ratingLoading ? (
                            <ReviewSkeleton />
                          ) : (
                            <Feedback
                              comment={rating.comment}
                              ratingValue={rating.ratingValue}
                              publishedAt={rating.publishedAt}
                              user={rating.user}
                              images={rating.images}
                              loading={ratingLoading}
                            />
                          )}
                        </Box>
                      ))}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box className={styles.productDetails__ratingValues}>
                        {ratingLoading ? (
                          <AverageRatingSkeleton />
                        ) : (
                          <RatingCount
                            averageRating={product?.attributes.averageRating}
                            ratings={ratings.items}
                          />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography className={styles.productDetails__noRatingText}>
                    There is no ratings in this product.😊😊
                  </Typography>
                ))}
            </Box>
          </Box>

          {/* Related Product Area*/}
          <Box component={"section"} className={styles.relatedProduct}>
            <Box className={styles.relatedProduct__wrapper}>
              <RelatedProduct
                category={product.attributes.category.data.attributes.name}
              />
            </Box>
          </Box>
        </>
      ) : (
        <Typography> Product Not Found</Typography>
      )}
    </>
  );
};
export default SingleProduct;
