import TagAtom from "@/components/atoms/tagButton/TagButton";
import { RootState } from "@/store/store";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useSelector } from "react-redux";

interface TagsFilterProps {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagsFilter: React.FC<TagsFilterProps> = ({
  selectedTags,
  setSelectedTags,
}) => {
  const { items: tagItems, loading } = useSelector(
    (state: RootState) => state.tags
  );

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // for loading skeleton
  const tagsSkeleton = [1, 2, 3, 4, 5, 6];

  if (loading) {
    return tagsSkeleton.map((item) => <Skeleton key={item} width={"100px"} />);
  }

  return (
    <Box
      sx={{ border: "1px solid #cccccc", padding: "10px 5px" }}
      display="flex"
      flexWrap="wrap"
    >
      {tagItems.map((tag) => (
        <TagAtom
          key={tag.id}
          label={tag.name}
          selected={selectedTags.includes(tag.name)}
          onClick={() => handleTagClick(tag.name)}
          sx={{
            margin: "0px 5px 10px 0px",
            padding: "3px 8px!important",
            fontSize: ".75rem!important",
            minWidth: "10px",
          }}
        />
      ))}
    </Box>
  );
};

export default TagsFilter;
