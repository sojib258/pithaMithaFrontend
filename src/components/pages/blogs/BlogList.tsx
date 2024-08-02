"use client";
import BlogCart from "@/components/molecules/blogCart/BlogCart";
import ProductSkeleton from "@/components/molecules/skeleton/product/ProductSkeleton";
import BlogSidebar from "@/components/organisms/blogSidebar/BlogSidebar";
import TopFilter from "@/components/organisms/shopTopFilter/Filter";
import { fetchBlogs } from "@/store/feature/blog/BlogSlice";
import { fetchCategory } from "@/store/feature/category/CategorySlice";
import { fetchTags } from "@/store/feature/tags/TagsSlice";
import { RootState } from "@/store/store";
import { BlogData } from "@/utils/typesDefine/blogSliceTypes";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./blog.module.scss";

const BlogList = () => {
  const {
    items: blogs,
    loading,
    errorMsg,
  } = useSelector((state: RootState) => state.blogs);
  const searchParams = useSearchParams();
  const categoryFromParams = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryFromParams);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState<string | number>("Random");
  const dispatch = useDispatch();

  const selectBoxValue = ["Latest", "Popular", "Random"];

  useEffect(() => {
    dispatch(fetchBlogs() as any);
    dispatch(fetchCategory() as any);
    dispatch(fetchTags() as any);
  }, [dispatch]);

  const handleSelectValue = (value: string | number) => {
    setSelectValue(value);
  };

  const handleSelectedCategory = (value: string) => {
    setSelectedCategory(value);
  };

  const filterBlogs = useCallback(() => {
    let filteredBlogs = blogs;

    // filter by categories
    if (selectedCategory !== "All") {
      filteredBlogs = filteredBlogs.filter(
        (item) => item.attributes.category.name === selectedCategory
      );
    }

    // filter by tags
    if (selectedTags.length > 0) {
      filteredBlogs = filteredBlogs.filter((item) =>
        item.attributes.tags.some((tag) => selectedTags.includes(tag.name))
      );
    }

    return filteredBlogs;
  }, [blogs, selectedCategory, selectedTags]);

  const filteredBlogs = filterBlogs();
  const resultFound = filteredBlogs.length;

  return (
    <Box className={styles.blog}>
      <TopFilter
        resultFound={resultFound}
        selectBoxValue={selectBoxValue}
        selectValue={selectValue}
        handleSelectValue={handleSelectValue}
      />
      <Box className={styles.blog__contentWrapper}>
        <Box className={styles.blog__leftContent}>
          <BlogSidebar
            selectedCategory={selectedCategory}
            handleSelectedCategory={handleSelectedCategory}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </Box>
        <Box className={styles.blog__rightContent}>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {resultFound > 0 ? (
              filteredBlogs.map((item: BlogData) => {
                const { title, author, category, featuredImage, createdAt } =
                  item.attributes;
                return (
                  <Grid flexGrow={1} key={item.id} sm={12} md={6} xl={4} item>
                    <Link href={`/blogs/${item.id}`}>
                      <BlogCart
                        title={title}
                        admin={author}
                        category={category}
                        featuredImage={featuredImage}
                        createdAt={createdAt}
                      />
                    </Link>
                  </Grid>
                );
              })
            ) : loading ? (
              [1, 2, 3].map((item) => (
                <Stack
                  key={item}
                  mr={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <ProductSkeleton />
                </Stack>
              ))
            ) : (
              <Typography className={styles.blog__nothing}>
                No blogs are found!😊😊
              </Typography>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogList;
