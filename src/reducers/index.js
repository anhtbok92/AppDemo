import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../container/HomeContainer/reducer";
import newsReducer from "../container/GridViewContainer/reducer";

export default combineReducers({
	form: formReducer,
	homeReducer,
    newsReducer,
});
