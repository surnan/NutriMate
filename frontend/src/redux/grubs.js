// frontend/src/redux/workouts.js
import { csrfFetch } from "./csrf";

const LOAD_GRUBS_ALL = "grubs/loadGrubsAll"

//Actions
const loadGrubsAll = (data) => {
    return {
        type: LOAD_GRUBS_ALL,
        payload: data
    }
}


// Thunks
export const getGrubsAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/grubs')
    if (response.ok) {
        const data = await response.json();
        console.log("======> getGrubsAllThunk ===> ", data)
        await dispatch(loadGrubsAll(data))
        return data
    }
}

// State object
const initialState = {
    allGrubs: [],
    byId: {},
    currentGrub: {}
}

//Reducers
const grubsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GRUBS_ALL: {

            // console.log("======> LOAD_GRUBS_ALL (action) ===> ", action)


            let newState = {...state}

            // thunk returns JSON with key named: 'Grubs'
            // thunk returns JSON with values is array of Grubs

            newState.allGrubs = action.payload.Grubs;

            for (let grub of action.payload.Grubs) {
                newState.byId[grub.id] = grub
            }

            console.log("======> LOAD_GRUBS_ALL (newState) ===> ", newState)

            return newState
        }
        default: {
            return initialState
        }
    }
}

export default grubsReducer;
