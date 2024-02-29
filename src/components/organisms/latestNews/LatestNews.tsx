import NewsCart from "@/components/molecules/newsCart/NewsCart";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "./latestNews.module.scss";
const LatestNews = () => {
  const news = [
    {
      imgSrc: "/img/7.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut",
      tag: "Food",
      admin: "Sojib",
      commentCount: 199,
      imgAlt: "Blog Image",
      date: 12,
      month: "Jan",
    },
    {
      imgSrc: "/img/9.jpg",
      title: "Lorem ipsum dolor sit ame",
      tag: "Food",
      admin: "Sojib",
      commentCount: 59,
      imgAlt: "Blog Image",
      date: 13,
      month: "Aug",
    },
    {
      imgSrc: "/img/11.jpg",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      tag: "Food",
      admin: "Sojib",
      commentCount: 199,
      imgAlt: "Blog Image",
      date: 31,
      month: "Mar",
    },
  ];
  return (
    <Box className={styles.news}>
      <Typography className={styles.news__headText}>Latest News</Typography>
      <Grid container spacing={2}>
        {news.map((item, index) => (
          <Grid key={index} xs={12} sm={6} md={4} item>
            <NewsCart
              title={item.title}
              admin={item.admin}
              commentCount={item.commentCount}
              tag={item.tag}
              imgAlt={item.imgAlt}
              imgSrc={item.imgSrc}
              date={item.date}
              month={item.month}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LatestNews;
