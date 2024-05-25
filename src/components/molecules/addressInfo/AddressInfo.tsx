"use client";
import Button from "@/components/atoms/button/Button";
import AddressCart from "@/components/molecules/addressCart/AddressCart";
import AddressDialog from "@/components/molecules/addressFormDialog/AddressFormDialog";
import { RootState } from "@/store/store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AddressSkeleton from "../skeleton/address/AddressSkeleton";
import styles from "./addressInfo.module.scss";

type Data = {
  id: string | number;
  fullName: string;
  number: string;
  address: string;
  area: string;
  city: string;
  division: string;
  deliveryOption: string;
  landmark: string;
};

interface AddressInfoProps {
  handleAddressSelect?: (id: string | number) => void;
  selectId?: number | string | null;
}
const AddressInfo: React.FC<AddressInfoProps> = ({
  handleAddressSelect,
  selectId,
}) => {
  const { auth } = useSelector((state: RootState) => state);
  const { token, userId } = auth;
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<Data[]>([]);
  const [updateComponent, setUpdateComponent] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleUpdateComponent = () => {
    setUpdateComponent(!updateComponent);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAddress = async (id: number | string) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const responsePromise = axios.delete(
        `${process.env.NEXT_PUBLIC_API_KEY}/addresses/${id}`,
        { headers }
      );
      toast.promise(
        responsePromise,
        {
          loading: "Deleting your address...",
          success: "Address Deleted",
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
      await responsePromise;
      handleUpdateComponent();
    } catch (error) {
      console.log("Error from address delete", error);
    }
  };

  const handleCreateAddress = async (data: any) => {
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const postData = {
        users_permissions_user: userId,
        fullName: data.fullName,
        number: data.phone,
        division: data.division,
        city: data.city,
        area: data.area,
        address: data.address,
        landmark: data.landmark,
        deliveryOption: data.deliveryOption,
      };
      const responsePromise = axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/addresses`,
        { data: postData },
        { headers }
      );

      toast.promise(
        responsePromise,
        {
          loading: "Address Saving...",
          success: "Address Saved",
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
      await responsePromise;
      setLoading(false);
      handleClose();
      handleUpdateComponent();
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}/users/me?populate[0]=addresses`,
          { headers }
        );

        console.log("Response", response);
        setLoading(false);
        setAddress(response.data.addresses);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [updateComponent, token]);

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
        {loading ? (
          <AddressSkeleton />
        ) : (
          address.map((item, index) => (
            <Box className={styles.cart__addressItem} key={index}>
              <AddressCart
                id={item.id}
                selected={item.id === selectId}
                address={item.address}
                area={item.area}
                city={item.city}
                deliveryOption={item.deliveryOption}
                division={item.division}
                landmark={item.landmark}
                name={item.fullName}
                number={item.number}
                onSelect={
                  handleAddressSelect
                    ? () => handleAddressSelect(item.id)
                    : () => {}
                }
                handleUpdateComponent={handleUpdateComponent}
                onDelete={handleDeleteAddress}
                sx={{
                  padding: "20px",
                  border: "1px solid #cccccc",
                  marginBottom: "20px",
                }}
              />
            </Box>
          ))
        )}
      </Box>
      <AddressDialog
        open={open}
        handleClose={handleClose}
        handleAction={handleCreateAddress}
      />
    </Box>
  );
};

export default AddressInfo;
