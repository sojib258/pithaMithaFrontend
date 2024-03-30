import SocialIcon from "@/components/molecules/socialIcons/SocialIcon";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import WishlistRows from "./WishlistRows";
import styles from "./wishlist.module.scss";

const wishlists = [
  {
    id: 1,
    imgSrc: "/img/2.png",
    productName: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    price: 2900,
    discountPrice: 2300,
    stock: true,
  },
  {
    id: 1,
    imgSrc: "/img/2.png",
    productName: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    price: 2900,
    discountPrice: 2300,
    stock: false,
  },
  {
    id: 1,
    imgSrc: "/img/2.png",
    productName: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    price: 20900,
    stock: true,
  },
];

const Wishlist = () => {
  return (
    <TableContainer className={styles.wishList} component={Paper}>
      <Table
        sx={{ minWidth: 810, overflowX: "scroll" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow sx={{ border: "1px solid #e6e6e6;" }}>
            <TableCell className={styles.wishList__head}>Product</TableCell>
            <TableCell
              sx={{ width: { xs: "auto", md: "140px" } }}
              className={styles.wishList__head}
            >
              Price
            </TableCell>
            <TableCell
              sx={{ width: { xs: "auto", md: "140px" } }}
              className={styles.wishList__head}
            >
              Status
            </TableCell>
            <TableCell
              sx={{ width: { xs: "auto", md: "170px" } }}
              className={styles.wishList__head}
            >
              Actions
            </TableCell>
            <TableCell
              sx={{ width: { xs: "auto", md: "100px" } }}
              className={styles.wishList__head}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wishlists.map((item) => (
            <WishlistRows
              id={item.id}
              imgSrc={item.imgSrc}
              price={item.price}
              productName={item.productName}
              stock={item.stock}
              discountPrice={item.discountPrice}
              key={item.id}
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
  );
};

export default Wishlist;
