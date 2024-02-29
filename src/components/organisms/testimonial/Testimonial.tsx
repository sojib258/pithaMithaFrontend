"use client";
import TestimonialCart from "@/components/molecules/testimonialCart/TestimonialCart";
import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./testimonial.module.scss";
const Testimonial = () => {
  const { smScreen } = useResponsive();
  const testimonial = [
    {
      imgSrc: "/img/8.jpg",
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim facere alias accusantium esse, doloribus consequuntur aliquid sunt ipsum.",
      name: "Sojib Hasan",
      jobTitle: "Front-End-Developer",
      rating: 4,
    },
    {
      imgSrc: "/img/8.jpg",
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim facere alias accusantium esse, doloribus consequuntur aliquid sunt ipsum.",
      name: "Sojib Hasan",
      jobTitle: "Front-End-Developer",
      rating: 4,
    },
    {
      imgSrc: "/img/6.jpg",
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim facere alias accusantium esse, ",
      name: "Sojib Hasan",
      jobTitle: "Front-End-Developer",
      rating: 4,
    },
    {
      imgSrc: "/img/7.jpg",
      msg: "Lorem ipsum dolor sit amet consectetur adipisici",
      name: "Sojib Hasan",
      jobTitle: "Front-End-Developer",
      rating: 4,
    },
    {
      imgSrc: "/img/8.jpg",
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim facere alias accusantium esse, doloribus consequuntur aliquid sunt ipsum.",
      name: "Sojib Hasan",
      jobTitle: "Front-End-Developer",
      rating: 4,
    },
    {
      imgSrc: "/img/8.jpg",
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim facere alias accusantium esse, doloribus consequuntur aliquid sunt ipsum.",
      name: "Sojib Hasan",
      jobTitle: "Front-End-Developer",
      rating: 4,
    },
    {
      imgSrc: "/img/8.jpg",
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim facere alias accusantium esse, doloribus consequuntur aliquid sunt ipsum.",
      name: "Sojib Hasan",
      jobTitle: "Front-End-Developer",
      rating: 4,
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
    <Box
      className={`testimonial ${styles.testimonial} ${
        smScreen && "testimonial__smScreen"
      }`}
    >
      <Typography className={styles.testimonial__headText}>
        Client Testimonial
      </Typography>
      <Carousel responsive={responsive} ssr={true}>
        {testimonial.map((item, index) => (
          <TestimonialCart
            key={index}
            imgSrc={item.imgSrc}
            jobTitle={item.jobTitle}
            msg={item.msg}
            name={item.name}
            rating={item.rating}
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default Testimonial;
