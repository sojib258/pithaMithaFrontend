"use client";
import CategoryFilter from "@/components/molecules/categoryFilter/CategoryFilter";
import FilterAccordion from "@/components/molecules/filterAccordion/FilterAccordion";
import PriceFilter from "@/components/molecules/priceFilter/PriceRange";
import ProductCart from "@/components/molecules/productCart/ProductCart";
import RatingFilter from "@/components/molecules/ratingFilter/RatingFilter";
import TagsFilter from "@/components/molecules/tagsFilter/TagsFilter";
import TopFilter from "@/components/organisms/shopTopFilter/Filter";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./products.module.scss";
const Shop = () => {
  let products = useSelector((state: RootState) => state.products.items);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [price, setPrice] = useState<number[]>([0, 20000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState<string | number>("Latest");

  products = products.filter((item) => {
    if (selectedCategory === "All") return item;
    if (item.attributes.category.name === selectedCategory) return item;
  });

  products = products.filter((item) => {
    if (item.attributes.discountPrice) {
      return (
        item.attributes.discountPrice > price[0] &&
        item.attributes.discountPrice < price[1]
      );
    } else {
      return (
        item.attributes.price > price[0] && item.attributes.price < price[1]
      );
    }
  });

  // Handle SelectBox Value
  const selectBoxValue = ["Latest", "Popular", "Low to High", "High to Low"];
  const handleSelectValue = (value: string | number) => {
    setSelectValue(value);
  };

  const resultFound = products.length;

  return (
    <Box className={`shopPage ${styles.shop}`}>
      <TopFilter
        resultFound={resultFound}
        selectBoxValue={selectBoxValue}
        selectValue={selectValue}
        handleSelectValue={handleSelectValue}
      />
      <Box className={styles.shop__contentWrapper}>
        <Box className={styles.shop__leftContent}>
          {/* Categories Filter Area */}
          <Box className={styles.shop__categoriesFilterSection}>
            <FilterAccordion title="All Categories">
              <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </FilterAccordion>
          </Box>

          {/* Price Filter Section */}
          <Box className={styles.shop__priceFilterSection}>
            <FilterAccordion title="Price">
              <PriceFilter price={price} setPrice={setPrice} />
            </FilterAccordion>
          </Box>

          {/* Rating Filter Section */}
          <Box className={styles.shop__ratingFilterSection}>
            <FilterAccordion title="Rating">
              <RatingFilter
                selectedRatings={selectedRatings}
                setSelectedRatings={setSelectedRatings}
              />
            </FilterAccordion>
          </Box>

          {/* Tags Filter Section */}
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
            {products.map((item) => (
              <Grid
                flexGrow={1}
                key={item.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                item
              >
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
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Shop;
