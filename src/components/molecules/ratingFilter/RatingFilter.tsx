"use client";
import CheckboxAtom from "@/components/atoms/checkbox/Checkbox";
import Rating from "@/components/atoms/ratings/Rating";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FilterAccordion from "../filterAccordion/FilterAccordion";

interface RatingFilterProps {
  selectedRatings: number[];
  setSelectedRatings: React.Dispatch<React.SetStateAction<number[]>>;
}

const RatingFilter: React.FC<RatingFilterProps> = ({
  selectedRatings,
  setSelectedRatings,
}) => {
  const value = [5, 4, 3, 2, 1];

  const handleRatingChange = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  return (
    <FilterAccordion title="Rating">
      {value.map((rating) => (
        <FormGroup key={rating} className={"filterByRating"}>
          <FormControlLabel
            control={
              <CheckboxAtom
                onChange={() => handleRatingChange(rating)}
                checked={selectedRatings.includes(rating)}
              />
            }
            label={<Rating readOnly value={rating} />}
          />
        </FormGroup>
      ))}
    </FilterAccordion>
  );
};

export default RatingFilter;
