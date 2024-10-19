// frontend/src/redux/workouts.js
import { csrfFetch } from "./csrf";

const LOAD_WORKOUTS_ALL = "dailyLogs/loadAll"
// const LOAD_WORKOUTS_USER = "weights/loadWorkoutsUser"
// const LOAD_WORKOUTS_ONE = "weights/loadWorkoutsOne"
const POST_WORKOUTS_ONE = "dailyLogs/postDailyLogsOne"
const UPDATE_WORKOUTS_ONE = "dailyLogs/updateDailyLogsOne"
const REMOVE_WORKOUTS_ONE = "dailyLogs/removeDailyLogsOne"


//Actions
const loadDailyLogsAll = (data) => ({
        type: LOAD_DAILY_LOG_ALL,
        payload: data
})

const removeDailyLogsOne = (data) => ({
        type: REMOVE_DAILY_LOG_ONE,
        payload: data
})


const postDailyLogsOne = (data) => ({
        type: POST_DAILY_LOG_ONE,
        payload: data
})

const updateDailyLogsOne = (data) => ({
    type: UPDATE_DAILY_LOG_ONE,
    payload: data
})

// const loadWorkoutsOne = (data) => ({
//         type: LOAD_WORKOUTS_ONE,
//         payload: data
// })

// const loadWorkoutsUser = (data) => ({
//         type: LOAD_WORKOUTS_USER,
//         payload: data
// })



// Thunks
export const getDailyLogsAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/dailyLogs')
    if (response.ok) {
        const data = await response.json();
        await dispatch(loadWorkoutsAll(data))
        return data
    }
}

export const postDailyLogsThunk = ({ body }) => async (dispatch) => {
    const response = await csrfFetch('/api/dailyLogs', {
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

export const updateWorkoutsOneThunk = ({DailyLogs}) => async (dispatch) => {
    const response = await csrfFetch(`/api/DailyLogs/${DailyLogs.id}`, {
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
    currentWorkout: {}
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
