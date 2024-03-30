import Typography from "@mui/material/Typography";
import styles from "./stock.module.scss";
interface stockProps {
  inStock?: boolean;
  customStyle?: object;
  sx?: object;
}
const Stock: React.FC<stockProps> = ({ inStock, customStyle, sx }) => {
  return (
    <Typography
      component={"span"}
      sx={sx}
      style={customStyle}
      className={`${inStock ? styles.inStock : styles.outStock}`}
    >
      {inStock ? "In Stock" : "Out of Stock"}
    </Typography>
  );
};

export default Stock;
