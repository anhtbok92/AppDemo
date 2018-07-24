const initialState = {
    articles: [],
};

const newsReducer = (state = initialState, action: Function) => {
	if (action.type === "SET_ARTICLES") {
        return {
            articles: action.payload,
            newsRefreshing: false,
        };
	}
	return state;
};

export default newsReducer;
