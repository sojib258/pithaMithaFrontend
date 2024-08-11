"use client";
import CategoryFilter from "@/components/molecules/categoryFilter/CategoryFilter";
import FilterAccordion from "@/components/molecules/filterAccordion/FilterAccordion";
import PriceFilter from "@/components/molecules/priceFilter/PriceRange";
import ProductCart from "@/components/molecules/productCart/ProductCart";
import RatingFilter from "@/components/molecules/ratingFilter/RatingFilter";
import ProductSkeleton from "@/components/molecules/skeleton/product/ProductSkeleton";
import TagsFilter from "@/components/molecules/tagsFilter/TagsFilter";
import TopFilter from "@/components/organisms/shopTopFilter/Filter";
import { fetchTags } from "@/store/feature/tags/TagsSlice";
import { Meta } from "@/utils/typesDefine/blogSliceTypes";
import { ProductData } from "@/utils/typesDefine/productSliceTypes";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import styles from "./products.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const Shop = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const searchParams = useSearchParams();
  const categoryFromParams = searchParams.get("category") || "All";

  // For Filters
  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryFromParams);
  const [price, setPrice] = useState<number[]>([0, 2000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState<string | number>("Latest");
  const searchValues = searchParams.get("search")?.toLowerCase() || "";
  const selectedLocation = searchParams.get("location") || "";

  // For Pagination
  const [start, setStart] = useState(0);
  const [limit] = useState(5);
  const [productsMeta, setProductsMeta] = useState<Meta>();
  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({ threshold: 0.1 });
  const dispatch = useDispatch();

  // Handle SelectBox Value
  const handleSelectValue = (value: string | number) => {
    setSelectValue(value);
  };

  useEffect(() => {
    dispatch(fetchTags() as any);
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/products?populate[tags]=true&populate[category]=true&populate[images]=treu&populate[users_permissions_user][populate]=image&pagination[start]=${start}&pagination[limit]=${limit}`
        );

        setLoading(false);
        setProductsMeta(response.data.meta);
        setProducts((prev) => [...prev, ...response.data.data]);
      } catch (error) {
        setLoading(false);
        console.error("Error from fetching blogs");
      }
    };

    fetchProducts();
  }, [start, limit]);

  useEffect(() => {
    if (inView) {
      setStart((prevStart) => prevStart + limit);
    }
  }, [inView]);

  const filterProducts = useCallback(() => {
    let filteredProducts = products;

    // filter by categories
    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (item) =>
          item.attributes.category.data.attributes.name === selectedCategory
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
        item.attributes.tags.data.some((tag) =>
          selectedTags.includes(tag.attributes.name)
        )
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

  const handleResetFilter = () => {
    setSelectedCategory("All");
    setSelectValue("Latest");
    setPrice([0, 2000]);
    setSelectedRatings([]);
    setSelectedTags([]);
  };

  const filteredProducts = filterProducts();
  const resultFound = filteredProducts.length;

  console.log("FilteredProducts", filteredProducts);

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
        resetFilter={handleResetFilter}
      />
      <Box className={styles.shop__contentWrapper}>
        <Box className={styles.shop__leftContent}>
          <Box className={styles.shop__categoriesFilterSection}>
            <FilterAccordion title="All Categories">
              <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                data={products}
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
                  category={item.attributes.category.data.attributes.name}
                  description={item.attributes.description}
                  discountPrice={item.attributes.discountPrice}
                  images={item.attributes.images.data}
                  averageRating={item.attributes.averageRating}
                  href={`/products/${item.id}`}
                  shortDescription={item.attributes.shortDescription}
                  weight={item.attributes.weight}
                  seller={item.attributes.users_permissions_user.data}
                  tags={item.attributes.tags.data}
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

          <Box>
            {productsMeta &&
            productsMeta.pagination.start > productsMeta.pagination.total ? (
              <Typography className={styles.shop__noMoreText}>
                No more products😊😊
              </Typography>
            ) : (
              <Box ref={ref}></Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Shop;
