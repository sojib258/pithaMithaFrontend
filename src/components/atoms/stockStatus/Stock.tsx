import styles from "./stock.module.scss";
interface stockProps {
  inStock?: boolean;
  customStyle?: object;
}
const Stock: React.FC<stockProps> = ({ inStock, customStyle }) => {
  return (
    <span
      style={customStyle}
      className={`${inStock ? styles.inStock : styles.outStock}`}
    >
      {inStock ? "In Stock" : "Out of Stock"}
    </span>
  );
};

export default Stock;
