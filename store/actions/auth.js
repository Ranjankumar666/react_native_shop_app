const api_key = "AIzaSyCOow5uHpvpsSj-ItD2KvttvQfYQom0sf8";

import AsyncStorage from "@react-native-async-storage/async-storage";

let timer;

export const authenticate = (token, userId, refreshToken) => {
    clearTimer()
    return {
        type: "AUTHENTICATE",
        payload: {
            userId,
            token,
            refreshToken,
        },
    };
};

export const signUp = (email, password) => async (dispatch) => {
    const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    const data = await response.json();

    dispatch(authenticate(data.idToken, data.localId, data.refreshToken));
    // dispatch(getUserData());

    const expDate = new Date().getTime() + parseInt(data.expiresIn) * 1000;
    dispatch(autoGetToken(expDate, data.refreshToken));
    await storeData(data.idToken, data.localId, expDate, data.refreshToken);
};

export const signIn = (email, password) => async (dispatch) => {
    const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}
`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    const data = await response.json();
    // dispatch(getUserData());
    dispatch(authenticate(data.idToken, data.localId, data.refreshToken));
    dispatch(getUserData());
    const expDate = new Date().getTime() + parseInt(data.expiresIn) * 1000;
    dispatch(autoGetToken(expDate, data.refreshToken));
    await storeData(data.idToken, data.localId, expDate, data.refreshToken);
};


export const getUserData = () => async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${api_key}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idToken: token,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    const data = await response.json();

    dispatch({
        type: "USERDATA",
        email: data.users[0].email,
    });
};

export const signout = () => async (dispatch) => {
    await AsyncStorage.removeItem("userData");
    dispatch({
        type: "LOGOUT",
    });
};

const clearTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
};

export const autoGetToken = (expiryTime, refreshToken) => (dispatch) => {
    timer = setTimeout(() => {
        dispatch(getTokenfromRefreshToken(refreshToken));
    }, expiryTime);
};

export const getTokenfromRefreshToken = (refreshToken) => async (dispatch) => {
    const response = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${api_key}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    const data = await response.json();

    dispatch(authenticate(data.id_token, data.user_id, data.refresh_token));
    dispatch(getUserData());
    const expDate = new Date().getTime() + parseInt(data.expires_in) * 1000;
    await storeData(data.id_token, data.user_id, expDate, data.refresh_token);
    dispatch(autoGetToken(expDate));
};

const storeData = async (token, userId, expiresIn, refreshToken) => {
    try {
        await AsyncStorage.setItem(
            "userData",
            JSON.stringify({
                token,
                userId,
                expiresIn,
                refreshToken,
            })
        );
    } catch (err) {
        console.log("ASYNC STORE DATA ERROR",err.message);
    }
};
