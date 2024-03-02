import CategoryFilter from "@/components/molecules/categoryFilter/CategoryFilter";
import PriceFilter from "@/components/molecules/priceFilter/PriceRange";
import Box from "@mui/material/Box";
import styles from "./shop.module.scss";
const Shop = () => {
  return (
    <Box className={`shopPage ${styles.shop}`}>
      <Box className={styles.shop__leftContent}>
        {/* Categories Filter Area */}
        <Box className={styles.shop__categoriesFilterSection}>
          <CategoryFilter />
        </Box>

        {/* Price Filter Section */}
        <Box className={styles.shop__priceFilterSection}>
          <PriceFilter />
        </Box>
      </Box>
      <Box className={styles.shop__rightContent}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet iste
          architecto esse quasi quidem vero provident itaque praesentium minima
          dolores quia alias ducimus reiciendis, ipsa modi ad sint facilis at
          dolore accusantium totam illo commodi tenetur laudantium. Doloribus
          nemo hic adipisci corrupti, nostrum quis error. Impedit esse maxime
          enim soluta fugit ut, aut provident rem, sapiente ab minima vitae
          asperiores recusandae amet sunt beatae consequatur odio quasi sit
          quibusdam eligendi reprehenderit magnam commodi! Tempora ex, minima at
          aperiam velit nobis tenetur natus quisquam delectus. Nobis
          voluptatibus vel pariatur fuga libero atque quisquam cumque unde
          facere, doloribus delectus nisi maxime iste?
        </p>
      </Box>
    </Box>
  );
};

export default Shop;
