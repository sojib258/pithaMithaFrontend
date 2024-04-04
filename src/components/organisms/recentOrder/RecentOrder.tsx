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
  date: string;
  orderId: string;
  status: string;
  total: number | string;
};
interface RecentOrderProps {
  orderData: Data[];
}

const RecentOrder: React.FC<RecentOrderProps> = ({ orderData }) => {
  return (
    <Box className={styles.recent}>
      <TableContainer
        className={styles.recent__tableContainer}
        component={Paper}
      >
        <Table className={styles.recent__table} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ border: "1px solid #e6e6e6;" }}>
              <TableCell className={styles.recent__tableHead}>
                Order Id
              </TableCell>
              <TableCell className={styles.recent__tableHead}>Date</TableCell>
              <TableCell className={styles.recent__tableHead}>Total</TableCell>
              <TableCell className={styles.recent__tableHead}>Status</TableCell>
              <TableCell className={styles.recent__tableHead}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((item) => (
              <OrderItemRows
                key={item.id}
                date={item.date}
                orderId={item.orderId}
                status={item.status}
                total={item.total}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentOrder;
