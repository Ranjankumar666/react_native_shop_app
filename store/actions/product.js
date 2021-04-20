import { urlProduct, baseUrl } from "../../Constants/dbURL";

const refineDataToArray = (data) => {
    const idWithData = Object.entries(data);
    const refinedData = [];
    for (let [id, val] of idWithData) {
        val.id = id;
        refinedData.push(val);
    }

    return refinedData;
};

export const getAllProducts = (id) => async (dispatch) => {
    const response = await fetch(urlProduct);
    const data = await response.json();

    if (!data) {
        dispatch({
            type: "GETALLPRODUCTS",
            products: [],
        });
        return;
    }

    dispatch({
        type: "GETALLPRODUCTS",
        products: refineDataToArray(data),
    });
};

export const getUserProducts = () => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const urlTarget = `${urlProduct}?orderBy="ownerId"&equalTo="${userId}"`;


    const response = await fetch(urlTarget);

    const data = await response.json();

    dispatch({
        type: "GETUSERPRODUCTS",
        userProducts: refineDataToArray(data),
    });
};

// export const create(data) => data

export const createProduct = (item) => async (dispatch, getState) => {
    const { token, userId } = getState().auth;

    const res = await fetch(`${urlProduct}?auth=${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...item,
            ownerId: userId,
        }),
    });
    const { name } = await res.json();


    dispatch({
        type: "CREATE",
        item,
        id: name,
    });
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    const { token } = getState().auth;

    const urlProductUpdate = `${baseUrl}products/${id}.json?auth=${token}`;

    const response = await fetch(urlProduct, {
        method: "DELETE",
    });
    const data = await response.json();

    dispatch({
        type: "DELETE",
        id,
    });
};

export const updateProduct = (id, data) => async (dispatch, getState) => {
    const { token } = getState().auth;

    try {
        const urlProductUpdate = `${baseUrl}products/${id}.json?auth=${token}`;
        const response = await fetch(urlProductUpdate, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            dispatch({
                type: "UPDATE",
            });
        }
    } catch (err) {
        console.log("UPDATE PRODUCT ACTION ERROR:",err);
    }
};
