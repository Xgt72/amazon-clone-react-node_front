import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import axios from "../axios";

import "./Payment.css";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(false);

  useEffect(() => {
    // generate the special stripe secret which allow us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        // Stripe expects the total in a currencies submits
        url: `/payments?total=${Math.floor(getBasketTotal(basket) * 100)}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    if (basket.length > 0) {
      getClientSecret();
    }
  }, [basket]);

  // console.log("THE SECRET IS >>> ", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(async ({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        let createdTimestamp = new Date();
        const offsetTimeZone = createdTimestamp.getTimezoneOffset();
        createdTimestamp.setMinutes(createdTimestamp.getMinutes() + -1 * offsetTimeZone);
        createdTimestamp = createdTimestamp.toISOString().slice(0, 19).replace("T", " ");

        let response = await axios({
          method: "POST",
          // Stripe expects the total in a currencies submits
          url: `/users/${user.id}/orders`,
          data: {
            paymentIntentId: paymentIntent.id,
            amount: parseFloat((paymentIntent.amount / 100).toFixed(2)),
            created: createdTimestamp,
          },
        });

        const orderId = response.data.id;
        const basketToSave = basket.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        }));
        response = await axios({
          method: "POST",
          // Stripe expects the total in a currencies submits
          url: `/users/${user.id}/orders/${orderId}/baskets`,
          data: {
            baskets: basketToSave,
          },
        });
        if (response.status === 200) {
          setSucceeded(true);
          setError(null);
          setProcessing(false);

          dispatch({
            type: "EMPTY_BASKET",
          });

          history.replace("/orders");
        } else {
          setDisabled(true);
          setError("Error to save order");
          setProcessing(false);
        }
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <section className="payment">
      <div className="payment__container">
        <h1>Checkout ({<Link to="/checkout">{basket.length} items</Link>})</h1>
        {/* Payment section  - delivery address */}
        <div className="payment__section flex_row">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          {user && (
            <div className="payment__address">
              <p>
                {user.lastname} {user.firstname}
              </p>
              <p>{user.street}</p>
              <p>
                {user.zip_code} {user.city}
              </p>
            </div>
          )}
        </div>
        {/* Payment section  - Review items */}
        <div className="payment__section flex_row">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item, index) => (
              <CheckoutProduct key={`product_${item.id}-${index}`} {...item} />
            ))}
          </div>
        </div>
        {/* Payment section  - Payment method */}
        <div className="payment__section flex_row">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"€"}
                />
                <button className="payment__button" disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Payment;
