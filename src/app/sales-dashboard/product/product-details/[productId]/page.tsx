"use client";
import Feedback from "@/components/molecules/cutomerFeedback/Feedback";
import RatingCount from "@/components/molecules/ratingCount/RatingCount";
import Buttons from "@/components/molecules/singleProductBtn/Buttons";
import AverageRatingSkeleton from "@/components/molecules/skeleton/AverageRating/AverageRatingSkeleton";
import ReviewSkeleton from "@/components/molecules/skeleton/review/ReviewSkeleton";
import ProductDetails from "@/components/organisms/productDetails/ProductDetails";
import QuickViewSlider from "@/components/organisms/quickView/QuickViewSlider";
import Description from "@/components/organisms/singleProduct/description/Description";
import { fetchRatingData } from "@/store/feature/rating/RatingSlice";
import { fetchSellerProduct } from "@/store/feature/sellerProduct/SellerProductSlice";
import { RootState } from "@/store/store";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";

const Page = ({ params }: { params: { productId: string } }) => {
  const { productId: productIdString } = params;
  const productId = parseInt(productIdString);

  const [loading, setLoading] = useState(false);
  const [reRender, setReRender] = useState(false);
  const { sellerProduct, ratings } = useSelector((state: RootState) => state);
  const product = sellerProduct.items.find((item) => item.id === productId); //it have to be place here

  const [imgSrc, setImgSrc] = useState(product?.images[0]?.url || "");
  const [activeBtn, setActiveBtn] = useState("description");
  const dispatch = useDispatch();

  const handleLoading = (value: boolean) => {
    setLoading(value);
  };

  const handleImgSrc = (url: string) => {
    setImgSrc(url);
  };

  const handleBtnClick = (value: string) => {
    setActiveBtn(value);
  };

  const handleReRender = () => {
    setReRender(!reRender);
  };

  useEffect(() => {
    if (productId) {
      dispatch(fetchRatingData(productId) as any);
    }
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(fetchSellerProduct() as any);
  }, [dispatch, reRender]);

  const skeletonLength = [1, 2, 3, 4];

  if (!product) {
    return <div>Product not found</div>;
  }

  const { description, averageRating } = product;

  return (
    <Box className={styles.details}>
      <Box component={"section"} className={styles.sliderProduct}>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Box className={styles.details__sliderPart}>
              <QuickViewSlider loading={loading} imageSrc={imgSrc} />
              <Box className={styles.details__imagesWrapper}>
                {loading
                  ? skeletonLength.map((item) => (
                      <Skeleton
                        key={item}
                        sx={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "8px",
                        }}
                        className={styles.details__skeletoImg}
                        variant="rectangular"
                      />
                    ))
                  : product.images.map((item: any) => (
                      <Image
                        key={item.id}
                        width={100}
                        height={100}
                        src={item.url}
                        alt={
                          item.alternativeText
                            ? item.alternativeText
                            : "product image"
                        }
                        onClick={() => handleImgSrc(item.url)}
                        className={styles.details__img}
                      />
                    ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box className={styles.details__contentPart}>
              <ProductDetails
                handleReRender={handleReRender}
                product={product}
                loading={loading}
                handleLoading={handleLoading}
                totalRating={ratings.items.length}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Buttons Area*/}
      <Box component={"section"} className={styles.details__actionBtn}>
        <Buttons handleBtnClick={handleBtnClick} activeBtn={activeBtn} />
      </Box>

      {/* Product Details Area*/}
      <Box component={"section"} className={styles.details__product}>
        {activeBtn === "description" && (
          <Description loading={loading} description={description} />
        )}
        {activeBtn === "customerFeedback" &&
          (ratings.items.length >= 1 ? (
            <Grid container>
              <Grid item xs={12} md={8}>
                {ratings.items.map((rating) => (
                  <Box
                    key={rating.ratingId}
                    className={styles.details__cusRating}
                  >
                    {loading ? (
                      <ReviewSkeleton />
                    ) : (
                      <Feedback
                        comment={rating.comment}
                        ratingValue={rating.ratingValue}
                        publishedAt={rating.publishedAt}
                        user={rating.user}
                        loading={loading}
                      />
                    )}
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className={styles.details__ratingValues}>
                  {loading ? (
                    <AverageRatingSkeleton />
                  ) : (
                    <RatingCount
                      averageRating={averageRating}
                      ratings={ratings.items}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Typography className={styles.details__noRatingText}>
              There is no ratings in this product.😊😊
            </Typography>
          ))}
      </Box>
    </Box>
  );
};

export default Page;
