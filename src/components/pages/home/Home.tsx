import Categories from "@/components/organisms/categories/Categories";
import CompanyLogo from "@/components/organisms/company/Company";
import FeaturedService from "@/components/organisms/featuredService/FeaturedService";
import DiscountBanner from "@/components/organisms/homePageBanner/discountBanner/DiscountBanner";
import Banner from "@/components/organisms/homePageBanner/mainBanner/Banner";
import ProductsBanner from "@/components/organisms/homePageBanner/productsBanner/ProductsBanner";
import LatestNews from "@/components/organisms/latestNews/LatestNews";
import Featured from "@/components/organisms/products/featured/Featured";
import HotDeals from "@/components/organisms/products/hotDeals/HotDeals";
import PopularProducts from "@/components/organisms/products/popular/Products";
import Testimonial from "@/components/organisms/testimonial/Testimonial";
import Box from "@mui/material/Box";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <>
      {/* Main Banner Area */}
      <Banner />

      {/* Featured Area */}
      <Box component={"section"} className={styles.featuredService}>
        <Box className={styles.featuredService__wrapper}>
          <FeaturedService />
        </Box>
      </Box>

      {/* Categories Area */}
      <Box component={"section"} className={styles.categories}>
        <Box className={styles.categories__wrapper}>
          <Categories />
        </Box>
      </Box>

      {/* Product Area */}
      <Box component={"section"} className={styles.popularProducts}>
        <Box className={styles.popularProducts__wrapper}>
          <PopularProducts />
        </Box>
      </Box>

      {/* Product Banner */}
      <Box component={"section"} className={styles.productBanner}>
        <Box className={styles.productBanner__wrapper}>
          <ProductsBanner />
        </Box>
      </Box>

      {/* Hot Deals Area */}
      <Box component={"section"} className={styles.hotDeals}>
        <Box className={styles.hotDeals__wrapper}>
          <HotDeals />
        </Box>
      </Box>

      {/* Discount Banner Area */}
      <Box component={"section"} className={styles.discoverBanner}>
        <Box className={styles.discoverBanner__wrapper}>
          <DiscountBanner />
        </Box>
      </Box>

      {/* Featured Products Area */}
      <Box component={"section"} className={styles.featuredProduct}>
        <Box className={styles.featuredProduct__wrapper}>
          <Featured />
        </Box>
      </Box>

      {/* Latest News Area */}
      <Box component={"section"} className={styles.latestNews}>
        <Box className={styles.latestNews__wrapper}>
          <LatestNews />
        </Box>
      </Box>

      {/* Testimonial Area */}
      <Box component={"section"} className={styles.testimonial}>
        <Box className={styles.testimonial__wrapper}>
          <Testimonial />
        </Box>
      </Box>

      {/* Company Area */}
      <Box component={"section"} className={styles.company}>
        <Box className={styles.company__wrapper}>
          <CompanyLogo />
        </Box>
      </Box>
    </>
  );
};

export default Home;
