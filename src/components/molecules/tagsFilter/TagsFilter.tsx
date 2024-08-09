"use client";
import TagAtom from "@/components/atoms/tagButton/TagButton";
import { TagData } from "@/utils/typesDefine/tagSliceTypes";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

interface TagsFilterProps {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagsFilter: React.FC<TagsFilterProps> = ({
  selectedTags,
  setSelectedTags,
}) => {
  const [tags, setTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchingTags = async () => {
      try {
        const response = await axios.get(`${API_URL}/tags`);
        setLoading(false);
        setTags(response.data.data);
      } catch (error) {
        console.error("Error from fetching tags");
      }
    };
    fetchingTags();
  }, []);

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
      {tags.map((tag) => (
        <TagAtom
          key={tag.id}
          label={tag.attributes.name}
          selected={selectedTags.includes(tag.attributes.name)}
          onClick={() => handleTagClick(tag.attributes.name)}
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
