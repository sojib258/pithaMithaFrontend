import useResponsive from "@/hooks/useResponsive";
import { Rating as MuiRating } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./rating.module.scss";

interface ratinProps {
  value?: number;
  readOnly?: boolean;
  customStyle?: object;
  reviewText?: boolean;
  fontSize?: string;
}

const Rating: React.FC<ratinProps> = ({
  readOnly = false,
  customStyle,
  reviewText = false,
  value,
  fontSize,
}) => {
  const { downSmScreen } = useResponsive();

  return (
    <Box
      className={`${styles.rating} ${
        downSmScreen && "rating__smallScreen"
      } rating`}
      style={customStyle}
    >
      <MuiRating
        className={styles.rating__icon}
        name="simple-controlled"
        value={value}
        readOnly={readOnly}
        sx={{ fontSize: fontSize }}
      />

      {reviewText && (
        <Typography className={styles.rating__reviewText}>
          (4 Review)
        </Typography>
      )}
    </Box>
  );
};

export default Rating;
