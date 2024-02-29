import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styles from "./information.module.scss";

const Information: React.FC = () => {
  const values: { [key: string]: string | string[] } = {
    Weight: "03",
    Color: "green",
    Type: "Organic",
    Category: "Food",
    "Stock Status": "Available",
    Tags: ["Patishapta", "Vegetables", "Healthy"],
  };
  return (
    <>
      <Table
        className={styles.table}
        sx={{ minWidth: 350 }}
        aria-label="simple table"
      >
        <TableBody>
          {Object.keys(values).map((item, index) => (
            <TableRow key={index} className={styles.table__row}>
              <TableCell
                className={styles.table__cellKey}
                component="th"
                scope="row"
              >
                {item} :
              </TableCell>
              <TableCell
                className={styles.table__cellValue}
                component="th"
                scope="row"
              >
                {Array.isArray(values[item])
                  ? (values[item] as string[]).join(", ")
                  : values[item]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Information;
