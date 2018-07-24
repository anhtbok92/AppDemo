import axios from "axios";

const actionCreators = {
    setNews: (payload) => {
        return {
            type: "SET_ARTICLES",
            payload,
        };
    }
};

const fetchNews = (url: any) => {
    console.log('111111111111111');
    return dispatch => {
        axios.get(url).then(response => {
            console.log(response);
            dispatch(actionCreators.setNews(response.data.items));
        });
    };
};

export default actionCreators;

export { fetchNews };
