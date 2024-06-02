import Label from "@/components/atoms/label/Label";
import Skeleton from "@mui/material/Skeleton";

import { Address } from "@/utils/typesDefine/orderSliceTypes";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./addressCart.module.scss";

interface AddressCartProps {
  loading?: boolean;
  addressData: Address;
}
const AddressCart: React.FC<AddressCartProps> = ({ loading, addressData }) => {
  const { fullName, address, area, city, deliveryOption, division, number } =
    addressData;

  return (
    <Box className={styles.address}>
      <Typography className={styles.address__deliveryText}>
        Delivery Address:
      </Typography>
      <Typography className={styles.address__addressName}>
        {loading ? <Skeleton className={styles.skeleton__text} /> : fullName}
      </Typography>
      <Typography className={styles.address__addressLocation}>
        {loading ? <Skeleton className={styles.skeleton__text} /> : address}
      </Typography>
      <Typography className={styles.address__addressDivision}>
        {loading ? (
          <Skeleton className={styles.skeleton__text} />
        ) : (
          `${area}, ${city}, ${division}`
        )}
      </Typography>
      {loading ? (
        <Skeleton className={styles.skeleton__text} />
      ) : (
        deliveryOption && <Label text={deliveryOption} />
      )}

      <Typography component={"span"} className={styles.address__addressNumber}>
        {loading ? <Skeleton className={styles.skeleton__text} /> : number}
      </Typography>
    </Box>
  );
};

export default AddressCart;
