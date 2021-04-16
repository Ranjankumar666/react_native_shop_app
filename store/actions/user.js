export const addToCart = (id) => ({
    type: "ADDTOCART",
    newItem: id,
});

export const removeFromCart = (id) => ({
    type: "REMOVEFROMCART",
    itemId: id,
});
