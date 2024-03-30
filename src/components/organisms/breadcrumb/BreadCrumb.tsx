"use client";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./breadcrumb.module.scss";

const BreadCrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  if (paths === "/") {
    return;
  }

  return (
    <Box className={styles.breadcrumb}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link className={styles.breadcrumb__homeIcon} href="/">
          <HomeOutlinedIcon />
        </Link>
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemLink = link[0].toUpperCase() + link.slice(1, link.length);
          return (
            <Link key={index} className={styles.breadcrumb__link} href={href}>
              {itemLink}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumb;
