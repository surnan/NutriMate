import { csrfFetch } from "./csrf";

const LOAD_WEIGHTS_ALL = "weights/loadWeightsAll"
const LOAD_WEIGHTS_USER = "weights/loadWeightsUser"
const LOAD_WEIGHTS_ONE = "weights/loadWeightsOne"

const POST_WEIGHTS_ONE = "weights/postWeightsOne"
const REMOVE_WEIGHTS_ONE = "weights/removeWeightsOne"
const REMOVE_WEIGHTS_USER = "weights/removeWeightsUser"

// Actions
const loadWeightsAll = (data) => {
    return {
        type: LOAD_WEIGHTS_ALL,
        payload: data
    }
}
const loadWeightsUser = (data) => {
    return {
        type: LOAD_WEIGHTS_USER,
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
const removeWeightsOne = (data) => {
    return {
        type: REMOVE_WEIGHTS_ONE,
        payload: data
    }
}
const removeWeightsUser = (data) => {
    return {
        type: REMOVE_WEIGHTS_USER,
        payload: data
    }
}


function avoidingErrors(){
    loadWeightsUser(null);
    removeWeightsUser(null);
    removeWeightsOne(null);
    postWeightsOne(null);
    loadWeightsOne(null);
}

// Thunks
export const getWeightsAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/weights')

    if (response.ok){
        const data = await response.json();
        dispatch(loadWeightsAll)
        return data
    }
}




// State object
const initialState = {
    allWeights: [],
    byId: {},
    currentWeight: {}
}

//Reducers
const weightsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_WEIGHTS_ALL: {
            let newState = {...state}
            return newState
        }
        case LOAD_WEIGHTS_USER: {
            let newState = {...newState}
            return newState
        }
        case LOAD_WEIGHTS_ONE: {
            let newState = {...newState}
            return newState
        }
        case POST_WEIGHTS_ONE: {
            let newState = {...newState}
            return newState
        }
        case REMOVE_WEIGHTS_ONE: {
            let newState = {...newState}
            return newState
        }
        case REMOVE_WEIGHTS_USER: {
            let newState = {...newState}
            return newState
        }
        default: {
            avoidingErrors()
            console.log(initialState)
            return initialState
        }
    }
}

export default weightsReducer;