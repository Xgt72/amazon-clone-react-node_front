import React from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import "./Subtotal.css";

function Subtotal() {
  const history = useHistory();
  const [{ basket, user }] = useStateValue();

  return (
    <div className="flex_col_justify_between subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift flex_row_align_center">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"€"}
      />
      <button type="button" onClick={() => history.push(!user ? "/login" : "/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
