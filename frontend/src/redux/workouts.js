// frontend/src/redux/workouts.js
import { csrfFetch } from "./csrf";

const LOAD_WORKOUTS_ALL = "weights/loadWorkoutsAll"
const LOAD_WORKOUTS_USER = "weights/loadWorkoutsUser"
const LOAD_WORKOUTS_ONE = "weights/loadWorkoutsOne"
const POST_WORKOUTS_ONE = "weights/postWorkoutsOne"
const UPDATE_WORKOUTS_ONE = "weights/updateWorkoutsOne"
const REMOVE_WORKOUTS_ONE = "weights/removeWorkoutsOne"
const REMOVE_WORKOUTS_USER = "weights/removeWorkoutsUser"

//Actions
const loadWorkoutsAll = (data) => {
    return {
        type: LOAD_WORKOUTS_ALL,
        payload: data
    }
}

const loadWorkoutsUser = (data) => {
    return {
        type: LOAD_WORKOUTS_USER,
        payload: data
    }
}
const loadWorkoutsOne = (data) => {
    return {
        type: LOAD_WORKOUTS_ONE,
        payload: data
    }
}
const postWorkoutsOne = (data) => {
    return {
        type: POST_WORKOUTS_ONE,
        payload: data
    }
}
const updateWorkoutsOne = (data) => {
    return {
        type: UPDATE_WORKOUTS_ONE,
        payload: data
    }
}
const removeWorkoutsOne = (data) => {
    return {
        type: REMOVE_WORKOUTS_ONE,
        payload: data
    }
}
const removeWorkoutsUser = (data) => {
    return {
        type: REMOVE_WORKOUTS_USER,
        payload: data
    }
}


// State object
const initialState = {
    allWorkouts: [],
    byId: {},
    currentWorkout: {}
}

// Thunks
export const getWorkoutsAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/workouts')
    if (response.ok) {
        const data = await response.json();
        await dispatch(loadWorkoutsAll(data))
        return data
    }
}

export const postWorkoutsOneThunk = ({ body }) => async (dispatch) => {
    console.log("\n\n")
    console.log("=====> postWorkoutsOneThunk.body ==> ", body)
    console.log("\n\n")

    const response = await csrfFetch('/api/workouts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const workoutData = await response.json()
        await dispatch(postWorkoutsOne(workoutData))
        return workoutData
    }
}

export const deleteWorkoutThunkById = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/workouts/${id}`, {
        method: 'DELETE',
        header: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
        const reviewData = await res.json();
        await dispatch(removeWorkoutsOne(id));
        return reviewData;
    }
}

//Reducers
const workoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_WORKOUTS_ALL: {
            let newState = {...state}

            // thunk returns JSON with key named: 'Workouts'
            // thunk returns JSON with values is array of Workouts

            newState.allWorkouts = action.payload.Workouts;

            for (let workouts of action.payload.Workouts) {
                newState.byId[workouts.id] = workouts
            }

            return newState
        }
        case LOAD_WORKOUTS_USER: {
            let newState = {...state}
            return newState
        }
        case LOAD_WORKOUTS_ONE: {
            let newState = {...state}
            return newState
        }
        case POST_WORKOUTS_ONE: {
            let newState = {...state}
            console.log("==== workoutsReducer.ACTION ====> ", action)
            newState.allWorkouts = [action.payload, ...newState.allWorkouts]
            newState.byId[action.payload.id] = action.payload;
            return newState
        }
        case UPDATE_WORKOUTS_ONE: {
            let newState = {...state}
            return newState
        }
        case REMOVE_WORKOUTS_ONE: {
            let newState = {...state}
            return newState
        }
        case REMOVE_WORKOUTS_USER: {
            let newState = {...state}
            return newState
        }
        default: {
            return initialState
        }
    }
}

export default workoutsReducer;
