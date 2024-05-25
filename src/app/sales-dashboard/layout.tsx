"use client";
import DashboardLinks from "@/components/molecules/dashboardLinks/DashboardLinks";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [activeLinkId, setActiveLinkId] = useState<number | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const navigations = useMemo(
    () => [
      {
        id: 1,
        icon: <DashboardIcon />,
        text: "Dashboard",
        link: "/sales-dashboard",
      },
      {
        id: 2,
        icon: <ShoppingCartOutlinedIcon />,
        text: "Product",
        link: "/sales-dashboard/product",
        dropdown: [
          {
            id: 21,
            text: "All Product",
            link: "/sales-dashboard/product",
          },
          {
            id: 23,
            text: "Add Product",
            link: "/sales-dashboard/product/add-product",
          },
        ],
      },
      {
        id: 3,
        icon: <WorkOutlineIcon />,
        text: "Orders",
        link: "/sales-dashboard/orders",
      },
      {
        id: 4,
        icon: <MonetizationOnOutlinedIcon />,
        text: "Revenue",
        link: "/sales-dashboard/revenue",
      },
    ],
    []
  );

  useEffect(() => {
    const foundNav = navigations.find((nav) => nav.link === pathname);
    if (foundNav) {
      setActiveLinkId(foundNav.id);
    } else {
      // Check if any dropdown link matches the pathname
      for (let nav of navigations) {
        if (nav.dropdown) {
          const foundDropdown = nav.dropdown.find(
            (drop) => drop.link === pathname
          );
          if (foundDropdown) {
            setActiveLinkId(nav.id);
            setOpenDropdownId(nav.id);
            break;
          }
        }
      }
    }
  }, [pathname, navigations]);

  const handleLinkClick = (id: number) => {
    setActiveLinkId(id);
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Box className={styles.layout}>
      <Grid container>
        <Grid
          sx={{ borderRight: "1px solid #e6e6e6" }}
          item
          xs={12}
          sm={4}
          md={3}
          lg={2}
          xl={2}
        >
          <Box className={styles.layout__navArea}>
            {navigations.map((item) => (
              <DashboardLinks
                key={item.id}
                text={item.text}
                link={item.link}
                icon={item.icon}
                dropdown={item.dropdown}
                isActive={activeLinkId === item.id}
                isDropdownOpen={openDropdownId === item.id}
                handleLinkClick={() => handleLinkClick(item.id)}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Box className={styles.layout__contentArea}>{children}</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
