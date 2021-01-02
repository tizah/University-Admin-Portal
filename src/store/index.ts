import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"; 

import authReducer from "./reducers/authReducer";
import seedStudentReducer from "./reducers/seedStudentReducer";
import studentReducer from "./reducers/studentReducer";

const  rootReducer = combineReducers({
    auth: authReducer,
    seeder: seedStudentReducer,
    student: studentReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;