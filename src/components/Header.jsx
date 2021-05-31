import React from "react";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { getBasketProductQuantity } from "../reducer";

import "./Header.css";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = (e) => {
    if ((user && e.key === "Enter") || user) {
      localStorage.removeItem("AMAZON_TOKEN");
      dispatch({ type: "RESET_USER" });
    }
  };

  return (
    <header className="header flex_row_align_center">
      <Link to="/">
        <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon logo" />
      </Link>
      <div className="header__search flex_row_align_center">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav flex_row_justify_evenly">
        <Link to={!user ? "/login" : ""}>
          <div
            className="header__option flex_col"
            onClick={handleAuthentication}
            onKeyPress={(e) => handleAuthentication(e)}
            role="button"
            tabIndex="0">
            <span className="header__optionLineOne">Hello {user ? user.firstname : "Guest"}</span>
            <span className="header__optionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
          </div>
        </Link>
        <Link to={!user ? "/login" : "/orders"}>
          <div className="header__option flex_col">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__option flex_col">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket flex_row_align_center">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">{getBasketProductQuantity(basket)}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
