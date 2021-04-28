import { urlProduct, baseUrl } from "../../Constants/dbURL";
import * as Notifications from "expo-notifications";
import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCOow5uHpvpsSj-ItD2KvttvQfYQom0sf8",
    authDomain: "rnshopapp-da3d8.firebaseapp.com",
    databaseURL: "https://rnshopapp-da3d8-default-rtdb.firebaseio.com",
    projectId: "rnshopapp-da3d8",
    storageBucket: "rnshopapp-da3d8.appspot.com",
    messagingSenderId: "361671013750",
    appId: "1:361671013750:web:818a6e223c06a3a2c57657",
    measurementId: "G-0MXVMN6QR7",
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = firebase.storage().ref().child(new Date().toISOString());

    const snapshot = await storageRef.put(blob);
    const remoteUrl = await snapshot.ref.getDownloadURL();

    return remoteUrl;
};

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

    let settings = await Notifications.getPermissionsAsync();

    let pushToken;

    if (settings.status !== "granted") {
        // Check the status of notif. permissions
        settings = await Notifications.requestPermissionsAsync();
    }

    // If false ask for it
    if (settings.status !== "granted") {
        // If permission denied , set pushToke null
        // else get Expo push token
        pushToken = null;
    } else {
        const { data } = await Notifications.getExpoPushTokenAsync();
        pushToken = data;
    }

    /**
     * @type {string}
     */
    let imageUrl = item.imageUrl;
    let localFileRegex = /file:\/\/\//;
    if (localFileRegex.test(imageUrl)) {
        imageUrl = await uploadImage(item.imageUrl);
    }

    const res = await fetch(`${urlProduct}?auth=${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...item,
            imageUrl,
            userPushToken: pushToken,
            ownerId: userId,
        }),
    });
    const { name } = await res.json();

    dispatch({
        type: "CREATE",
        item,
        id: name,
        userPushToken,
    });
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    const { token } = getState().auth;

    const urlProductUpdate = `${baseUrl}products/${id}.json?auth=${token}`;

    const response = await fetch(urlProductUpdate, {
        method: "DELETE",
    });
    // const data = await response.json();

    dispatch({
        type: "DELETE",
        id,
    });
};

export const updateProduct = (id, data) => async (dispatch, getState) => {
    const { token } = getState().auth;

    let imageUrl = data.imageUrl && data.imageUrl;

    if (imageUrl !== data.imageUrl) {
        let localFileRegex = /file:\/\/\//;
        if (localFileRegex.test(imageUrl)) {
            imageUrl = await uploadImage(item.imageUrl);
        }
    }

    try {
        const urlProductUpdate = `${baseUrl}products/${id}.json?auth=${token}`;
        const response = await fetch(urlProductUpdate, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                imageUrl,
            }),
        });

        if (response.ok) {
            dispatch({
                type: "UPDATE",
            });
            dispatch(getAllProducts());
        }
    } catch (err) {
        console.log("UPDATE PRODUCT ACTION ERROR:", err);
    }
};
