import CartItem from "../../models/cartItem";

const initState = {
    cart: [],
    orders: [],
    showSnackbar: false,
    amount: 0,
    message: null,
};

export default (state = initState, action) => {
    switch (action.type) {
        case "ADDTOCART":
            const oldState = [...state.cart];
            if (!oldState.find((item) => item.id === action.newItem.id)) {
                oldState.push(
                    new CartItem(
                        action.newItem.id,
                        1,
                        action.newItem.price,
                        action.newItem.title
                    )
                );
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
            let updatedCart = oldCart.filter(
                (item) => item.id != action.itemId
            );

            return {
                ...state,
                message: "Item removed from cart",
                showSnackbar: true,
                cart: updatedCart,
            };
        case "ORDER":
            let cart = [...state.cart];
            let prevOrders = [...state.orders];
            const createOrder = {
                id: action.id,
                items: action.items,
                amount: action.amount,
                created_at: action.created_at,
            };

            prevOrders.push(createOrder);
            return {
                ...state,
                cart: [],
                orders: prevOrders,
            };

        case "ADDQUANTITY":
            const cartU = [...state.cart];
            const itemFound = cartU.filter(
                (item) => item.id === action.itemId
            )[0];
            itemFound.increQuantity();

            return {
                ...state,
                cart: cartU,
            };
        case "SUBQUANTITY":
            const cartS = [...state.cart];
            const itemF = cartS.filter((item) => item.id === action.itemId)[0];
            itemF.decreQuantity();

            return {
                ...state,
                cart: cartS,
            };

        case "GETORDERS":
            return {
                ...state,
                orders: action.orders,
            };
        // case "GETCART":
        //     return {
        //         ...state,
        //         cart: action.cart,
        //     };

        default:
            return state;
    }
};
