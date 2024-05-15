import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import styles from "./styles.module.scss";

interface CategoryItemProps {
  width?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ width }) => {
  return (
    <Box sx={{ width: width }} className={styles.sklItem}>
      <Skeleton className={styles.sklItem__text} />
    </Box>
  );
};

export default CategoryItem;
