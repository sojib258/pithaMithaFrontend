"use client";
import Button from "@/components/atoms/button/Button";

interface ActionButtonProps {
  rootStatus: string;
  status: string;
  loading: boolean;
  handleOrderStatus: (value: string) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  status,
  loading,
  handleOrderStatus,
}) => {
  const updateOrderStatus = async (newStatus: string) => {
    handleOrderStatus(newStatus);
  };

  if (status === "order placed") {
    return (
      <Button
        sx={{
          borderRadius: "8px!important",
        }}
        disabled={loading}
        text="Processing"
        onClick={() => updateOrderStatus("processing")}
      />
    );
  } else if (status === "processing") {
    return (
      <Button
        sx={{
          borderRadius: "8px!important",
        }}
        disabled={loading}
        text="Pass Delivery"
        onClick={() => updateOrderStatus("on the way")}
      />
    );
  } else if (status === "on the way") {
    return (
      <Button
        sx={{
          borderRadius: "8px!important",
        }}
        disabled={loading}
        text="Delivered"
        onClick={() => updateOrderStatus("delivered")}
      />
    );
  } else if (status === "delivered") {
    return (
      <Button
        disabled
        sx={{
          borderRadius: "8px!important",
        }}
        text="Delivered"
      />
    );
  } else if (status === "cancelled") {
    return (
      <Button
        disabled
        sx={{
          borderRadius: "8px!important",
          color: "#747474!important",
        }}
        text="Cancelled"
      />
    );
  }

  return <Button text="Problem" />;
};
export default ActionButton;
