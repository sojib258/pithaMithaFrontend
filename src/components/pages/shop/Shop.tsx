"use client";
import CategoryFilter from "@/components/molecules/categoryFilter/CategoryFilter";
import PriceFilter from "@/components/molecules/priceFilter/PriceRange";
import ProductCart from "@/components/molecules/productCart/ProductCart";
import RatingFilter from "@/components/molecules/ratingFilter/RatingFilter";
import SelectBox from "@/components/molecules/selectBox/SelectBox";
import TagsFilter from "@/components/molecules/tagsFilter/TagsFilter";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./shop.module.scss";
const Shop = () => {
  const products = useSelector((state: RootState) => state.products.items);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [price, setPrice] = useState<number[]>([0, 2000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState("latest");

  console.log("C", selectedCategory);
  console.log("S", selectedRatings);
  console.log("P", price);
  console.log("T", selectedTags);
  console.log("SortValue", sortValue);

  return (
    <Box className={`shopPage ${styles.shop}`}>
      <Box className={styles.shop__leftContent}>
        <Button className={styles.shop__filterBtn}>
          Filter
          <Image
            className={styles.shop__filterBtnIcon}
            width={22}
            height={19}
            alt="filterIcon"
            src={"/icons/filterIcon.svg"}
          />
        </Button>
        {/* Categories Filter Area */}
        <Box className={styles.shop__categoriesFilterSection}>
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Box>

        {/* Price Filter Section */}
        <Box className={styles.shop__priceFilterSection}>
          <PriceFilter price={price} setPrice={setPrice} />
        </Box>

        {/* Rating Filter Section */}
        <Box className={styles.shop__ratingFilterSection}>
          <RatingFilter
            selectedRatings={selectedRatings}
            setSelectedRatings={setSelectedRatings}
          />
        </Box>

        {/* Tags Filter Section */}
        <Box className={styles.shop__tagsFilterSection}>
          <TagsFilter
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </Box>
      </Box>
      <Box className={styles.shop__rightContent}>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={3}
        >
          <Box className={styles.shop__selectArea}>
            <Typography className={styles.shop__sortByText}>
              Sort by:
            </Typography>
            <SelectBox sortValue={sortValue} setSortValue={setSortValue} />
          </Box>
          <Typography className={styles.shop__resultFoundText}>
            <Typography
              className={styles.shop__resultFoundCount}
              component={"span"}
            >
              {0}
            </Typography>{" "}
            Result found
          </Typography>
        </Stack>

        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {products.map((item) => (
            <Grid flexGrow={1} key={item.id} xs={6} sm={4} md={3} lg={2.4} item>
              <ProductCart
                id={item.id}
                ratingValue={item.attributes.ratingValue}
                price={item.attributes.price}
                title={item.attributes.name}
                category={item.attributes.category.name}
                description={item.attributes.description}
                discountPrice={item.attributes.discountPrice}
                images={item.attributes.images}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Shop;
