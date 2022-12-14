import { CartItems } from "../components/Cart/CartItems";
import { PriceCard } from "../components/Cart/PriceCard";
import "../components/Cart/Cart.css";
import { useCart } from "../context";
import { EmptyCart } from "../components/Cart/EmptyCart";

export const Cart = () => {
  const { cartState } = useCart();
  return (
    <>
      <h3 className="page-heading cart-heading">Cart</h3>
      {cartState.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="component-div cart-div">
          <CartItems />
          <PriceCard />
        </div>
      )}
    </>
  );
};