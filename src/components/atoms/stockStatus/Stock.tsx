import Typography from "@mui/material/Typography";
import styles from "./stock.module.scss";
interface stockProps {
  isServiceAvailable: boolean;
  customStyle?: object;
  sx?: object;
}
const Stock: React.FC<stockProps> = ({
  isServiceAvailable,
  customStyle,
  sx,
}) => {
  return (
    <Typography
      component={"span"}
      sx={sx}
      style={customStyle}
      className={`${
        isServiceAvailable ? styles.available : styles.unavailable
      }`}
    >
      {isServiceAvailable ? "Available" : "Unavailable"}
    </Typography>
  );
};

export default Stock;
