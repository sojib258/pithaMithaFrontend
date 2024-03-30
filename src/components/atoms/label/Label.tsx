import Box from "@mui/material/Box";
import styles from "./label.module.scss";
interface LabelProps {
  text: string;
  sx?: object;
}
const Label: React.FC<LabelProps> = ({ text, sx }) => {
  return (
    <Box sx={sx} className={styles.label} component={"span"}>
      {text}
    </Box>
  );
};

export default Label;
