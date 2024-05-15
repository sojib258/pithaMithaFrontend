"use client";
import CategoryItem from "@/components/molecules/categoryItem/CategoryItem";
import CategoriesSkeleton from "@/components/molecules/skeleton/categories/CategoriesSkeleton";
import useResponsive from "@/hooks/useResponsive";
import { fetchCategory } from "@/store/feature/category/CategorySlice";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import styles from "./categories.module.scss";

const Categories = () => {
  const { smScreen } = useResponsive();

  const dispatch = useDispatch();
  const { items: categories, loading } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategory() as any);
  }, [dispatch]);

  const responsive = {
    xl: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1536 },
      items: 6,
    },
    lg: {
      breakpoint: { max: 1535, min: 1200 },
      items: 5,
    },
    md: {
      breakpoint: { max: 1199, min: 900 },
      items: 4,
    },
    sm: {
      breakpoint: { max: 899, min: 600 },
      items: 3,
    },
    xs: {
      breakpoint: { max: 599, min: 0 },
      items: 3,
    },
  };

  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Box
      className={`categories ${styles.categories} ${
        smScreen && styles.categories__smScreen
      } ${smScreen && "categories__smScreen"}`}
    >
      <Typography className={styles.categories__headText}>
        Popular Categories
      </Typography>
      {loading ? (
        <Carousel
          showDots={smScreen && true}
          responsive={responsive}
          ssr={true}
        >
          {skeletonArray.map((item) => (
            <CategoriesSkeleton key={item} />
          ))}
        </Carousel>
      ) : (
        <Carousel
          showDots={smScreen && true}
          responsive={responsive}
          ssr={true}
        >
          {categories.map((item, index) => (
            <Box key={index}>
              <CategoryItem
                altText={item.image.alternativeText}
                imgSrc={item.image.url}
                text={item.name}
              />
            </Box>
          ))}
        </Carousel>
      )}
    </Box>
  );
};

export default Categories;
