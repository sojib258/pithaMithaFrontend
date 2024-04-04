"use client";
import Button from "@/components/atoms/button/Button";
import AddressCart from "@/components/molecules/addressCart/AddressCart";
import AddressDialog from "@/components/molecules/addressFormDialog/AddressFormDialog";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import styles from "./addressInfo.module.scss";

type Data = {
  id: string | number;
  name: string;
  number: string;
  address: string;
  area: string;
  city: string;
  division: string;
  deliveryOption: string;
  landmark: string;
};
interface AddressInfoProps {
  addressData: Data[];
}

const AddressInfo: React.FC<AddressInfoProps> = ({ addressData }) => {
  const [open, setOpen] = useState(false);
  const [chosenAddressId, setChosenAddressId] = useState(null);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddressId = (addressId: any) => {
    setChosenAddressId(addressId);
  };

  const handleEditAddress = () => {
    // Logic to be here
  };

  const handleDeleteAddress = () => {
    // Logic to be here
  };

  const handleCreateAddress = () => {
    // Logic to be here
  };

  return (
    <Box className={styles.cart}>
      <Box className={styles.cart__head}>
        <LocationOnIcon className={styles.cart__locationIcon} />
        <Typography className={styles.cart__addressText}>
          Select a Delivery Address
        </Typography>
      </Box>
      <Box className={styles.cart__action}>
        <Button
          sx={{
            width: "100%",
            backgroundColor: "transparent!important",
            boxShadow: "none",
            color: "#1a1a1a!important",
            border: "1px solid #cccccc!important",
            borderRadius: "8px!important",
            "&:hover": {
              color: "#00b207!important",
              border: "1px solid #00b207!important",
              boxShadow: "none!important",
            },
          }}
          onClick={handleOpen}
          text={"+ Add Address"}
        />
      </Box>
      <Box className={styles.cart__body}>
        {addressData.map((item, index) => (
          <Box className={styles.cart__addressItem} key={index}>
            <AddressCart
              selected={item.id === chosenAddressId}
              address={item.address}
              area={item.area}
              city={item.city}
              deliveryOption={item.deliveryOption}
              division={item.division}
              landmark={item.landmark}
              name={item.name}
              number={item.number}
              onSelect={() => handleAddressId(item.id)}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
              sx={{
                padding: "20px",
                border: "1px solid #cccccc",
                marginBottom: "20px",
              }}
            />
          </Box>
        ))}
      </Box>
      <AddressDialog
        onCreate={handleCreateAddress}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default AddressInfo;
