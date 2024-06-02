import CircleIcon from "@mui/icons-material/Circle";
import Typography from "@mui/material/Typography";
import React from "react";
import styles from "./orderStatus.module.scss";

interface OrderStatusProps {
  status: string;
  customStyle?: React.CSSProperties;
  sx?: object;
}

const OrderStatus: React.FC<OrderStatusProps> = ({
  status,
  sx,
  customStyle,
}) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "order placed":
        return styles.orderPlaced;
      case "processing":
        return styles.processing;
      case "on the way":
        return styles.onTheWay;
      case "delivered":
        return styles.delivered;
      case "cancelled":
        return styles.cancelled;
      default:
        return "";
    }
  };

  const uppercaseWords = (str: string) =>
    str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

  return (
    <Typography
      component={"span"}
      sx={sx}
      style={customStyle}
      className={`${styles.status} ${getStatusClass(status)}`}
    >
      <CircleIcon />
      {uppercaseWords(status)}
    </Typography>
  );
};

export default OrderStatus;
