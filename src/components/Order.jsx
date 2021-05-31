import React from "react";
import { frenchDate, unitedStateDate } from "../helpers/formatDate";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

import "./Order.css";

export default function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{unitedStateDate(order.created)}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.baskets?.map((item) => (
        <CheckoutProduct key={`orderProduct_${item.id}`} {...item} hideButton />
      ))}
      <CurrencyFormat
        renderText={(value) => <h3 className="order__total">Order Total: {value}</h3>}
        decimalScale={2}
        value={order.amount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"€"}
      />
    </div>
  );
}
