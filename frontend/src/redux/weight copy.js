
import { csrfFetch } from "./csrf";

const LOAD_WEIGHTS_ALL = "weights/loadWeightsAll"
const LOAD_WEIGHTS_USER = "weights/loadWeightsUser"
const LOAD_WEIGHTS_ONE = "weights/loadWeightsOne"

const POST_WEIGHTS_ONE = "weights/postWeightsOne"
const UPDATE_WEIGHTS_ONE = "weights/updateWeightsOne"
const REMOVE_WEIGHTS_ONE = "weights/removeWeightsOne"
const REMOVE_WEIGHTS_USER = "weights/removeWeightsUser"

// Actions
const loadWeightsAll = (data) => {
    return {
        type: LOAD_WEIGHTS_ALL,
        payload: data
    }
}

const loadWeightsOne = (data) => {
    return {
        type: LOAD_WEIGHTS_ONE,
        payload: data
    }
}

const postWeightsOne = (data) => {
    return {
        type: POST_WEIGHTS_ONE,
        payload: data
    }
}
const updateWeightsOne = (data) => {
    return {
        type: UPDATE_WEIGHTS_ONE,
        payload: data
    }
}

const removeWeightsOne = (data) => {
    return {
        type: REMOVE_WEIGHTS_ONE,
        payload: data
    }
}


// Thunks
export const getWeightsAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/weights')
    if (response.ok) {
        const data = await response.json();
        await dispatch(loadWeightsAll(data))
        return data
    }
}

export const getWeightsOneThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/weights/${id}`)
    if (response.ok) {
        const data = await response.json();
        await dispatch(loadWeightsOne(data))
        return data
    }
    return null; // Return null or an error object if the fetch fails
}

export const deleteWeightThunkById = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/weights/${id}`, {
        method: 'DELETE',
        header: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
        const reviewData = await res.json();
        await dispatch(removeWeightsOne(id));
        return reviewData;
    }
}

export const postWeightsOneThunk = ({ body }) => async (dispatch) => {
    const response = await csrfFetch('/api/weights', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const weightData = await response.json()
        await dispatch(postWeightsOne(weightData))
        return weightData
    }
}

export const updateWeightThunkById = ({ body }) => async (dispatch) => {
    const response = await csrfFetch(`/api/weights/${body.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const weightData = await response.json()
        await dispatch(updateWeightsOne(weightData))
        return weightData
    }
}


// State object
const initialState = {
    allWeights: [],
    byId: {},
    single: {}
}

//Reducers
const weightsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_WEIGHTS_ALL: {
            let newState = { ...state, byId: {} }
            newState.allWeights = action.payload.Weights;
            for (let weight of action.payload.Weights) {
                newState.byId[weight.id] = weight
            }
            return newState
        }
        case LOAD_WEIGHTS_ONE: {
            return {
                ...state,
                single: action.payload
            };
        }
        case REMOVE_WEIGHTS_ONE: {
            let newState = { ...state }
            newState.allWeights = newState.allWeights.filter(currentWeight => currentWeight.id !== action.payload);
            delete newState.byId[action.payload.id];
            return newState;
        }
        case POST_WEIGHTS_ONE: {
            let newState = { ...state }
            newState.allWeights = [action.payload, ...newState.allWeights]
            newState.byId[action.payload.id] = action.payload;
            return newState
        }
        case UPDATE_WEIGHTS_ONE: {
            let newState = { ...state }
            newState.allWeights = [action.payload, ...newState.allWeights]
            newState.byId[action.payload.id] = action.payload;
            return newState
        }
        case LOAD_WEIGHTS_USER: {
            let newState = { ...state }
            return newState
        }
        default: {
            return state
        }
    }
}

export default weightsReducer;