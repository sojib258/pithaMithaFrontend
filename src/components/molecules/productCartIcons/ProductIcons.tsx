import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import styles from "./productIcons.module.scss";

interface productIconProps {
  handleOpen: () => void;
}

const ProductIcon: React.FC<productIconProps> = ({ handleOpen }) => {
  return (
    <Box className={styles.productIcons}>
      {/* Quick View Icon ================== */}
      <Tooltip className={styles.tooltip} arrow title="Quick View">
        <IconButton
          onClick={handleOpen}
          className={styles.productIcons__quickViewIcon}
        >
          <VisibilityOutlinedIcon className={styles.productCart__icon} />
        </IconButton>
      </Tooltip>

      {/* WishList Icon ================== */}
      <Tooltip className={styles.tooltip} arrow title="Add Wishlist">
        <IconButton className={styles.productIcons__whilistIcon}>
          <FavoriteBorderIcon className={styles.productCart__icon} />
        </IconButton>
      </Tooltip>

      {/* Shopping Cart Icon =================== */}
      <Tooltip className={styles.tooltip} title="Add to Cart" arrow>
        <IconButton className={styles.productIcons__cartIcon}>
          <ShoppingCartOutlinedIcon className={styles.productCart__icon} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ProductIcon;
