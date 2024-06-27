"use client";
import NavbarIcon from "@/components/molecules/navbarIcon/NavbarIcon";
import SearchBar from "@/components/molecules/searchBar/SearchBar";
import useResponsive from "@/hooks/useResponsive";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { mdScreen, downSmScreen } = useResponsive();
  return (
    <Box component={"section"} className={`${styles.navbar} navbar`}>
      <AppBar position="sticky">
        <Toolbar>
          {!mdScreen && (
            <IconButton
              size="large"
              edge="start"
              color="success"
              aria-label="open drawer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="red"
                viewBox="0 0 16 16"
                className={`${styles.navbar__menu} ${
                  downSmScreen && styles.navbar__menu_sm
                }`}
              >
                <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"></path>
              </svg>
            </IconButton>
          )}
          {/* Logo =============================== */}
          <Link href={"/"}>
            <Image
              className={`${styles.navbar__logoImg} ${
                downSmScreen && styles.navbar__logoImg_sm
              }`}
              width={250}
              height={40}
              src={"/icons/logo.png"}
              alt="Logo Image"
            />
          </Link>

          {/* Search Bar =============================== */}
          {mdScreen && (
            <SearchBar
              customStyle={{ width: { xs: "100%", lg: "500px" } }}
              label="Search Products"
              icon
            />
          )}

          <Box sx={{ flexGrow: 1 }} />
          <NavbarIcon />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
