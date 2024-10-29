// frontend/src/redux/store.js
import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
    combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import weightsReducer from "./weight";
import workoutsReducer from "./workouts"
import grubsReducer from "./grubs"
import daylogsReducer from "./daylogs"
import workoutImagesReducer from "./workoutImages";
import grubImagesReducer from "./grubImages";

const rootReducer = combineReducers({
    session: sessionReducer,
    weights: weightsReducer,
    workouts: workoutsReducer,
    grubs: grubsReducer,
    daylogs: daylogsReducer,
    workoutimages: workoutImagesReducer,
    grubimages: grubImagesReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = (await import("redux-logger")).default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
