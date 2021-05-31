import React from "react";
import Subtotal from "./Subtotal";
import { useStateValue } from "../StateProvider";
import FlipMove from "react-flip-move";
import CheckoutProduct from "./CheckoutProduct";

import "./Checkout.css";

function Checkout() {
  const flipConfig = {
    easing: "cubic-bezier(0.13, 1.15, 0.8, 1.5)",
    duration: 900,
    delay: 0,
    staggerDurationBy: 110,
    staggerDelayBy: 120,
    enterAnmiation: "elevator",
    leaveAnimation: "elevator",
  };
  const [{ basket, user }] = useStateValue();
  return (
    <div className="checkout flex_row">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="advertising"
        />
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
        </div>
        <div style={{ position: "relative" }}>
          <FlipMove typeName={null} {...flipConfig}>
            {basket.map((item, index) => (
              <CheckoutProduct
                key={`product_${item.id}-${index}`}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                quantity={item.quantity}
              />
            ))}
          </FlipMove>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
