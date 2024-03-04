import TagAtom from "@/components/atoms/tagButton/TagButton";
import Box from "@mui/material/Box";
import React from "react";
import FilterAccordion from "../filterAccordion/FilterAccordion";

interface TagsFilterProps {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagsFilter: React.FC<TagsFilterProps> = ({
  selectedTags,
  setSelectedTags,
}) => {
  const popularTags = ["Healthy", "Low-Fat", "Vegetarian", "Sweets"];

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <FilterAccordion title="Popular Tags">
      <Box display="flex" flexWrap="wrap">
        {popularTags.map((tag) => (
          <TagAtom
            key={tag}
            label={tag}
            selected={selectedTags.includes(tag)}
            onClick={() => handleTagClick(tag)}
          />
        ))}
      </Box>
    </FilterAccordion>
  );
};

export default TagsFilter;
