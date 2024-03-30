"use client";
import BlogCart from "@/components/molecules/blogCart/BlogCart";
import BlogSidebar from "@/components/organisms/blogSidebar/BlogSidebar";
import TopFilter from "@/components/organisms/shopTopFilter/Filter";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./blog.module.scss";

const BlogList = () => {
  let products = useSelector((state: RootState) => state.products.items);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState("Latest");
  const resultFound = products.length;
  const selectBoxValue = ["Latest", "Popular", "Low to High", "High to Low"];

  const news = [
    {
      imgSrc: "/img/7.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut",
      tag: "Food",
      admin: "Sojib",
      commentCount: 199,
      imgAlt: "Blog Image",
      date: 12,
      month: "Jan",
    },
    {
      imgSrc: "/img/9.jpg",
      title: "Lorem ipsum dolor sit ame",
      tag: "Food",
      admin: "Sojib",
      commentCount: 59,
      imgAlt: "Blog Image",
      date: 13,
      month: "Aug",
    },
    {
      imgSrc: "/img/11.jpg",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      tag: "Food",
      admin: "Sojib",
      commentCount: 199,
      imgAlt: "Blog Image",
      date: 31,
      month: "Mar",
    },
  ];

  const handleSelectValue = (value: string) => {
    setSelectValue(value);
  };

  return (
    <Box className={styles.blog}>
      {/* Blog Page Top Section Area */}
      <TopFilter
        resultFound={resultFound}
        selectBoxValue={selectBoxValue}
        selectValue={selectValue}
        handleSelectValue={handleSelectValue}
      />
      <Box className={styles.blog__contentWrapper}>
        <Box className={styles.blog__leftContent}>
          {/* Blog Left Sidebar Area */}
          <BlogSidebar />
        </Box>
        <Box className={styles.blog__rightContent}>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {news.map((item, index) => (
              <Grid flexGrow={1} key={index} sm={12} md={6} xl={4} item>
                <BlogCart
                  title={item.title}
                  admin={item.admin}
                  commentCount={item.commentCount}
                  tag={item.tag}
                  imgAlt={item.imgAlt}
                  imgSrc={item.imgSrc}
                  date={item.date}
                  month={item.month}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogList;
