import OrderItemRows from "@/components/organisms/recentOrder/RecentOrderRows";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./recentOrder.module.scss";

type Data = {
  id: string | number;
  status: string;
  paid: boolean;
  date: string;
  totalPrice: number;
  totalProduct: number;
  imgSrc: string;
  altText?: string;
};

interface RecentOrderProps {
  orderDetails: Data[];
  loading: boolean;
}

const RecentOrder: React.FC<RecentOrderProps> = ({ orderDetails, loading }) => {
  console.log("ORderData", orderDetails);
  return (
    <Box className={styles.recent}>
      <TableContainer
        className={styles.recent__tableContainer}
        component={Paper}
      >
        <Table className={styles.recent__table} aria-label="simple table">
          <TableHead className={styles.recent__tableHead}>
            <TableRow
              className={styles.recent__tableRow}
              sx={{ border: "1px solid #e6e6e6;" }}
            >
              <TableCell className={styles.recent__tableCell}>
                Order Id
              </TableCell>
              <TableCell className={styles.recent__tableCellTH}></TableCell>
              <TableCell className={styles.recent__tableCellTH}>Date</TableCell>
              <TableCell className={styles.recent__tableCellTH}>
                Total
              </TableCell>
              <TableCell className={styles.recent__tableCellTH}>
                Status
              </TableCell>
              <TableCell className={styles.recent__tableCellTH}>Paid</TableCell>
              <TableCell className={styles.recent__tableCellTH}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails.map((item) => (
              <OrderItemRows
                key={item.id}
                orderId={item.id}
                date={item.date}
                status={item.status}
                totalPrice={item.totalPrice}
                totalProduct={item.totalProduct}
                imgSrc={item.imgSrc}
                altText={item.altText}
                loading={loading}
                paid={item.paid}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentOrder;
