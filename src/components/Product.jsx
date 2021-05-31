import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

import './Product.css';
import { useStateValue } from '../StateProvider';

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

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

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
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
    <div className="product flex_col">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>€</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">{getRatingWithStars()}</div>
      </div>
      <img src={image} alt={title} />
      <button type="buton" onClick={addToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
