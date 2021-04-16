import PRODUCTS from "../../data/dummy-data";

const initState = {
    availableProducts: PRODUCTS,
    userProducts: [],
};

export default (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
