// frontend/src/redux/workouts.js
import { csrfFetch } from "./csrf";

const LOAD_GRUBS_ALL = "grubs/loadGrubsAll"
const LOAD_GRUB_USER = "grubs/loadGrubsUser"
const LOAD_GRUBS_ONE = "grubs/loadGrubsOne"
const POST_GRUBS_ONE = "grubs/postGrubsOne"
const UPDATE_GRUBS_ONE = "grubs/updateGrubsOne"
const REMOVE_GRUBS_ONE = "grubs/removeGrubsOne"
const REMOVE_GRUBS_USER = "grubs/removeGrubsUser"

//Actions

const loadGrubsAll = (data) => ({
    type: LOAD_GRUBS_ALL,
    payload: data
});

const loadGrubsUser = (data) => {
    return {
        type: LOAD_GRUB_USER,
        payload: data
    }
}
const loadGrubsOne = (data) => {
    return {
        type: LOAD_GRUBS_ONE,
        payload: data
    }
}
const postGrubsOne = (data) => {
    return {
        type: POST_GRUBS_ONE,
        payload: data
    }
}
const updateGrubsOne = (data) => {
    return {
        type: UPDATE_GRUBS_ONE,
        payload: data
    }
}
const removeGrubsOne = (data) => {
    return {
        type: REMOVE_GRUBS_ONE,
        payload: data
    }
}
const removeGrubsUser = (data) => {
    return {
        type: REMOVE_GRUBS_USER,
        payload: data
    }
}

// Thunks
export const getGrubsAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/grubs')
    if (response.ok) {
        const data = await response.json();
        console.log("======> getGrubsAllThunk ===> ", data)
        await dispatch(loadGrubsAll(data))
        return data
    }
}


export const postGrubsOneThunk = ({ body }) => async (dispatch) => {
    console.log("\n\n")
    console.log("=====> postGrubsOneThunk.body ==> ", body)
    console.log("\n\n")

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
            let newState = {...state}
            newState.allGrubs = action.payload.Grubs;
            for (let grub of action.payload.Grubs) {
                newState.byId[grub.id] = grub
            }
            return newState
        }
        case POST_GRUBS_ONE: {
            let newState = {...state}
            console.log("==== grubsReducer.ACTION ====> ", action)
            newState.allGrubs = [action.payload, ...newState.allGrubs]
            newState.byId[action.payload.id] = action.payload;
            return newState
        }
        case REMOVE_GRUBS_ONE: {
            let newState = {...state}
            
            // newState.allWeights = newState.allWeights.filter(currentWeight => currentWeight.id !== action.payload);
            newState.allGrubs = newState.allGrubs.filter(currentGrub => currentGrub.id !== action.payload);
            
            // delete newState.byId[action.payload]
            delete newState.byId[action.payload.id]
            
            return newState
        }
        default: {
            REMOVE_GRUBS_ONE
            return initialState
        }
    }
}

export default grubsReducer;
