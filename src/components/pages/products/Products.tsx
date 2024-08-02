"use client";
import Button from "@/components/atoms/button/Button";
import CategoryFilter from "@/components/molecules/categoryFilter/CategoryFilter";
import FilterAccordion from "@/components/molecules/filterAccordion/FilterAccordion";
import PriceFilter from "@/components/molecules/priceFilter/PriceRange";
import ProductCart from "@/components/molecules/productCart/ProductCart";
import RatingFilter from "@/components/molecules/ratingFilter/RatingFilter";
import ProductSkeleton from "@/components/molecules/skeleton/product/ProductSkeleton";
import TagsFilter from "@/components/molecules/tagsFilter/TagsFilter";
import TopFilter from "@/components/organisms/shopTopFilter/Filter";
import { fetchCategory } from "@/store/feature/category/CategorySlice";
import {
  fetchItems,
  resetProducts,
} from "@/store/feature/product/ProductSlice";
import { fetchTags } from "@/store/feature/tags/TagsSlice";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import styles from "./products.module.scss";

const Shop = () => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const {
    items: products,
    hasMore,
    loading,
    page,
  } = useSelector((state: RootState) => state.products);

  const searchParams = useSearchParams();
  const categoryFromParams = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryFromParams);

  const [price, setPrice] = useState<number[]>([0, 20000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState<string | number>("Latest");

  const searchValues = searchParams.get("search")?.toLowerCase() || "";
  const selectedLocation = searchParams.get("location") || "";

  // Handle SelectBox Value
  const handleSelectValue = (value: string | number) => {
    setSelectValue(value);
  };

  // handle reset products
  const handleReloadProduct = () => {
    dispatch(resetProducts());
    dispatch(fetchItems(1) as any);
  };

  useEffect(() => {
    dispatch(fetchCategory() as any);
    dispatch(fetchTags() as any);
  }, [dispatch]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      dispatch(fetchItems(page) as any);
    }
  }, [inView, hasMore, loading, dispatch, page]);

  // Filter Products by location

  const filterProducts = useCallback(() => {
    let filteredProducts = products;

    // filter by categories
    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (item) => item.attributes.category.name === selectedCategory
      );
    }

    // filter by search values
    if (searchValues) {
      filteredProducts = filteredProducts.filter((item) =>
        item.attributes.name.toLowerCase().includes(searchValues)
      );
    }

    // filter by location
    if (selectedLocation) {
      filteredProducts = filteredProducts.filter(
        (item) => item.attributes.location === selectedLocation
      );
    }

    // filter by price
    filteredProducts = filteredProducts.filter((item) => {
      const productPrice =
        item.attributes.discountPrice || item.attributes.price;
      return productPrice >= price[0] && productPrice <= price[1];
    });

    // filter by ratings
    if (selectedRatings.length > 0) {
      filteredProducts = filteredProducts.filter((item) => {
        const averageRating = item.attributes.averageRating || 0;
        return selectedRatings.includes(Math.round(averageRating));
      });
    }

    // filter by tags
    if (selectedTags.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        item.attributes.tags.some((tag) => selectedTags.includes(tag.name))
      );
    }

    // filter by select value
    switch (selectValue) {
      case "Latest":
        filteredProducts = filteredProducts.sort(
          (a, b) =>
            new Date(b.attributes.createdAt).getTime() -
            new Date(a.attributes.createdAt).getTime()
        );
        break;
      case "Popular":
        filteredProducts = filteredProducts.filter(
          (item) => item.attributes.isPopular
        );
        break;
      case "Featured":
        filteredProducts = filteredProducts.filter(
          (item) => item.attributes.isFeatured
        );
        break;
      case "Hot Deals":
        filteredProducts = filteredProducts.filter(
          (item) => item.attributes.isHotDeals
        );
        break;
      case "Low to High":
        filteredProducts = filteredProducts.sort(
          (a, b) =>
            (a.attributes.discountPrice || a.attributes.price) -
            (b.attributes.discountPrice || b.attributes.price)
        );
        break;
      case "High to Low":
        filteredProducts = filteredProducts.sort(
          (a, b) =>
            (b.attributes.discountPrice || b.attributes.price) -
            (a.attributes.discountPrice || a.attributes.price)
        );
        break;
      case "Random":
      default:
        filteredProducts = filteredProducts.sort(() => Math.random() - 0.5);
        break;
    }

    return filteredProducts;
  }, [
    products,
    selectedCategory,
    searchValues,
    selectedLocation,
    price,
    selectedRatings,
    selectedTags,
    selectValue,
  ]);

  const filteredProducts = filterProducts();
  const resultFound = filteredProducts.length;

  return (
    <Box className={`shopPage ${styles.shop}`}>
      <TopFilter
        resultFound={resultFound}
        selectBoxValue={[
          "Random",
          "Latest",
          "Popular",
          "Featured",
          "Hot Deals",
          "Low to High",
          "High to Low",
        ]}
        selectValue={selectValue}
        handleSelectValue={handleSelectValue}
      />
      <Box className={styles.shop__contentWrapper}>
        <Box className={styles.shop__leftContent}>
          <Box className={styles.shop__categoriesFilterSection}>
            <FilterAccordion title="All Categories">
              <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </FilterAccordion>
          </Box>

          <Box className={styles.shop__priceFilterSection}>
            <FilterAccordion title="Price">
              <PriceFilter price={price} setPrice={setPrice} />
            </FilterAccordion>
          </Box>

          <Box className={styles.shop__ratingFilterSection}>
            <FilterAccordion title="Rating">
              <RatingFilter
                selectedRatings={selectedRatings}
                setSelectedRatings={setSelectedRatings}
              />
            </FilterAccordion>
          </Box>

          <Box className={styles.shop__tagsFilterSection}>
            <FilterAccordion title={"Popular Tags"}>
              <TagsFilter
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </FilterAccordion>
          </Box>
        </Box>
        <Box className={styles.shop__rightContent}>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {filteredProducts.map((item) => (
              <Grid flexGrow={1} key={item.id} xs={6} md={4} lg={3} item>
                <ProductCart
                  id={item.id}
                  isServiceAvailable={item.attributes.isServiceAvailable}
                  price={item.attributes.price}
                  name={item.attributes.name}
                  category={item.attributes.category.name}
                  description={item.attributes.description}
                  discountPrice={item.attributes.discountPrice}
                  images={item.attributes.images}
                  averageRating={item.attributes.averageRating}
                  href={`/products/${item.id}`}
                  shortDescription={item.attributes.shortDescription}
                  weight={item.attributes.weight}
                  seller={item.attributes.seller}
                  tags={item.attributes.tags}
                />
              </Grid>
            ))}
            {loading &&
              [1, 2, 3, 4, 5].map((item) => (
                <Grid flexGrow={1} key={item} xs={6} md={4} lg={3} item>
                  <ProductSkeleton key={item} />
                </Grid>
              ))}
          </Grid>
          {!hasMore && (
            <Box className={styles.shop__noMoreProducts}>
              <Typography className={styles.shop__noMoreText}>
                No More Products😊😊
              </Typography>
              <Button onClick={handleReloadProduct} text={"Reload Products"} />
            </Box>
          )}
          <Box ref={ref}></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Shop;
