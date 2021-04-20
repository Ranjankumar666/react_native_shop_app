import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";

const initState = {
    availableProducts: [],
    userProducts: [],
};

export default (state = initState, action) => {
    switch (action.type) {
        case "GETALLPRODUCTS":
            return {
                ...state,
                availableProducts: action.products,
            };
        case "GETUSERPRODUCTS":
            return {
                ...state,
                userProducts: action.userProducts,
            };
        case "DELETE":
            const updatedProducts = [...state.availableProducts].filter(
                (item) => item.id !== action.id
            );
            return {
                ...state,
                availableProducts: updatedProducts,
            };

        case "CREATE":
            const { item } = action;
            return {
                ...state,
                availableProducts: [
                    ...state.availableProducts,
                    new Product(
                        action.id,
                        item.ownerId,
                        item.title,
                        item.imageUrl,
                        item.description,
                        Number(item.price)
                    ),
                ],
            };

        case "UPDATE":
            return {
                ...state,
            };

        default:
            return state;
    }
};
