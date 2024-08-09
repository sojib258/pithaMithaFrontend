"use client";
import RadioAtom from "@/components/atoms/radio/Radio";
import CategoryItem from "@/components/molecules/skeleton/categories/CategoryItem";
import { RootState } from "@/store/store";
import { BlogData } from "@/utils/typesDefine/blogSliceTypes";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import { useSelector } from "react-redux";
import styles from "./categoryFIlter.module.scss";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  find?: string; // blogs | products
  data?: BlogData[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  find = "products",
  data = [],
}) => {
  const { category, products } = useSelector((state: RootState) => state);

  const {
    items: categories,
    loading: categoryLoading,
    errorMsg: categoryErrorMsg,
  } = category;

  const {
    items: allProducts,
    loading: productsLoading,
    errorMsg: productErrorMsg,
  } = products;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Find Blogs for Category
  const getBlogCountForCategory = (category: string) => {
    if (category === "All") {
      return data.length;
    } else {
      return data.filter(
        (item) => item.attributes.category.data.attributes.name === category
      ).length;
    }
  };

  // Find Products for Category
  const getProductCountForCategory = (category: string) => {
    if (category === "All") {
      return allProducts.length;
    } else {
      return allProducts.filter(
        (item) => item.attributes.category.name === category
      ).length;
    }
  };

  if (categoryLoading) {
    const categoryItem = [
      {
        width: "100%",
      },
      {
        width: "90%",
      },
      {
        width: "80%",
      },
      {
        width: "70%",
      },
      {
        width: "80%",
      },
      {
        width: "90%",
      },
      {
        width: "100%",
      },
    ];
    return (
      <>
        {categoryItem.map((item, index) => (
          <CategoryItem key={index} width={item.width} />
        ))}
      </>
    );
  }

  if (categoryErrorMsg) {
    return <Box>Error: {categoryErrorMsg}</Box>;
  }

  return (
    <FormControl className={`${styles.categoryFilter} categoryFilter`}>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={selectedCategory}
        name="radio-buttons-group"
      >
        <RadioAtom
          count={
            find === "blogs"
              ? getBlogCountForCategory("All")
              : getProductCountForCategory("All")
          }
          label="All"
          value="All"
          onChange={handleCategoryChange}
        />
        {categories.map((item) => (
          <RadioAtom
            key={item.id}
            onChange={handleCategoryChange}
            label={item.name}
            value={item.name}
            count={
              find === "blogs"
                ? getBlogCountForCategory(item.name)
                : getProductCountForCategory(item.name)
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CategoryFilter;
