"use client";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Submenu from "../subMenu/SubMenu";
import styles from "./dashboardLinks.module.scss";

interface DashboardLinksProps {
  icon: ReactNode;
  text: string;
  link: string;
  dropdown?: { id: number; text: string; link: string }[];
  isActive: boolean;
  isDropdownOpen: boolean;
  handleLinkClick: () => void;
}

const DashboardLinks: React.FC<DashboardLinksProps> = ({
  icon,
  text,
  link,
  dropdown,
  isActive,
  isDropdownOpen,
  handleLinkClick,
}) => {
  return (
    <>
      <Box
        onClick={handleLinkClick}
        className={`${styles.navigation} ${isActive && styles.active}`}
      >
        <Link href={link}>
          <Box className={styles.navigation__content}>
            <Box className={styles.navigation__leftPart}>
              <Box className={styles.navigation__icon}>{icon}</Box>
              <Typography className={styles.navigation__text}>
                {text}
              </Typography>
            </Box>
            {dropdown && (
              <KeyboardArrowDownOutlinedIcon
                className={`${styles.navigation__arrowIcon} ${
                  isDropdownOpen && styles.navigation__arrowIconOpen
                }`}
              />
            )}
          </Box>
        </Link>
      </Box>
      {dropdown && (
        <Collapse in={isDropdownOpen} timeout="auto" unmountOnExit>
          <Box sx={{ marginLeft: "25px" }}>
            <Submenu items={dropdown} />
          </Box>
        </Collapse>
      )}
    </>
  );
};

export default DashboardLinks;
