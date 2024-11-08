// frontend/src/redux/workouts.js
import { csrfFetch } from "./csrf";

const LOAD_DAYLOGS_ALL = "daylogs/loadDaylogsAll"
const LOAD_DAYLOGS_ONE = "daylogs/loadDaylogsOne"
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
            const newState = { ...state, byId: {} };
            newState.allDaylogs = action.payload.DayLog;
            action.payload.DayLog.forEach(daylog => {
                newState.byId[daylog.id] = daylog;
            });
            return newState;
        }
        case LOAD_DAYLOGS_ONE: {
            console.log("... reducer ...", action.payload)
            return {
                ...state,
                single: action.payload
            };
        }
        case REMOVE_DAYLOGS_ONE: {
            const newState = { 
                ...state,
                allDaylogs: state.allDaylogs.filter(daylog => daylog.id !== action.payload),
            };
            delete newState.byId[action.payload];
            return newState;
        }
        case POST_DAYLOGS_ONE: {
            return {
                ...state,
                allDaylogs: [action.payload, ...state.allDaylogs],
                byId: {
                    ...state.byId,
                    [action.payload.id]: action.payload
                }
            };
        }
        case UPDATE_DAYLOGS_ONE: {
            const updatedAllDaylogs = state.allDaylogs.map(daylog =>
                daylog.id === action.payload.id ? action.payload : daylog
            );
            return {
                ...state,
                allDaylogs: updatedAllDaylogs,
                byId: {
                    ...state.byId,
                    [action.payload.id]: action.payload
                }
            };
        }
        default: {
            return state
        }
    }
}

export default daylogsReducer;






// const daylogsReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case LOAD_DAYLOGS_ALL: {
//             let newState = { ...state }
//             newState.allDaylogs = action.payload.DayLog;
//             for (let workouts of action.payload.DayLog) {
//                 newState.byId[workouts.id] = workouts
//             }
//             return newState
//         }
//         case LOAD_DAYLOGS_ONE: {
//             let newState = {...state}
//             newState.single = action.payload
//             return newState
//         }
//         case REMOVE_DAYLOGS_ONE: {
//             let newState = { ...state }
//             newState.allDaylogs = newState.allDaylogs.filter(currentWorkout => currentWorkout.id !== action.payload);
//             delete newState.byId[action.payload.id]
//             return newState
//         }
//         case POST_DAYLOGS_ONE: {
//             let newState = {...state}
//             newState.allDaylogs = [action.payload, ...newState.allDaylogs]
//             newState.byId[action.payload.id] = action.payload;
//             return newState
//         }
//         case UPDATE_DAYLOGS_ONE: {
//             let newState = {...state}
//             newState.allDaylogs = [action.payload, ...newState.allDaylogs]
//             newState.byId[action.payload.id] = action.payload;
//             return newState
//         }
//         default: {
//             return state
//         }
//     }
// }