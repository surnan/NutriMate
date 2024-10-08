// frontend/src/redux/workouts.js
import { csrfFetch } from "./csrf";

const LOAD_GRUBS_ALL = "weights/loadGrubsAll"

//Actions
const loadGrubsAll = (data) => {
    return {
        type: LOAD_GRUBS_ALL,
        payload: data
    }
}


// State object
const initialState = {
    allGrubs: [],
    byId: {},
    currentGrub: {}
}


// Thunks
export const getGrubsAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/grubs')
    if (response.ok) {
        const data = await response.json();
        await dispatch(loadGrubsAll(data))
        return data
    }
}


//Reducers
const grubsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GRUBS_ALL: {
            let newState = {...state}

            // thunk returns JSON with key named: 'Grubs'
            // thunk returns JSON with values is array of Grubs

            newState.allGrubs = action.payload.Grubs;

            for (let grub of action.payload.Grubs) {
                newState.byId[grub.id] = grub
            }

            return newState
        }
        default: {
            return initialState
        }
    }
}

export default grubsReducer;
