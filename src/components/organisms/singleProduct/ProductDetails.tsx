import Product from "@/components/organisms/quickView/ProductDetails";
const ProductDetails = () => {
  const price = 100;
  const productTitle =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, repudiandae.";
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo magnam cupiditate tempora iste totam sed debitis, sint nihil nulla, ducimus, est nobis. Et saepe tempora commodi, quasi molestiae repellat.";
  const ratingValue = 4;
  const category = "Food";
  const discountPrice = 90;
  const images = [
    {
      id: 1,
      width: 800,
      height: 800,
      url: "/uploads/2_8430417aa2.png",
    },
    {
      id: 1,
      width: 800,
      height: 800,
      url: "/uploads/Screenshot_2024_01_24_110531_0a51352762.png",
    },
  ];

  return (
    <>
      <Product
        price={price}
        productTitle={productTitle}
        description={description}
        ratingValue={ratingValue}
        category={category}
        discountPrice={discountPrice}
        images={images}
        customStyle={{ width: "100%", padding: "0px" }}
      />
    </>
  );
};

export default ProductDetails;
