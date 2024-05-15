import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styles from "./orderTable.module.scss";
const OrderTableSkeleton = () => {
  return (
    <TableRow className={styles.skeleton}>
      <TableCell
        className={styles.skeleton__tableCell}
        component="th"
        scope="row"
      >
        <Skeleton className={styles.skeleton__text} />
      </TableCell>

      <TableCell className={styles.skeleton__tableCell}>
        <Skeleton className={styles.skeleton__text} />
      </TableCell>
      <TableCell className={styles.skeleton__tableCell}>
        <Box className={styles.recent__priceCell}>
          <Skeleton className={styles.skeleton__text} />
        </Box>
      </TableCell>
      <TableCell className={styles.skeleton__tableCell}>
        <Skeleton className={styles.skeleton__text} />
      </TableCell>
      <TableCell className={styles.skeleton__tableCell}>
        <Skeleton className={styles.skeleton__text} />
      </TableCell>
    </TableRow>
  );
};

export default OrderTableSkeleton;
