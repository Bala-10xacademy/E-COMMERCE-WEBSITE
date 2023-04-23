import { useCallback, useContext, useRef } from "react";
import { CartContext } from "../../context/cart-context";
import useRazorpay from "react-razorpay";

import "./cart.css"; // import a separate CSS file for styling

const Cart = () => {
  const { cartData } = useContext(CartContext);
  const total = useRef();
  const Razorpay = useRazorpay();
  const razorPayDisplay = useCallback(async (total) => {
    const options = {
      key: "rzp_test_Seoz1yKnyyMLE4",
      amount: total * 100,
      currency: "INR",
      name: "10x-Gaming-Site",
      description: "Gaming Transaction",
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Bala Thummaaluru",
        email: "balathummaluru13@gmail.com",
        contact: "1234567890",
      },
      notes: {
        address: "Work address",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  }, [Razorpay]);

  let totalAmount = 0;
  cartData.forEach((cartItem) => {
    totalAmount += cartItem.price;
  });

  return (
    <>
      <section className="cart-container">
        <section className="cart-items">
          <h2>Shopping Cart</h2>
          {cartData.map((cartItem) => {
            return (
              <article className="cart-item">
                <img src="" alt="" className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{cartItem.title}</h3>
                  <span className="cart-item-price">Price: ${cartItem.price}</span>
                </div>
                <button className="cart-item-remove">Remove from cart</button>
              </article>
            );
          })}
        </section>
        <section className="cart-summary">
          <h2>Billing Information</h2>
          {cartData.map((cart) => {
            return (
              <article className="cart-summary-item">
                <span>{cart.title}</span>
                <span>${cart.price}</span>
              </article>
            );
          })}
          <article className="cart-summary-total">
            <span>Total:</span>
            <span>${totalAmount}</span>
          </article>
          <button className="cart-checkout-button" onClick={() => { razorPayDisplay(totalAmount) }}>Checkout</button>
        </section>
      </section>
    </>
  );
};

export default Cart;