// frontend/src/redux/workouts.js
import { csrfFetch } from "./csrf";

const LOAD_DAYLOGS_ALL = "daylogs/loadDaylogsAll"
const LOAD_DAYLOGS_ONE= "daylogs/loadDaylogsOne"
const POST_DAYLOGS_ONE = "daylogs/postDaylogsOne"
const UPDATE_DAYLOGS_ONE = "daylogs/updateDaylogsOne"
const REMOVE_DAYLOGS_ONE = "daylogs/removeDaylogsOne"


//Actions
const loadDailyLogsAll = (data) => ({
    type: LOAD_DAYLOGS_ALL,
    payload: data
})

const loadDailyLogsOne = (data) => ({
    type: LOAD_DAYLOGS_ONE,
    payload: data
})

const removeDailyLogsOne = (data) => ({
    type: REMOVE_DAYLOGS_ONE,
    payload: data
})
const postDailyLogsOne = (data) => ({
    type: POST_DAYLOGS_ONE,
    payload: data
})
const updateDailyLogsAll = (data) => ({
    type: UPDATE_DAYLOGS_ONE,
    payload: data
})



// Thunks
export const getDailyLogsAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/daylogs')
    const data = await response.json();
    if (response.ok) {
        await dispatch(loadDailyLogsAll(data))
        return data
    }
}

export const getDailyLogsOneThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/daylogs/${id}`)
    if (response.ok) {
        const data = await response.json();
        console.log("===> data ==> ", data)
        await dispatch(loadDailyLogsOne(data))
        return data
    }
}

export const deleteDailyLogsThunkById = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/daylogs/${id}`, {
        method: 'DELETE',
        header: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
        const reviewData = await res.json();
        await dispatch(removeDailyLogsOne(id));
        return reviewData;
    }
}

export const postDailyLogsOneThunk = ({ body }) => async (dispatch) => {
    const response = await csrfFetch(`/api/daylogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const workoutData = await response.json()
        await dispatch(postDailyLogsOne(workoutData))
        return workoutData
    }
}

export const updateDailyLogsOneThunk = ({ body }) => async (dispatch) => {
    const response = await csrfFetch(`/api/daylogs/${body.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const workoutData = await response.json()
        await dispatch(updateDailyLogsAll(workoutData))
        return workoutData
    }
}


// State object
const initialState = {
    allDaylogs: [],
    byId: {},
    // currentDaylog: {}
    single: {}
}


//Reducers
const daylogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_DAYLOGS_ALL: {
            let newState = { ...state }
            // thunk returns JSON with key named: 'Workouts'
            // console.log("\n\n====> daylogsReducer.ACTION.payload ===> ", action.payload)
            newState.allDaylogs = action.payload.DayLog;
            for (let workouts of action.payload.DayLog) {
                newState.byId[workouts.id] = workouts
            }
            return newState
        }
        case LOAD_DAYLOGS_ONE: {
            let newState = {...state}
            newState.single = action.payload
            console.log("____LOAD_DAILYLOGS_ONE")
            console.log("____action.payload", action.payload)
            console.log("____newState.single = ", newState)
            return newState
        }
        case REMOVE_DAYLOGS_ONE: {
            let newState = { ...state }
            newState.allDaylogs = newState.allDaylogs.filter(currentWorkout => currentWorkout.id !== action.payload);
            delete newState.byId[action.payload.id]
            return newState
        }
        case POST_DAYLOGS_ONE: {
            let newState = {...state}
            newState.allDaylogs = [action.payload, ...newState.allDaylogs]
            newState.byId[action.payload.id] = action.payload;
            return newState
        }
        case UPDATE_DAYLOGS_ONE: {
            let newState = {...state}
            newState.allDaylogs = [action.payload, ...newState.allDaylogs]
            newState.byId[action.payload.id] = action.payload;
            return newState
        }
        default: {
            return initialState
        }
    }
}

export default daylogsReducer;
