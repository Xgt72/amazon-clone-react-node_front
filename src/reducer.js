export const initialState = {
  basket: [],
  user: null,
};

// Selector
export const getBasketTotal = (basket) => Math.round(basket?.reduce((total, item) => total + item.price * item.quantity, 0) * 100) / 100;
export const getBasketProductQuantity = (basket) => basket?.reduce((total, item) => total + item.quantity, 0);

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET": {
      const updatedBasket = [...state.basket];
      const itemIndex = updatedBasket.findIndex((item) => item.id === action.item.id);
      if (itemIndex > -1) {
        updatedBasket[itemIndex].quantity++;
      } else {
        updatedBasket.push({ ...action.item, quantity: 1 });
      }
      return { ...state, basket: updatedBasket };
    }
    case "REMOVE_FROM_BASKET": {
      const indexToRemove = state.basket.findIndex((item) => item.id === action.id);
      const updatedBasket = [...state.basket];
      if (updatedBasket[indexToRemove].quantity - 1 === 0) {
        updatedBasket.splice(indexToRemove, 1);
      } else {
        updatedBasket[indexToRemove].quantity--;
      }
      return { ...state, basket: updatedBasket };
    }
    case "EMPTY_BASKET": {
      return { ...state, basket: [] };
    }
    case "SET_USER": {
      return { ...state, user: action.user };
    }
    case "RESET_USER": {
      return { ...state, user: null };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
