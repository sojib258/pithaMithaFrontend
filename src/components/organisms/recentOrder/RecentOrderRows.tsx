import Button from "@/components/atoms/button/Button";
import Label from "@/components/atoms/label/Label";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "./recentOrder.module.scss";
interface OrderItemsProps {
  orderId: string | number;
  date: string;
  total: number | string;
  status: string;
  head?: boolean;
}
const OrderItems: React.FC<OrderItemsProps> = ({
  orderId,
  date,
  total,
  status,
  head = false,
}) => {
  return (
    <TableRow className={styles.recent__tableRow}>
      <TableCell
        className={styles.recent__productImages}
        component="th"
        scope="row"
      >
        {orderId}
      </TableCell>

      <TableCell className={styles.recent__tableCell}>{date}</TableCell>
      <TableCell className={styles.recent__tableCell}>
        <Box className={styles.recent__priceCell}>
          <Image
            width={40}
            height={40}
            src={"/icons/taka.png"}
            alt="Taka Logo"
            className={styles.recent__currencyIcon}
          />

          <Typography className={styles.recent__totalPrice} component={"span"}>
            {total}
          </Typography>
          <Typography
            className={styles.recent__productItems}
            component={"span"}
          >
            {"(4 Products)"}
          </Typography>
        </Box>
      </TableCell>
      <TableCell className={styles.recent__tableCell}>
        <Label sx={{ minWidth: "100px" }} text={status} />
      </TableCell>
      <TableCell className={styles.recent__tableCell}>
        <Link href={`/dashboard/order-history/order-details/${orderId}`}>
          <Button
            sx={{
              backgroundColor: "transparent!important",
              boxShadow: "none",
              color: "#00b207!important",
              padding: "2px 8px!important",
              "&:hover": {
                textDecoration: "underline",
                boxShadow: "none!important",
              },
            }}
            text="View All"
          />
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default OrderItems;
