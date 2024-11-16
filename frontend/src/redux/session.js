// frontend/src/redux/session.js

import { csrfFetch } from './csrf';

//Constants
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

//Action Reducers
const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER
});


//Thunks
export const thunkAuthenticate = () => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/restore-user");
        // const response = await csrfFetch("/api/csrf/restore");
        if (response.ok) {
            const data = await response.json();
            // console.log("...thunkAuthentication...")
            dispatch(setUser(data));
        }
    } catch (e) {
        return e
    }
};

export const thunkLogin = (credentials) => async dispatch => {
    const { email, password } = credentials
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ credential: email, password })
    });

    if (response.ok) {
        const data = await response.json();
        console.log("...thunkLogin...")
        await dispatch(setUser(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkSignup = (user) => async (dispatch) => {
    const response = await csrfFetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkLogout = () => async (dispatch) => {
    await csrfFetch("/api/session", {
        method: "DELETE",
    });
    dispatch(removeUser());
};


export const updateUserThunk = (userId, form) => async (dispatch) => {
    const { img_url } = form
    try {
        const formData = new FormData(); //AWS requires FormData class
        formData.append('userId', userId) //append, NOT push
        formData.append("image", img_url);

        const option = {
            method: "PUT",
            headers: { 'Content-Type': 'multipart/form-data' }, //"form-data" <-- required for AWS
            body: formData
        }

        const response = await csrfFetch(`/api/users/${userId}/update`, option);
        if (response.ok) {
            const user = await response.json();
            dispatch(setUser(user));
            // dispatch(editUser(user))

        } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data
            } else {
                throw new Error('An error occured. Please try again.')
            }
        }
        return response;
    } catch (e) {
        return e
    }
}


//Reducer
const initialState = { user: null };

function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            console.log("....sessionReducer ==> SET-USER  ======> action.payload ====> ", action.payload)
            if (action.payload?.user){
                //thunkLogin
                return { ...state, user: action.payload.user };
            }
            //thunkAuthenticate
            return { ...state, user: action.payload };
        case REMOVE_USER:
            console.log("=======> Removing user: setting user to null")
            return { user: null };
        default:
            return state;
    }
}

export default sessionReducer;