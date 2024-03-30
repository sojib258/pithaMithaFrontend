import Button from "@/components/atoms/button/Button";
import Stock from "@/components/atoms/stockStatus/Stock";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "./wishlist.module.scss";

interface WishlistRowsProps {
  id: string | number;
  imgSrc: string;
  productName: string;
  price: number;
  discountPrice?: string | number;
  stock: boolean;
}

const WishlistRows: React.FC<WishlistRowsProps> = ({
  imgSrc,
  price,
  productName,
  discountPrice,
  stock,
  id,
}) => {
  return (
    <TableRow className={styles.wishList__tableRow}>
      <Link href={`/products/${id}`}>
        <TableCell
          className={styles.wishList__productImages}
          component="th"
          scope="row"
          sx={{ paddingRight: "0px", borderBottom: "none" }}
        >
          <Image
            width={40}
            height={40}
            src={imgSrc}
            alt="wishlist image"
            className={styles.wishList__productImage}
          />
          <Typography className={styles.wishList__productName}>
            {productName}
          </Typography>
        </TableCell>
      </Link>

      <TableCell className={styles.wishList__tableCell}>
        {discountPrice ? (
          <Box sx={{ display: "flex" }}>
            <Typography className={styles.wishList__discountPrice}>
              <Image
                width={40}
                height={40}
                src={"/icons/taka.png"}
                alt="Taka Logo"
                className={styles.wishList__currencyIcon}
              />
              {discountPrice}
            </Typography>
            <Typography
              component={"span"}
              className={styles.wishList__priceCondition}
            >
              {price}
            </Typography>
          </Box>
        ) : (
          <Typography className={styles.wishList__price}>
            <Image
              width={40}
              height={40}
              src={"/icons/taka.png"}
              alt="Taka Logo"
              className={styles.wishList__currencyIcon}
            />
            {price}
          </Typography>
        )}
      </TableCell>
      <TableCell className={styles.wishList__tableCell}>
        <Stock
          sx={{
            fontSize: { xs: "10px!important", lg: "14px!important" },
          }}
          inStock={stock}
        />
      </TableCell>
      <TableCell className={styles.wishList__tableCell}>
        <Button
          sx={{
            padding: { xs: "4px 15px", lg: "8px 15px!important" },
            marginRight: "20px",
            fontSize: { xs: "10px!important", lg: "14px!important" },
          }}
          text="Add to Cart"
          disabled={!stock}
        />
      </TableCell>
      <TableCell className={styles.wishList__tableCell}>
        <IconButton>
          <DeleteForeverSharpIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default WishlistRows;
