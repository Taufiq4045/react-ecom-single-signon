import React, { useEffect , useState } from "react";
import axios from "axios";
import Filter from "./Filter";
import "./Filter.css";
import { useCart, useFilter, useWishlist} from "../../context";
import { ACTION_TYPE, dispatchHandler, filterMethod,presentItem } from "../../util";
import { ProductCard } from "./ProductCard";
import { toast } from "react-toastify";

export const ProductList = () => {
  const { state } = useFilter();
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { cartState, cartDispatch } = useCart();

  const [product, setProduct] = useState([]);
  const getProducts = async () => {
    const response = await axios.get("/api/products");
    const data = response.data.products;
    setProduct(data);
    return data;
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filterData = filterMethod(state, product);

  return (
    <>
      <Filter />
      <div className="product-list-container">
        {filterData.map((filterProduct) => {
          const {
            _id,
            img,
            title,
            rating,
            author,
            price,
            originalPrice,
            discount,
          } = filterProduct;
          const inWishlist = presentItem(wishlistState, filterProduct);
          const inCart = presentItem(cartState, filterProduct);
          return (
            <ProductCard
              key={_id}
              id={_id}
              img={img}
              title={title}
              rating={rating}
              author={author}
              price={price}
              originalPrice={originalPrice}
              discount={discount}
              inWishlist={inWishlist}
              inCart={inCart}
              addToWishlist={() =>
                dispatchHandler(
                  wishlistDispatch,
                  ACTION_TYPE.ADD_TO_WISHLIST,
                  filterProduct,
                  toast.success("Added to wishlist")
                )
              }
              removeFromWishlist={() =>
                dispatchHandler(
                  wishlistDispatch,
                  ACTION_TYPE.REMOVE_FROM_WISHLIST,
                  filterProduct,
                  toast.success("Removed from wishlist")
                )
              }
              addToCart={() =>
                dispatchHandler(
                  cartDispatch,
                  ACTION_TYPE.ADD_TO_CART,
                  filterProduct,
                  toast.success("Added to cart")
                )
              }
              removeFromCart={() =>
                dispatchHandler(
                  cartDispatch,
                  ACTION_TYPE.REMOVE_FROM_CART,
                  filterProduct,
                  toast.success("Removed from cart")
                )
              }
              moveToCart={() => {
                dispatchHandler(
                  cartDispatch,
                  ACTION_TYPE.ADD_TO_CART,
                  filterProduct,
                  toast.success("Moved to cart")
                );
                dispatchHandler(
                  wishlistDispatch,
                  ACTION_TYPE.REMOVE_FROM_WISHLIST,
                  filterProduct
                );
              }}
            />
          );
        })}
      </div>
    </>
  );
};