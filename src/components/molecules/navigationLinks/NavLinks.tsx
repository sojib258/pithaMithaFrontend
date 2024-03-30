import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import styles from "./navlinks.module.scss";

const NavLinks = () => {
  const pages = [
    {
      id: 1,
      pageName: "Shop",
      pageLink: "/products",
    },
    {
      id: 2,
      pageName: "About",
      pageLink: "/about",
    },
    {
      id: 3,
      pageName: "Blog",
      pageLink: "/blogs",
    },
    {
      id: 4,
      pageName: "FAQ",
      pageLink: "/faq",
    },
    {
      id: 5,
      pageName: "Contact",
      pageLink: "/contact",
    },
  ];
  return (
    <Box component={"nav"} className={styles.navbar}>
      <Box component={"ul"} className={styles.navbar__ul}>
        {pages.map((item) => (
          <Box key={item.id} component={"li"} className={styles.navbar__li}>
            <Link className={styles.navbar__link} href={item.pageLink}>
              {item.pageName}
            </Link>
          </Box>
        ))}
      </Box>
      <Box className={styles.navbar__info}>
        <MailOutlineIcon sx={{ color: "#cccccc", fontSize: "1.3rem" }} />
        <Typography className={styles.navbar__infoGmail}>
          (sojibsrd85@gmail.com)
        </Typography>
      </Box>
    </Box>
  );
};

export default NavLinks;
