// frontend/src/redux/workouts.js
import { csrfFetch } from "./csrf";

const LOAD_DAYLOGS_ALL = "daylogs/loadDaylogsall"


//Actions
const loadDailyLogsAll = (data) => ({
        type: LOAD_DAYLOGS_ALL,
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



// State object
const initialState = {
    allDaylogs: [],
    byId: {},
    currentDaylog: {}
}


//Reducers
const daylogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_DAYLOGS_ALL: {
            let newState = {...state}
            // thunk returns JSON with key named: 'Workouts'
            console.log("\n\n====> ACTION.payload ===> ", action.payload)
            newState.allDaylogs = action.payload.DayLog;
            for (let workouts of action.payload.DayLog) {
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
