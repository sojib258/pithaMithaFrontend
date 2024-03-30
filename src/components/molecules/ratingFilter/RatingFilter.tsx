"use client";
import CheckboxAtom from "@/components/atoms/checkbox/Checkbox";
import Rating from "@/components/atoms/ratings/Rating";
import useResponsive from "@/hooks/useResponsive";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

interface RatingFilterProps {
  selectedRatings: number[];
  setSelectedRatings: React.Dispatch<React.SetStateAction<number[]>>;
}

const RatingFilter: React.FC<RatingFilterProps> = ({
  selectedRatings,
  setSelectedRatings,
}) => {
  const value = [5, 4, 3, 2, 1];
  const { downMdScreen } = useResponsive();

  const handleRatingChange = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  return (
    <>
      {value.map((rating) => (
        <FormGroup key={rating} className={"filterByRating"}>
          <FormControlLabel
            control={
              <CheckboxAtom
                onChange={() => handleRatingChange(rating)}
                checked={selectedRatings.includes(rating)}
              />
            }
            label={
              <Rating
                fontSize={downMdScreen ? "15px!important" : "20px!important"}
                readOnly
                value={rating}
              />
            }
          />
        </FormGroup>
      ))}
    </>
  );
};

export default RatingFilter;
