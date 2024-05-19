"use client";
import { clearUser as clearAuth } from "@/store/feature/auth/AuthSlice";
import { clearUser } from "@/store/feature/user/UserSlice";
import { RootState } from "@/store/store";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./avatar.module.scss";

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { profileImg, firstName } = useSelector(
    (state: RootState) => state.user
  );

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      link: "/dashboard",
      text: "Dashboard",
    },
    {
      link: "/order-history",
      text: "Order History",
    },
    {
      link: "/wishlist",
      text: "Wishlist",
    },
    {
      link: "/shopping-cart",
      text: "Shopping Cart",
    },

    {
      link: "/settings",
      text: "Settings",
    },
    {
      link: "/sales-dashboard",
      text: "Sales Dashboard",
    },
  ];

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(clearAuth());
    dispatch(clearUser());
    Cookies.remove("myAppAuthToken");
    router.push("/");
  };

  return (
    <Box className={`${styles.avatar} avatar`} sx={{ flexGrow: 0 }}>
      <Tooltip title="Open Profile">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {profileImg.url ? (
            <Avatar alt="Semy Sharp" src={profileImg.url} />
          ) : (
            <Avatar className={styles.avatar__imgText}>
              {firstName.slice(0, 1).toUpperCase()}
            </Avatar>
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        className={"dashboardLinks"}
      >
        {settings.map((setting, index) => (
          <MenuItem key={index} onClick={handleCloseUserMenu}>
            <Link href={setting.link}>
              <Typography className={styles.avatar__link} textAlign="center">
                {setting.text}
              </Typography>
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={handleLogout}>
          <Typography className={styles.avatar__link} textAlign="center">
            Log Out
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
export default ResponsiveAppBar;
