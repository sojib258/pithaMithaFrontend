"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./categoryItem.module.scss";
interface CategoryItemProps {
  imgSrc: string;
  text: string;
  altText?: string;
}
const CategoryItem: React.FC<CategoryItemProps> = ({
  imgSrc,
  text,
  altText,
}) => {
  const router = useRouter();

  const handleCategory = () => {
    router.push(`/products?category=${text}`);
  };
  return (
    <Box onClick={handleCategory} className={styles.category}>
      <Image
        className={styles.category__img}
        width={200}
        height={150}
        src={imgSrc}
        alt={altText ? altText : "Product Image"}
      />
      <Typography className={styles.category__text}>{text}</Typography>
    </Box>
  );
};

export default CategoryItem;
