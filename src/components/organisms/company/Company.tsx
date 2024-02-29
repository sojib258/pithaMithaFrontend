import Box from "@mui/material/Box";
import Image from "next/image";
import styles from "./company.module.scss";
const Company = () => {
  const companyLogo = [
    {
      imgSrc: "/img/14.png",
      altText: "logo image",
    },
    {
      imgSrc: "/img/15.png",
      altText: "logo image",
    },
    {
      imgSrc: "/img/14.png",
      altText: "logo image",
    },
    {
      imgSrc: "/img/15.png",
      altText: "logo image",
    },
    {
      imgSrc: "/img/14.png",
      altText: "logo image",
    },
    {
      imgSrc: "/img/15.png",
      altText: "logo image",
    },
  ];

  const responsive = {
    md: {
      breakpoint: { max: 4000, min: 900 },
      items: 3,
    },
    sm: {
      breakpoint: { max: 899, min: 600 },
      items: 2,
    },
    xs: {
      breakpoint: { max: 599, min: 500 },
      items: 2,
    },
    xxs: {
      breakpoint: { max: 499, min: 0 },
      items: 1,
    },
  };
  return (
    <Box className={styles.company}>
      {companyLogo.map((item, index) => (
        <Box key={index} className={styles.company__item}>
          <Image
            className={styles.company__img}
            width={100}
            height={100}
            src={item.imgSrc}
            alt={item.altText}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Company;
