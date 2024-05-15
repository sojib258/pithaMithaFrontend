import { Toaster } from "react-hot-toast";
const ToasterMsg = () => {
  return (
    <Toaster
      toastOptions={{
        success: {
          style: {
            border: "1px solid #00b207",
            color: "#00b207",
          },
        },
        error: {
          style: {
            border: "1px solid #ff8a00",
            color: "red",
          },
        },
        loading: {
          style: {
            border: "1px solid #00b207",
          },
          iconTheme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  );
};

export default ToasterMsg;
