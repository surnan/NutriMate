// frontend/src/redux/workouts.js
import { csrfFetch } from "./csrf";

const LOAD_WORKOUTS_ALL = "weights/loadWorkoutsAll"
// const LOAD_WORKOUTS_USER = "weights/loadWorkoutsUser"
const LOAD_WORKOUTS_ONE = "weights/loadWorkoutsOne"
const POST_WORKOUTS_ONE = "weights/postWorkoutsOne"
const UPDATE_WORKOUTS_ONE = "weights/updateWorkoutsOne"
const REMOVE_WORKOUTS_ONE = "weights/removeWorkoutsOne"


//Actions
const loadWorkoutsAll = (data) => ({
        type: LOAD_WORKOUTS_ALL,
        payload: data
})

const loadWorkoutsOne = (data) => ({
        type: LOAD_WORKOUTS_ONE,
        payload: data
})

const removeWorkoutsOne = (data) => ({
        type: REMOVE_WORKOUTS_ONE,
        payload: data
})

const postWorkoutsOne = (data) => ({
        type: POST_WORKOUTS_ONE,
        payload: data
})

const updateWorkoutsOne = (data) => ({
    type: UPDATE_WORKOUTS_ONE,
    payload: data
})

// const loadWorkoutsUser = (data) => ({
//         type: LOAD_WORKOUTS_USER,
//         payload: data
// })

// Thunks
export const getWorkoutsAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/workouts')
    if (response.ok) {
        const data = await response.json();
        await dispatch(loadWorkoutsAll(data))
        return data
    }
}

export const getWorkoutOneThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/workouts/${id}`)
    if (response.ok) {
        const data = await response.json();
        console.log("===> data ==> ", data)
        await dispatch(loadWorkoutsOne(data))
        return data
    }
}

export const postWorkoutsOneThunk = ({ body }) => async (dispatch) => {
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

export const updateWorkoutsOneThunk = ({body}) => async (dispatch) => {
    const response = await csrfFetch(`/api/workouts/${body.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const workoutData = await response.json()
        await dispatch(updateWorkoutsOne(workoutData))
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

// State object
const initialState = {
    allWorkouts: [],
    byId: {},
    // currentWorkout: {}
    single: {}
}


//Reducers
const workoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_WORKOUTS_ALL: {
            let newState = {...state}
            // thunk returns JSON with key named: 'Workouts'
            newState.allWorkouts = action.payload.Workouts;
            for (let workouts of action.payload.Workouts) {
                newState.byId[workouts.id] = workouts
            }
            return newState
        }
        case LOAD_WORKOUTS_ONE: {
            let newState = {...state}
            newState.single = action.payload
            console.log("____LOAD_WORKOUTS_ONE")
            console.log("____action.payload", action.payload)
            console.log("____newState.single = ", newState)
            return newState
        }
        case POST_WORKOUTS_ONE: {
            let newState = {...state}
            newState.allWorkouts = [action.payload, ...newState.allWorkouts]
            newState.byId[action.payload.id] = action.payload;
            return newState
        }
        case REMOVE_WORKOUTS_ONE: {
            let newState = {...state}
            newState.allWorkouts = newState.allWorkouts.filter(currentWorkout => currentWorkout.id !== action.payload);
            delete newState.byId[action.payload.id]
            return newState
        }
        case UPDATE_WORKOUTS_ONE: {
            let newState = {...state}
            newState.allWorkouts = [action.payload, ...newState.allWorkouts]
            newState.byId[action.payload.id] = action.payload;
            return newState
        }
        default: {
            return initialState
        }
    }
}

export default workoutsReducer;
