const initState = {
    cart: [],
    orders: [],
    showSnackbar: false,
    message: null,
};

export default (state = initState, action) => {
    switch (action.type) {
        case "ADDTOCART":
            const oldState = [...state.cart];
            if (!oldState.find((item) => item === action.newItem)) {
                oldState.push(action.newItem);
            }

            return {
                ...state,
                showSnackbar: true,
                message: "Item added to cart",
                cart: oldState,
            };
        case "SHOWSNACKBAR":
            return {
                ...state,
                showSnackbar: true,
            };
        case "HIDESNACKBAR":
            return {
                ...state,
                showSnackbar: false,
            };

        case "REMOVEFROMCART":
            let oldCart = [...state.cart];
            let updatedCart = oldCart.filter((item) => item != action.itemId);

            return {
                ...state,
                message: "Item removed from cart",
                showSnackbar: true,
                cart: updatedCart,
            };

        default:
            return state;
    }
};
