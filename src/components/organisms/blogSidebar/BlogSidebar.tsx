"use client";
import InputText from "@/components/atoms/inputText/InputText";
import CategoryFilter from "@/components/molecules/categoryFilter/CategoryFilter";
import RecentBlogCart from "@/components/molecules/recentBlogCart/RecentBlogCart";
import TagsFilter from "@/components/molecules/tagsFilter/TagsFilter";
import { RootState } from "@/store/store";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import styles from "./blogSidebar.module.scss";

interface BlogSideBarProps {
  selectedCategory: string;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleSelectedCategory: (value: string) => void;
}

const BlogSidebar: React.FC<BlogSideBarProps> = ({
  selectedCategory,
  selectedTags,
  handleSelectedCategory,
  setSelectedTags,
}) => {
  let products = useSelector((state: RootState) => state.products.items);

  const news = [1, 2, 3];

  return (
    <Box className={styles.blogSidebar}>
      <Box className={styles.blogSidebar__searchBar}>
        <InputText icon placeholder="Search..." />
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

      {/* Recent Blog Area */}
      <Box className={styles.blogSidebar__recectBlogArea}>
        <Typography className={styles.blogSidebar__recentText}>
          Recently Added
        </Typography>
        {news.map((item, index) => (
          <RecentBlogCart key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default BlogSidebar;
