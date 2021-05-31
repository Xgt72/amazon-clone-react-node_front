import React, { forwardRef } from "react";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";

import "./CheckoutProduct.css";
import { useStateValue } from "../StateProvider";

const CheckoutProduct = forwardRef(({ id, title, image, price, rating, quantity, hideButton }, ref) => {
  const [_, dispatch] = useStateValue();

  const getRatingWithStars = () => {
    const stars = Array(5);
    for (let i = 0; i < 5; i++) {
      stars[i] = <StarOutlineIcon key={`star_${i}`} />;
    }
    for (let i = 0; i < rating; i++) {
      stars[i] = <StarIcon key={`star_${i}`} />;
    }
    return stars;
  };

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id,
    });
  };

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };

  return (
    <div className="checkoutProduct flex_row_align_center" ref={ref}>
      <img className="checkoutProduct__image" src={image} alt={title} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>€</small>
          <strong>{parseFloat(price, 10)}</strong>
        </p>
        <div className="checkoutProduct__rating">{getRatingWithStars()}</div>
        <p>Qty: {quantity}</p>
        {!hideButton && (
          <>
            <button type="button" onClick={removeFromBasket}>
              Remove one from Basket
            </button>
            <button type="button" onClick={addToBasket}>
              Add one to Basket
            </button>
          </>
        )}
      </div>
    </div>
  );
});

export default CheckoutProduct;
