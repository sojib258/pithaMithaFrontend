import LocationDialog from "@/components/molecules/locationDialog/LocationDialog";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import styles from "./locationLabel.module.scss";

interface LocationLabelProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
}

const LocationLabel: React.FC<LocationLabelProps> = ({
  register,
  setValue,
  errors,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("Location");

  useEffect(() => {
    register("location", {
      required: "Location is required",
    });
  }, [register]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setValue("location", selectedLocation);
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        className={styles.locationBtn}
      >
        <LocationOnIcon className={styles.locationBtn__icon} />
        {location}
      </Button>
      {open && (
        <LocationDialog
          handleClose={handleClose}
          open={open}
          handleLocationSelect={handleLocationSelect}
        />
      )}
    </>
  );
};

export default LocationLabel;
