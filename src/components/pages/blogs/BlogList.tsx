"use client";
import Button from "@/components/atoms/button/Button";
import BlogCart from "@/components/molecules/blogCart/BlogCart";
import BlogCartSkeleton from "@/components/molecules/skeleton/blogCartSkeleton/BlogCartSkeleton";
import BlogSidebar from "@/components/organisms/blogSidebar/BlogSidebar";
import TopFilter from "@/components/organisms/shopTopFilter/Filter";
import { BlogData, BlogsMeta } from "@/utils/typesDefine/blogSliceTypes";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./blog.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [blogsMeta, setBlogsMeta] = useState<BlogsMeta>();
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const categoryFromParams = searchParams.get("category") || "All";
  const searchValues = searchParams.get("blogsearch") || "";
  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryFromParams);
  const [selectValue, setSelectValue] = useState<string | number>("Latest");

  const selectBoxValue = ["Latest", "Random", "Oldest"];

  useEffect(() => {
    const fetchingBlogs = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/blogs?populate[category]=true&populate[tags]=true&populate[comments]=true&populate[featuredImage]=true&populate[users_permissions_user]=true&pagination[start]=${start}&pagination[limit]=${limit}`
        );

        setLoading(false);
        setBlogsMeta(response.data.meta);
        setBlogs((prev) => [...prev, ...response.data.data]);
      } catch (error) {
        setLoading(false);
        console.error("Error from fetching blogs");
      }
    };

    fetchingBlogs();
  }, [start, limit]);

  console.log("Render");

  const handleSelectValue = (value: string | number) => {
    setSelectValue(value);
  };

  const handleSelectedCategory = (value: string) => {
    setSelectedCategory(value);
  };

  const handleFetchBlogs = () => {
    setLoading(true);
    setStart(start + limit);
  };

  const filterBlogs = useCallback(() => {
    let filteredBlogs = blogs;

    // filter by categories
    if (selectedCategory !== "All") {
      filteredBlogs = filteredBlogs.filter(
        (item) =>
          item.attributes.category.data.attributes.name === selectedCategory
      );
    }

    // filter by tags
    if (selectedTags.length > 0) {
      filteredBlogs = filteredBlogs.filter((item) =>
        item.attributes.tags.data.some((tag) =>
          selectedTags.includes(tag.attributes.name)
        )
      );
    }

    // filter by search values
    if (searchValues) {
      filteredBlogs = filteredBlogs.filter((item) =>
        item.attributes.title.toLowerCase().includes(searchValues)
      );
    }

    // filter by selectValue
    switch (selectValue) {
      case "Latest":
        filteredBlogs = filteredBlogs.sort(
          (a, b) =>
            new Date(b.attributes.createdAt).getTime() -
            new Date(a.attributes.createdAt).getTime()
        );
        break;
      case "Random":
        filteredBlogs = filteredBlogs.sort(() => Math.random() - 0.5);
        break;
      case "Oldest":
        filteredBlogs = filteredBlogs.sort(
          (a, b) =>
            new Date(a.attributes.createdAt).getTime() -
            new Date(b.attributes.createdAt).getTime()
        );
        break;
    }

    return filteredBlogs;
  }, [blogs, selectedCategory, selectedTags, selectValue, searchValues]);

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
            data={blogs}
          />
        </Box>
        <Box className={styles.blog__rightContent}>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {filteredBlogs.map((item: BlogData) => {
              const {
                title,
                users_permissions_user,
                category,
                comments,
                featuredImage,
                createdAt,
              } = item.attributes;
              const commentCount = comments.data.length;
              return (
                <Grid flexGrow={1} key={item.id} sm={12} md={6} xl={4} item>
                  <Link href={`/blogs/${item.id}`}>
                    <BlogCart
                      title={title}
                      admin={users_permissions_user}
                      category={category}
                      featuredImage={featuredImage}
                      createdAt={createdAt}
                      commentCount={commentCount}
                    />
                  </Link>
                </Grid>
              );
            })}

            {loading &&
              [1, 2, 3].map((item) => (
                <Grid item key={item} sm={12} md={6} xl={4}>
                  <BlogCartSkeleton />
                </Grid>
              ))}

            {resultFound <= 0 && !loading && (
              <Typography className={styles.blog__nothing}>
                No blogs are found!😊😊
              </Typography>
            )}
          </Grid>
          <Box className={styles.blog__loadBtn}>
            {blogsMeta &&
            blogsMeta.pagination.total < blogsMeta.pagination.limit ? (
              <Button disabled text="You Reachout the End >" />
            ) : (
              <Button
                disabled={loading}
                onClick={handleFetchBlogs}
                text="Load More Blogs >"
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogList;
