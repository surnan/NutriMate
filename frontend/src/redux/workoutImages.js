// frontend/src/redux/workoutimages.js
import { csrfFetch } from "./csrf";

// const LOAD_WORKOUTS_USER = "weights/loadWorkoutsUser"
const LOAD_WORKOUTIMAGES_ALL = "workoutimages/loadWorkoutImagesAll"
const LOAD_WORKOUTIMAGES_ONE = "workoutimages/loadWorkoutImagesOne"
const REMOVE_WORKOUTIMAGES_ONE = "workoutimages/removeWorkoutImagesOne"
const POST_WORKOUTIMAGES_ONE = "workoutimages/postWorkoutImagesOne"

//Actions
const loadWorkoutImagesAll = (data) => ({
        type: LOAD_WORKOUTIMAGES_ALL,
        payload: data
})

const loadWorkoutImagesOne = (data) => ({
        type: LOAD_WORKOUTIMAGES_ONE,
        payload: data
})

const removeWorkoutImagesOne = (data) => ({
        type: REMOVE_WORKOUTIMAGES_ONE,
        payload: data
})

const postWorkoutImagesOne = (data) => ({
        type: POST_WORKOUTIMAGES_ONE,
        payload: data
})


// Thunks
export const getWorkoutImagesAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/workoutimages')
    if (response.ok) {
        const data = await response.json();
        await dispatch(loadWorkoutImagesAll(data))
        return data
    }
}

export const getWorkoutImagesOneThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/workoutimages/${id}`)
    if (response.ok) {
        const data = await response.json();
        console.log("===> data ==> ", data)
        await dispatch(loadWorkoutImagesOne(data))
        return data
    }
}

export const postWorkoutImagesOneThunk = ({ body }) => async (dispatch) => {
    const response = await csrfFetch('/api/workoutimages', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const workoutData = await response.json()
        await dispatch(postWorkoutImagesOne(workoutData))
        return workoutData
    }
}


export const deleteWorkoutThunkByWorkout = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/workoutimages/${id}`, {
        method: 'DELETE',
        header: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
        const reviewData = await res.json();
        await dispatch(removeWorkoutImagesOne(id));
        return reviewData;
    }
}

// State object
const initialState = {
    allWorkoutImages: [],
    byId: {},
    single: {}
};

const workoutImagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_WORKOUTIMAGES_ALL: {
            let newState = { ...state };
            newState.allWorkoutImages = action.payload.WorkoutImages;
            for (let workoutImage of action.payload.WorkoutImages) {
                newState.byId[workoutImage.id] = workoutImage;
            }
            return newState;
        }
        case LOAD_WORKOUTIMAGES_ONE: {
            let newState = { ...state };
            newState.single = action.payload;
            return newState;
        }
        case POST_WORKOUTIMAGES_ONE: {
            let newState = { ...state };
            newState.allWorkoutImages = [action.payload, ...newState.allWorkoutImages];
            newState.byId[action.payload.id] = action.payload;
            return newState;
        }
        case REMOVE_WORKOUTIMAGES_ONE: {
            let newState = { ...state };
            newState.allWorkoutImages = newState.allWorkoutImages.filter(
                (currentWorkout) => currentWorkout.id !== action.payload
            );
            delete newState.byId[action.payload];
            return newState;
        }
        default: {
            return state;  
        }
    }
};

export default workoutImagesReducer;

