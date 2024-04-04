import Button from "@/components/atoms/button/Button";
import Label from "@/components/atoms/label/Label";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./addressCart.module.scss";

interface AddressCartProps {
  name: string;
  number: string;
  address: string;
  area: string;
  city: string;
  division: string;
  deliveryOption: string;
  landmark: string;
  selected: boolean;
  sx?: object;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const AddressCart: React.FC<AddressCartProps> = ({
  address,
  area,
  city,
  deliveryOption,
  division,
  landmark,
  name,
  number,
  selected,
  sx,
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <Box
      onClick={onSelect}
      className={`${styles.cart} ${selected && styles.cart__selected}`}
      sx={sx}
    >
      <Box className={styles.cart__left}>
        <Typography className={styles.cart__deliverTo}>
          Deliver to:{" "}
          <Typography component={"span"} className={styles.cart__deliverName}>
            {name}
          </Typography>
        </Typography>
        <Typography className={styles.cart__addressText}>{address}</Typography>
        <Typography
          className={styles.cart__addressAreaText}
        >{`${area}, ${city}, ${division}`}</Typography>
        <Typography className={styles.cart__addressNumber}>{number}</Typography>
        <Box>
          <Label text={deliveryOption} />
          <Typography
            className={styles.cart__addressLandmark}
            component={"span"}
          >
            {`(${landmark})`}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.cart__right}>
        <Box className={styles.cart__action}>
          <Button
            sx={{
              backgroundColor: "transparent!important",
              boxShadow: "none",
              color: "#ea4b48!important",
              padding: "0px!important",
              "&:hover": {
                textDecoration: "underline",
                boxShadow: "none!important",
              },
            }}
            text="Edit"
            onClick={onEdit}
          />
          <Button
            sx={{
              backgroundColor: "transparent!important",
              boxShadow: "none",
              color: "#ea4b48!important",
              padding: "0px!important",
              "&:hover": {
                textDecoration: "underline",
                boxShadow: "none!important",
              },
            }}
            text="Delete"
            onClick={onDelete}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddressCart;
