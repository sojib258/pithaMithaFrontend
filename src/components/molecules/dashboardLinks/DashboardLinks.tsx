"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./dashboardLinks.module.scss";

interface DashboardLinksProps {
  icon: ReactNode;
  text: string;
  link: string;
  isActive: boolean;
  handleLinkClick: (value: string) => void;
}

const DashboardLinks: React.FC<DashboardLinksProps> = ({
  icon,
  text,
  link,
  isActive,
  handleLinkClick,
}) => {
  return (
    <Link href={link}>
      <Box
        onClick={() => handleLinkClick(link)}
        className={`${styles.navigation} ${isActive && styles.active}`}
      >
        <Box className={styles.navigation__icon}>{icon}</Box>
        <Typography className={styles.navigation__text}>{text}</Typography>
      </Box>
    </Link>
  );
};

export default DashboardLinks;
