import Button from "@/components/atoms/button/Button";
import ListItem from "@/components/atoms/listItem/ListItem";
import Feature from "@/components/molecules/aboutFeature/Feature";
import Heading from "@/components/molecules/aboutHeading/Heading";
import CompanyLogo from "@/components/organisms/company/Company";
import Testimonial from "@/components/organisms/testimonial/Testimonial";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.scss";
const AboutPage = () => {
  const feature = [
    {
      id: 1,
      imgSrc: "/icons/aboutPage/1.svg",
      altText: "Organic-food",
      title: "100% Fresh Pitha",
      description: "100% healthy & fresh pitah",
    },
    {
      id: 2,
      imgSrc: "/icons/aboutPage/2.svg",
      altText: "Support-Image",
      title: "Great Support 24/7",
      description: "Instant access to Contact",
    },
    {
      id: 3,
      imgSrc: "/icons/aboutPage/3.svg",
      altText: "Feedback",
      title: "Customer Feedback",
      description: "Our happy customer",
    },
    {
      id: 4,
      imgSrc: "/icons/aboutPage/4.svg",
      altText: "Payment",
      title: "100% Sucure Payment",
      description: "We ensure your money is save",
    },
    {
      id: 5,
      imgSrc: "/icons/aboutPage/5.svg",
      altText: "Shipping",
      title: "Free Shipping",
      description: "Free shipping with discount",
    },
    {
      id: 6,
      imgSrc: "/icons/aboutPage/6.svg",
      altText: "Healthy",
      title: "100% Healthy Pitha",
      description: "Home made healthy pitah",
    },
  ];
  const listFeature = [
    "Sed in metus pellentesque.",
    "Fusce et ex commodo, aliquam nulla efficitur, tempus lorem.",
    "Maecenas ut nunc fringilla erat varius.",
  ];
  return (
    <Box className={styles.about}>
      {/* About Top First Section Area Start */}
      <Box component={"section"} sx={{ backgroundColor: "#fff" }}>
        <Grid className={styles.about__topOne} container>
          <Grid item xs={12} md={6} className={styles.about__topOneLeft}>
            <Heading
              heading="100% Trusted Organic Food Store"
              para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, minima! Sapiente, error distinctio aut impedit itaque minus labore ex rerum, adipisci dicta voluptatibus ducimus voluptatem incidunt possimus nulla cupiditate ratione numquam? Assumenda fugiat nihil asperiores?"
            />
          </Grid>
          <Grid item xs={12} md={6} className={styles.about__topOneRight}>
            <Image
              className={styles.about__img}
              width={400}
              height={400}
              alt="about_image"
              src={"/img/about/takingPic.jpg"}
            />
          </Grid>
        </Grid>
      </Box>
      {/* About Top First Section Area End */}

      {/* About Top Second Section Area Start */}
      <Box component={"section"} sx={{ backgroundColor: "#f2f2f2" }}>
        <Grid className={styles.about__topTwo} container>
          <Grid item xs={12} md={6} className={styles.about__topTwoLeft}>
            <Image
              className={styles.about__img}
              width={600}
              height={600}
              alt="about_image"
              src={"/img/about/eating.jpg"}
            />
          </Grid>
          <Grid item xs={12} md={6} className={styles.about__topTwoRight}>
            <Heading
              heading="100% Trusted Online Food Store"
              para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, minima! Sapiente, error distinctio aut impedit itaque minus labore ex rerum, adipisci dicta voluptatibus ducimus voluptatem incidunt possimus nulla cupiditate ratione numquam? Assumenda fugiat nihil asperiores?"
            />
            <Grid container>
              {feature.map((item, index) => (
                <Grid
                  className={styles.about__topTwoFeature}
                  item
                  xs={12}
                  sm={6}
                  key={index}
                >
                  <Feature
                    key={item.id}
                    description={item.description}
                    src={item.imgSrc}
                    heading={item.title}
                    altText={item.altText}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* About Top Second Section Area End */}

      {/* About Delivery Section Area Start */}
      <Box component={"section"} sx={{ backgroundColor: "#fff" }}>
        <Grid className={styles.about__delivery} container>
          <Grid item xs={12} md={6} className={styles.about__deliveryLeft}>
            <Heading
              heading="We Delivered, You Enjoy Your Order."
              para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, minima! Sapiente, error distinctio aut impedit itaque minus labore ex rerum, adipisci dicta voluptatibus ducimus voluptatem incidunt possimus nulla cupiditate ratione numquam? Assumenda fugiat nihil asperiores?"
            />
            {listFeature.map((item, index) => (
              <Box key={index} className={styles.about__deliveryFeature}>
                <ListItem text={item} />
              </Box>
            ))}
            <Link href={"/products"}>
              <Box
                mt={2}
                mb={{ xs: 4, md: 0 }}
                className={styles.about__deliveryShopBtn}
              >
                <Button
                  customStyle={{ borderRadius: "25px" }}
                  arrowIcon
                  text="Shop Now"
                />
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} className={styles.about__deliveryRight}>
            <Image
              className={styles.about__img}
              width={400}
              height={400}
              alt="about_image"
              src={"/img/about/delivery.jpg"}
            />
          </Grid>
        </Grid>
      </Box>
      {/* About Delivery Section Area End */}

      {/* Testimonial Area */}
      <Box component={"section"} sx={{ backgroundColor: "#f2f2f2" }}>
        <Box className={styles.about__testimonial}>
          <Testimonial />
        </Box>
      </Box>

      {/* Company Area */}
      <Box component={"section"}>
        <Box className={styles.about__company}>
          <CompanyLogo />
        </Box>
      </Box>
    </Box>
  );
};

export default AboutPage;
