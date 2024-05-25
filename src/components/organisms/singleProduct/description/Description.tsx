import CommonSkeleton from "@/components/molecules/skeleton/commonSkeleton/CommonSkeleton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./description.module.scss";
interface DesciptionProps {
  description: string;
  loading?: boolean;
}
const Desciption: React.FC<DesciptionProps> = ({ description, loading }) => {
  return (
    <Box className={styles.description}>
      {loading ? (
        <CommonSkeleton />
      ) : (
        <Typography className={styles.description__text}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default Desciption;
