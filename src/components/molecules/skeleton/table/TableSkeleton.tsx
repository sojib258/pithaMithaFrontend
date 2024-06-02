import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./orderTable.module.scss";
const TableSkeleton = () => {
  const tableRow = [1, 2, 3];
  return (
    <Table className={styles.table} aria-label="simple table">
      <TableHead className={styles.table__head}>
        <TableRow>
          <TableCell>
            <Skeleton />
          </TableCell>

          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableRow.map((item) => (
          <TableRow key={item}>
            <TableCell
              className={styles.table__CellTD}
              component="th"
              scope="row"
            >
              <Skeleton />
            </TableCell>

            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Box>
                <Skeleton />
              </Box>
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
