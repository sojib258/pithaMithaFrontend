"use client";
import RadioAtom from "@/components/atoms/radio/Radio";
import FilterAccordion from "@/components/molecules/filterAccordion/FilterAccordion";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import { useSelector } from "react-redux";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
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
    return <CircularProgress />;
  }

  if (categoryErrorMsg) {
    return <Box>Error: {categoryErrorMsg}</Box>;
  }

  return (
    <FilterAccordion title="All Categories">
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={selectedCategory}
          name="radio-buttons-group"
        >
          <RadioAtom
            count={getProductCountForCategory("All")}
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
              count={getProductCountForCategory(item.name)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </FilterAccordion>
  );
};

export default CategoryFilter;
