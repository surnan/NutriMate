// frontend/src/redux/workouts.js
import { csrfFetch } from "./csrf";

const LOAD_DAYLOGS_ALL = "daylogs/loadDayLogsAll"


//Actions
const loadDailyLogsAll = (data) => ({
        type: LOAD_DAYLOGS_ALL,
        payload: data
})



// Thunks
export const getDailyLogsAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/daylogs')
    if (response.ok) {
        const data = await response.json();
        await dispatch(loadDailyLogsAll(data))
        return data
    }
}



// State object
const initialState = {
    allDayLogs: [],
    byId: {},
    currentDayLog: {}
}


//Reducers
const daylogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_DAYLOGS_ALL: {
            let newState = {...state}
            // thunk returns JSON with key named: 'Workouts'
            newState.allDayLogs = action.payload.allDayLogs;
            for (let workouts of action.payload.DailyLogs) {
                newState.byId[workouts.id] = workouts
            }

            console.log("====> inside Reducer ===> (newstate) ===> ", newState)
            return newState
        }
        default: {
            return initialState
        }
    }
}

export default daylogsReducer;
