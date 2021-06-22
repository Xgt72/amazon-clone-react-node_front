import React from "react";
import Grid from "@material-ui/core/Grid";
import { frenchDate, unitedStateDate } from "../helpers/formatDate";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

import "./Order.css";

export default function Order({ order }) {
  return (
    <Grid container className="order">
      <Grid item xs={4}>
        <h2>Order</h2>
      </Grid>
      <Grid item xs={8}>
        <p className="order__date">{unitedStateDate(order.created)}</p>
      </Grid>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.baskets?.map((item) => (
        <Grid item xs={12}>
          <CheckoutProduct key={`orderProduct_${item.id}`} {...item} hideButton />
        </Grid>
      ))}
      <CurrencyFormat
        renderText={(value) => <h3 className="order__total">Order Total: {value}</h3>}
        decimalScale={2}
        value={order.amount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"€"}
      />
    </Grid>
  );
}
