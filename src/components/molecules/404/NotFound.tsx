import Button from "@/components/atoms/button/Button";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import styles from "./notFound.module.scss";
const NotFound = () => {
  return (
    <Box className={styles.notFound}>
      <Image
        className={styles.notFound__img}
        width={300}
        height={300}
        alt={"Not found image"}
        src={"/img/404.png"}
      />
      <Box className={styles.notFound__content}>
        <Typography className={styles.notFound__ops} component={"h2"}>
          Oops! page not found
        </Typography>
        <Typography className={styles.notFound__para}>
          Sorry! the page you are looking for doesn't exist or an other error
          occured.
        </Typography>
        <Link href={"/"}>
          <Button customStyle={{ borderRadius: "25px" }} text="Back to Home" />
        </Link>
      </Box>
    </Box>
  );
};

export default NotFound;
