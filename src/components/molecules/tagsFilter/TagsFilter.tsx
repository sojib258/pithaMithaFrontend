import TagAtom from "@/components/atoms/tagButton/TagButton";
import Box from "@mui/material/Box";
import React from "react";

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
    <Box display="flex" flexWrap="wrap">
      {popularTags.map((tag) => (
        <TagAtom
          key={tag}
          label={tag}
          selected={selectedTags.includes(tag)}
          onClick={() => handleTagClick(tag)}
          sx={{ margin: "0px 10px 10px 0px" }}
        />
      ))}
    </Box>
  );
};

export default TagsFilter;
