import Button from "@/components/atoms/button/Button";
import Label from "@/components/atoms/label/Label";
import ToasterMsg from "@/components/atoms/toastMsg/Toaster";
import AddressDialog from "@/components/molecules/addressFormDialog/AddressFormDialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./addressCart.module.scss";

interface AddressCartProps {
  id: number | string;
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
  onDelete: (id: number | string) => void;
  handleUpdateComponent: () => void;
}
type formFields = {
  fullName: string;
  phone: number;
  division: string;
  city: string;
  area: string;
  address: string;
  landmark: string;
  deliveryOption: string;
};

const AddressCart: React.FC<AddressCartProps> = ({
  id,
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
  onDelete,
  handleUpdateComponent,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = Cookies.get("myAppAuthToken");

  const handleEditAddress = async (data: formFields) => {
    try {
      const postData = {
        fullName: data.fullName,
        number: data.phone,
        division: data.division,
        city: data.city,
        area: data.area,
        address: data.address,
        landmark: data.landmark,
        deliveryOption: data.deliveryOption,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const responsePromise = axios.put(
        `${process.env.NEXT_PUBLIC_API_KEY}/addresses/${id}`,
        {
          data: postData,
        },
        {
          headers,
        }
      );

      toast.promise(
        responsePromise,
        {
          loading: "Address Editing...",
          success: "Address Edited",
          error: (error: any) => {
            return `${error?.response?.data?.error?.message}`;
          },
        },
        {
          error: {
            duration: 5000,
          },
        }
      );

      const response = await responsePromise;
      handleUpdateComponent();
      handleClose();
    } catch (error) {}
  };

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
            onClick={handleOpen}
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
            onClick={() => onDelete(id)}
          />
        </Box>
      </Box>
      <AddressDialog
        open={open}
        handleClose={handleClose}
        handleAction={handleEditAddress}
      />
      <ToasterMsg />
    </Box>
  );
};

export default AddressCart;
