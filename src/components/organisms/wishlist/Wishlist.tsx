import Button from "@/components/atoms/button/Button";
import Stock from "@/components/atoms/stockStatus/Stock";
import useResponsive from "@/hooks/useResponsive";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./wishlist.module.scss";

interface wishListProps {
  discountPrice?: boolean;
}

function createData(product: string, price: number, stock: boolean) {
  return { product, price, stock };
}

const rows = [
  createData("6", 30, true),
  createData("7", 10, false),
  createData("7", 10, false),
  createData("7", 10, false),
  createData("7", 10, false),
];

const Wishlist: React.FC<wishListProps> = ({ discountPrice }) => {
  const { downLgScreen } = useResponsive();

  return (
    <TableContainer
      className={`${styles.wishList} ${
        downLgScreen && styles.wishList__largeScreen
      }`}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ border: "1px solid #e6e6e6;" }}>
            <TableCell
              sx={{ width: { xs: "115px", lg: "135px" } }}
              className={styles.wishList__head}
            ></TableCell>
            <TableCell className={styles.wishList__head}>Product</TableCell>
            <TableCell
              sx={{ width: { xs: "100px", lg: "120px" } }}
              className={styles.wishList__head}
            >
              Amount
            </TableCell>
            <TableCell
              sx={{ width: { xs: "115px", lg: "135px" } }}
              className={styles.wishList__head}
            >
              Status
            </TableCell>
            <TableCell
              sx={{ width: { xs: "145px", lg: "170px" } }}
              className={styles.wishList__head}
            >
              Actions
            </TableCell>
            <TableCell sx={{ width: "80px" }} className={styles.wishList__head}>
              Remove
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.product}
              sx={{
                borderBottom: "1px solid #e6e6e6",
              }}
            >
              <TableCell
                className={styles.wishList__productImages}
                component="th"
                scope="row"
                sx={{ paddingRight: "0px", borderBottom: "none" }}
              >
                <Image
                  width={80}
                  height={80}
                  src={`/img/${row.product}.jpg`}
                  alt="wishlist image"
                  className={styles.wishList__productImage}
                />
              </TableCell>
              <TableCell>
                <Typography className={styles.wishList__productName}>
                  Lorem ipsum dolor sit amet
                </Typography>
              </TableCell>

              <TableCell>
                {discountPrice ? (
                  <Box sx={{ display: "flex" }}>
                    <Typography className={styles.wishList__discountPrice}>
                      <Image
                        width={14}
                        height={14}
                        src={"/icons/taka.png"}
                        alt="Taka Logo"
                        className={styles.wishList__currencyIcon}
                      />
                      20
                    </Typography>
                    <Typography
                      component={"span"}
                      className={styles.wishList__priceCondition}
                    >
                      25
                    </Typography>
                  </Box>
                ) : (
                  <Typography className={styles.wishList__price}>
                    <Image
                      width={14}
                      height={14}
                      src={"/icons/taka.png"}
                      alt="Taka Logo"
                      className={styles.wishList__currencyIcon}
                    />
                    25
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Stock
                  customStyle={{ fontSize: downLgScreen ? "10px" : "14px" }}
                  inStock={row.stock}
                />
              </TableCell>
              <TableCell>
                <Button
                  customStyle={{
                    padding: downLgScreen
                      ? "4px 15px!important"
                      : "8px 15px!important",
                    marginRight: "20px",
                    fontSize: downLgScreen
                      ? "10px!important"
                      : "14px!important",
                  }}
                  text="Add to Cart"
                />
              </TableCell>
              <TableCell>
                <IconButton>
                  <DeleteForeverSharpIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Wishlist;
