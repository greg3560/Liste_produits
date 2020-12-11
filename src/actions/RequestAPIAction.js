import * as types from '../constants/ActionTypes';
import * as APIConfig from '../constants/APIConfig';
import axios from "axios/index";

// actions creators

export const requestAPI = () => ({ // action for api loading
    type: types.REQUEST_API,
    loading: true,
});
export const requestAPISuccessAll = (data) => ({ // action for api success
    type: types.REQUEST_API_SUCCESS_ALL,
    products: data,
    loading: false,
});

export const requestAPISuccess = (data) => ({ // action for api success
    type: types.REQUEST_API_SUCCESS,
    data,
    loading: false,
});
export const requestAPIError = (error) => ({ // action for api error
    type: types.REQUEST_API_ERROR,
    loading: false,
    error,
});

/* thunk creation */

export const fetchProducts = (type, param) => {
    let query;

    switch(type) {
        case 'fetchAll':
            query = `${APIConfig.API_URI + APIConfig.END_POINT_PRODUCT}`;
            break;
        case 'fetchCategory':
            query = `${APIConfig.API_URI + APIConfig.END_POINT_PRODUCT + APIConfig.END_POINT_CATEGORY + param}`;
            break;
        case 'fetchOne':
            query = `${APIConfig.API_URI + APIConfig.END_POINT_PRODUCT + param}`;
            break;
        default:
            break;
    }
    const options = {
        headers: {
            'Access-Control-Allow-Origin': null,
            "x-requested-with": "xhr",
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: ''
        },
    };
    axios(options);
    return (dispatch) => {
        dispatch(requestAPI());
        return axios.get(query)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                console.log('response', response.data);
                if (param === undefined) {
                    dispatch(requestAPISuccessAll(response.data));
                } else {
                    dispatch(requestAPISuccess(response.data));
                }
            })
            .catch((error) => {
                console.log('error', error);
                dispatch(requestAPIError(error));
            })
    }
};