"use client";
import Button from "@/components/atoms/button/Button";
import SocialIcon from "@/components/molecules/socialIcons/SocialIcon";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useSelector } from "react-redux";
import WishlistRows from "./WishlistRows";
import styles from "./wishlist.module.scss";

const Wishlist = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const totalItems = wishlistItems.length;

  return (
    <Box className={styles.wishList}>
      {totalItems > 0 ? (
        <TableContainer
          className={styles.wishList__container}
          component={Paper}
        >
          <Table
            sx={{ minWidth: 910, overflowX: "scroll" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow sx={{ border: "1px solid #e6e6e6;" }}>
                <TableCell className={styles.wishList__head}>Product</TableCell>
                <TableCell
                  sx={{ width: "140px" }}
                  className={styles.wishList__head}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ width: "140px" }}
                  className={styles.wishList__head}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{ width: "170px" }}
                  className={styles.wishList__head}
                >
                  Actions
                </TableCell>
                <TableCell
                  sx={{ width: "100px" }}
                  className={styles.wishList__head}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wishlistItems.map((item) => (
                <WishlistRows
                  id={item.productId}
                  imgSrc={item.imgSrc}
                  price={item.price}
                  productName={item.title}
                  isServiceAvailable={item.isServiceAvailable}
                  discountPrice={item.discountPrice}
                  key={item.productId}
                  altText={item.altText}
                />
              ))}
              <TableRow className={styles.wishList__tableRow}>
                <TableCell
                  className={styles.wishList__tableCell}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography className={styles.wishList__shareText}>
                    Share:
                  </Typography>
                  <SocialIcon />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box mb={5}>
          <Typography className={styles.wishList__nothing}>
            You don&apos;t have any wishList items right now.😊😊
          </Typography>
          <Link href={"/products"}>
            <Button text="Continue shopping" arrowIcon />
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Wishlist;
