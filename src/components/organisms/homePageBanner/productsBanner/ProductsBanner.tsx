import BannerCart from "@/components/molecules/bannerCart/BannerCart";
import { Grid } from "@mui/material";
const ProductsBanner = () => {
  const banner = [
    {
      subhead: "86% FAT FREE",
      head: "100% Fresh Pitha",
      text: "Started at",
      pirce: "120",
      imgSrc: "/img/13.png",
    },
    {
      subhead: "86% FAT FREE",
      head: "100% Fresh Pitha",
      text: "Started at",
      pirce: "120",
      imgSrc: "/img/6-removebg-preview.png",
    },
    {
      subhead: "86% FAT FREE",
      head: "100% Fresh Pitha",
      text: "Started at",
      pirce: "120",
      imgSrc: "/img/5.png",
    },
  ];
  return (
    <Grid container spacing={2}>
      {banner.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <BannerCart
            subhead={item.subhead}
            head={item.head}
            text={item.text}
            price={item.pirce}
            imgSrc={item.imgSrc}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsBanner;
