// frontend/src/redux/grubimages.js
import { csrfFetch } from "./csrf";

const LOAD_GRUBIMAGES_ALL = "grubimages/loadGrubImagesAll"
const LOAD_GRUBIMAGES_ONE = "grubimages/loadGrubImagesOne"
const LOAD_GRUBIMAGES_GRUB = "grubimages/loadGrubImagesGrubAll"
const REMOVE_GRUB_ONE = "grubimages/removeGrubImagesOne"
const POST_GRUB_ONE = "grubimages/postGrubImagesOne"
const UPDATE_GRUB_ONE = "grubimages/updateGrubImagesOne"

//Actions
const loadGrubImagesAll = (data) => ({
    type: LOAD_GRUBIMAGES_ALL,
    payload: data
})

const loadGrubImagesOne = (data) => ({
    type: LOAD_GRUBIMAGES_ONE,
    payload: data
})

const updateGrubImagesOne = (data) => ({
    type: UPDATE_GRUB_ONE,
    payload: data
})

const removeGrubImagesOne = (data) => ({
    type: REMOVE_GRUB_ONE,
    payload: data
})

const postGrubImagesOne = (data) => ({
    type: POST_GRUB_ONE,
    payload: data
})

const loadGrubImagesForGrub = (data) => ({
    type: LOAD_GRUBIMAGES_GRUB,
    payload: data
})


// Thunks
export const getGrubImagesAllThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/grubimages')
    if (response.ok) {
        const data = await response.json();
        await dispatch(loadGrubImagesAll(data))
        return data
    }
}

export const getGrubImagesOneThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/grubimages/${id}`)
    if (response.ok) {
        const data = await response.json();
        console.log("===> data ==> ", data)
        await dispatch(loadGrubImagesOne(data))
        return data
    }
}

export const getGrubImagesForGrubThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/grubimages/grub/${id}`)
    if (response.ok) {
        const data = await response.json();
        console.log("===> data ==> ", data)
        await dispatch(loadGrubImagesForGrub(data))
        return data
    }
}

export const postGrubImagesOneThunk = ({ body }) => async (dispatch) => {
    const response = await csrfFetch('/api/grubimages', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const grubData = await response.json()
        await dispatch(postGrubImagesOne(grubtData))
        return grubData
    }
}


export const deleteGrubThunkByGrub = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/grubimages/${id}`, {
        method: 'DELETE',
        header: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
        const reviewData = await res.json();
        await dispatch(removeGrubImagesOne(id));
        return reviewData;
    }
}

export const updateGrubImagesOneThunk = ( body ) => async (dispatch) => {
    console.log("...body...updateGrubImagesOneThunk...  = ", body)
    const { grubId, url, name } = body

    try {
        const formData = new FormData(); //AWS requires FormData class
        formData.append('grubId', grubId) //append, NOT push
        formData.append("image", url);
        formData.append("name", name)

        const option = {
            method: "PUT",
            headers: { 'Content-Type': 'multipart/form-data' }, //"form-data" <-- required for AWS
            body: formData
        }
        const response = await csrfFetch(`/api/grubimages/${grubId}/update`,option)

        if (response.ok) {
            const currentGrub = await response.json()
            dispatch(updateGrubImagesOne(currentGrub))
        }
        return response
    } catch (e) {
        return e
    }
}

// State object
const initialState = {
    allGrubImages: [],
    currentgrub: [],
    byId: {},
    single: {}
};

const grubImagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GRUBIMAGES_ALL: {
            let newState = { ...state };
            newState.allGrubImages = action.payload.GrubImages;
            for (let grubImage of action.payload.GrubImages) {
                newState.byId[grubImage.id] = grubImage;
            }
            return newState;
        }
        case LOAD_GRUBIMAGES_ONE: {
            let newState = { ...state };
            newState.single = action.payload;
            return newState;
        }
        case POST_GRUB_ONE: {
            let newState = { ...state };
            newState.allGrubImages = [action.payload, ...newState.allGrubImages];
            newState.byId[action.payload.id] = action.payload;
            return newState;
        }
        case REMOVE_GRUB_ONE: {
            let newState = { ...state };
            newState.allGrubImages = newState.allGrubImages.filter(
                (currentGrub) => currentGrub.id !== action.payload
            );
            delete newState.byId[action.payload];
            return newState;
        }
        case LOAD_GRUBIMAGES_GRUB: {
            let newState = { ...state };
            newState.currentgrub
             = action.payload
            return newState
        }
        case UPDATE_GRUB_ONE: {
            let newState = {...state}
            console.log("...case UPDATE_GRUBIMAGES_ONE...")
            console.log("...action.payload")

            //below is for the workpageform.map
            //not sure if it creates multi-d array if action.payload is an array
            newState.currentgrub = Array(action.payload)
            return newState
        }
        default: {
            return state;
        }
    }
};

export default grubImagesReducer;

