// frontend/src/redux/workouts.js
import { csrfFetch } from "./csrf";

const LOAD_GRUBS_ALL = "grubs/loadGrubsAll"
// const LOAD_GRUB_USER = "grubs/loadGrubsUser"
// const LOAD_GRUBS_ONE = "grubs/loadGrubsOne"
const POST_GRUBS_ONE = "grubs/postGrubsOne"
const UPDATE_GRUBS_ONE = "grubs/updateGrubsOne"
const REMOVE_GRUBS_ONE = "grubs/removeGrubsOne"


//Actions
const loadGrubsAll = (data) => ({
    type: LOAD_GRUBS_ALL,
    payload: data
});

const removeGrubsOne = (data) => ({
    type: REMOVE_GRUBS_ONE,
    payload: data
})

const postGrubsOne = (data) => ({
    type: POST_GRUBS_ONE,
    payload: data
})


const updateGrubsOne = (data) => ({
    type: UPDATE_GRUBS_ONE,
    payload: data
})

// const loadGrubsUser = (data) => ({
//     type: LOAD_GRUB_USER,
//     payload: data
// })

// const loadGrubsOne = (data) => ({
//     type: LOAD_GRUBS_ONE,
//     payload: data
// })

// Thunks
export const getGrubsAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/grubs')
    if (response.ok) {
        const data = await response.json();
        await dispatch(loadGrubsAll(data))
        return data
    }
}

export const postGrubsOneThunk = ({ body }) => async (dispatch) => {
    const response = await csrfFetch('/api/grubs', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const grubData = await response.json()
        await dispatch(postGrubsOne(grubData))
        return grubData
    }
}

export const updateGrubsOneThunk = ({ body }) => async (dispatch) => {
    const response = await csrfFetch(`/api/grubs/${body.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const grubData = await response.json()
        await dispatch(updateGrubsOne(grubData))
        return grubData
    }
}

export const deleteGrubThunkById = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/grubs/${id}`, {
        method: 'DELETE',
        header: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
        const reviewData = await res.json();
        await dispatch(removeGrubsOne(id));
        return reviewData;
    }
}


// State object
const initialState = {
    allGrubs: [],
    byId: {},
    currentGrub: {}
}

//Reducers
const grubsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GRUBS_ALL: {
            let newState = { ...state }
            newState.allGrubs = action.payload.Grubs;
            for (let grub of action.payload.Grubs) {
                newState.byId[grub.id] = grub
            }
            return newState
        }
        case POST_GRUBS_ONE: {
            let newState = { ...state }
            newState.allGrubs = [action.payload, ...newState.allGrubs]
            newState.byId[action.payload.id] = action.payload;
            return newState
        }
        case REMOVE_GRUBS_ONE: {
            let newState = { ...state }
            newState.allGrubs = newState.allGrubs.filter(currentGrub => currentGrub.id !== action.payload);
            delete newState.byId[action.payload.id]
            return newState
        }
        case UPDATE_GRUBS_ONE: {
            let newState = { ...state }
            newState.allGrubs = [action.payload, ...newState.allGrubs]
            newState.byId[action.payload.id] = action.payload;
            return newState
        }
        default: {
            return initialState
        }
    }
}

export default grubsReducer;
