"use client";
import DashboardLinks from "@/components/molecules/dashboardLinks/DashboardLinks";
import CachedIcon from "@mui/icons-material/Cached";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navigations = [
    {
      id: 1,
      icon: <DashboardIcon />,
      text: "Dashboard",
      link: "/dashboard",
    },
    {
      id: 2,
      icon: <CachedIcon />,
      text: "Order History",
      link: "/dashboard/order-history",
    },
    {
      id: 3,
      icon: <FavoriteBorderIcon />,
      text: "Wishlist",
      link: "/dashboard/wishlist",
    },
    {
      id: 4,
      icon: <ShoppingCartOutlinedIcon />,
      text: "Shopping Cart",
      link: "/dashboard/shopping-cart",
    },
    {
      id: 5,
      icon: <SettingsOutlinedIcon />,
      text: "Settings",
      link: "/dashboard/settings",
    },
    {
      id: 6,
      icon: <LogoutIcon />,
      text: "Log-Out",
      link: "/logout",
    },
  ];

  const [activeLink, setActiveLink] = useState(pathname);

  console.log("ActiveLink", activeLink);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  return (
    <Box className={styles.dashboard}>
      <Box className={styles.dashboard__wrapper}>
        <Box className={styles.dashboard__leftContent}>
          <Box className={styles.dashboard__navigation}>
            <Typography className={styles.dashboard__navigationHead}>
              Navigation
            </Typography>
            {navigations.map((item) => (
              <DashboardLinks
                key={item.id}
                text={item.text}
                link={item.link}
                icon={item.icon}
                isActive={
                  pathname === item.link || activeLink.endsWith("order-details")
                }
                handleLinkClick={handleLinkClick}
              />
            ))}
          </Box>
        </Box>
        <Box className={styles.dashboard__rightContent}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
