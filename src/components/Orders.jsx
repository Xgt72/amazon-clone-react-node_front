import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import axios from "../axios";
import Order from "./Order";

import "./Orders.css";

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    if (user) {
      let response = await axios({
        method: "GET",
        // Stripe expects the total in a currencies submits
        url: `/users/${user.id}/orders/baskets`,
      });
      if (response.status === 200) {
        setOrders(response.data);
      }
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <section className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders.map((order) => (
          <Order key={`order_${order.id}`} order={order} />
        ))}
      </div>
    </section>
  );
}

export default Orders;
