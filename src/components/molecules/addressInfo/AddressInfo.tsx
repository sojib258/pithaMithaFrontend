"use client";
import Button from "@/components/atoms/button/Button";
import AddressCart from "@/components/molecules/addressCart/AddressCart";
import AddressDialog from "@/components/molecules/addressFormDialog/AddressFormDialog";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import styles from "./addressInfo.module.scss";
const AddressInfo = () => {
  const [open, setOpen] = useState(false);
  const [chosenAddressId, setChosenAddressId] = useState(null);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dataFromBackend = [
    {
      id: 1,
      name: "Sajib Hasan",
      number: "01720046642",
      address:
        "House 83/3, Madartek Road, Madartek Kachabazar, Madartek Chowrasta",
      area: "Barguna Amtoli",
      city: "Barguna",
      division: "Barishal",
      deliveryOption: "home",
      landmark: "Beside big jame masjid",
    },
    {
      id: 2,
      name: "Sajib Hasan",
      number: "01720046642",
      address:
        "House 83/3, Madartek Road, Madartek Kachabazar, Madartek Chowrasta",
      area: "Barguna Amtoli",
      city: "Barguna",
      division: "Barishal",
      deliveryOption: "office",
      landmark: "Beside big jame masjid",
    },
  ];

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
        {dataFromBackend.map((item, index) => (
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
