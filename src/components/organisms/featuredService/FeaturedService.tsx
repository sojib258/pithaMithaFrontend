import FeaturedItem from "@/components/molecules/featuredItem/FeaturedItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styles from "./featured.module.scss";
const FeaturedService = () => {
  const featured = [
    {
      iconSrc: "/icons/truck.png",
      altText: "Truck Image",
      title: "Free Shipping",
      description: "Free shipping on all your order",
    },
    {
      iconSrc: "/icons/headphone.png",
      altText: "Headphone Image",
      title: "Customer Support 24/7",
      description: "Instant access to Support",
    },
    {
      iconSrc: "/icons/bag.png",
      altText: "Bag Image",
      title: "100% Secure Payment",
      description: "We ensure your money is save",
    },
    {
      iconSrc: "/icons/package.png",
      altText: "Package  Image",
      title: "Money-Back Guarantee",
      description: "30 Days Money-Back Guarantee",
    },
  ];

  return (
    <>
      <Box className={styles.featured}>
        <Grid container className={styles.featured__container}>
          {featured.map((item, index) => (
            <Grid
              className={styles.featured__gridBox}
              key={index}
              item
              xs={12}
              sm={6}
              lg={3}
            >
              <FeaturedItem
                iconSrc={item.iconSrc}
                altText={item.altText}
                title={item.title}
                description={item.description}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default FeaturedService;
