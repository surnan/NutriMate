
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
const removeWeightsUser = (data) => {
    return {
        type: REMOVE_WEIGHTS_USER,
        payload: data
    }
}


function avoidingErrors() {
    loadWeightsUser(null);
    removeWeightsUser(null);
    loadWeightsOne(null);
}

// Thunks
export const getWeightsAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/weights')
    if (response.ok) {
        // console.log("===> response = ", response)
        const data = await response.json();
        // console.log("===> getWeightsAllThunk data = ", data)
        await dispatch(loadWeightsAll(data))
        return data
    }
}

export const postWeightsOneThunk = ({ body }) => async (dispatch) => {

    console.log("=11===========> postWeightsOneThunk ===> ", JSON.stringify(body))

    const response = await csrfFetch('/api/weights', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const weightData = await response.json()
        console.log("=22===========> postWeightsOneThunk ===> ", weightData)
        await dispatch(postWeightsOne(weightData))
        return weightData
    }
}

export const deleteWeightThunkById = (id) => async (dispatch) => {
    // console.log("1 - ====> (ID = ", id)
    const res = await csrfFetch(`/api/weights/${id}`, {
        method: 'DELETE',
        header: { 'Content-Type': 'application/json' }
    }) 

    console.log("2 - ====> (ID = ", id)

    if (res.ok) {
        const reviewData = await res.json();
        await dispatch(removeWeightsOne(id));
        return reviewData;
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
            let newState = { ...state }

            // thunk returns JSON with key named: 'Weights'
            // thunk returns JSON with values is array of Weight

            newState.allWeights = action.payload.Weights;

            for (let weight of action.payload.Weights) {
                newState.byId[weight.id] = weight
            }

            return newState
        }
        case LOAD_WEIGHTS_USER: {
            let newState = { ...newState }
            return newState
        }
        case LOAD_WEIGHTS_ONE: {
            let newState = { ...newState }
            return newState
        }
        case POST_WEIGHTS_ONE: {
            let newState = { ...state }

            console.log("==== weightsReducer.ACTION ====> ", action)


            newState.allWeights = [action.payload, ...newState.allWeights]
            newState.byId[action.payload.id] = action.payload;

            return newState
        }
        case REMOVE_WEIGHTS_ONE: {
            let newState = { ...state }
            // newState.allReviews = newState.allReviews.filter(review => review.id !== action.payload);
            newState.allWeights = newState.allWeights.filter(currentWeight => currentWeight.id !== action.payload);
            delete newState.byId[action.payload];
            return newState;
        }
        case REMOVE_WEIGHTS_USER: {
            let newState = { ...newState }
            return newState
        }
        default: {
            avoidingErrors()
            return initialState
        }
    }
}

export default weightsReducer;


// console.log("++++ =======>")
// console.log("state ==> ", state)
// console.log("action ==> ", action)
// console.log("newState ==> ", newState)