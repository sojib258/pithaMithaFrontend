"use client";
import InputText from "@/components/atoms/inputText/InputText";
import CategoryFilter from "@/components/molecules/categoryFilter/CategoryFilter";
import TagsFilter from "@/components/molecules/tagsFilter/TagsFilter";
import { BlogData } from "@/utils/typesDefine/blogSliceTypes";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./blogSidebar.module.scss";

interface BlogSideBarProps {
  selectedCategory: string;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleSelectedCategory: (value: string) => void;
  data?: BlogData[];
}

const BlogSidebar: React.FC<BlogSideBarProps> = ({
  selectedCategory,
  selectedTags,
  handleSelectedCategory,
  setSelectedTags,
  data = [],
}) => {
  const [blogSearch, setBlogSearch] = useState<string>("");
  const router = useRouter();

  const handleBlogSearch = (value: string) => {
    setBlogSearch(value);
    const queryParams = new URLSearchParams();
    if (value) {
      queryParams.set("blogsearch", value);
    } else {
      queryParams.delete("blogsearch");
    }
    router.push(`/blogs?${queryParams.toString()}`);
  };

  return (
    <Box className={styles.blogSidebar}>
      <Box className={styles.blogSidebar__searchBar}>
        <InputText onChange={handleBlogSearch} icon placeholder="Search..." />
      </Box>

      {/* Categories Filter Area */}
      <Box className={styles.blogSidebar__categoriesFilterSection}>
        <Typography className={styles.blogSidebar__categoriesText}>
          Categories
        </Typography>
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={handleSelectedCategory}
          find="blogs"
          data={data}
        />
      </Box>

      {/* Tags Filter Section */}
      <Box className={styles.blogSidebar__tagsFilterSection}>
        <Typography className={styles.blogSidebar__tagText}>Tags</Typography>
        <TagsFilter
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </Box>
    </Box>
  );
};

export default BlogSidebar;
