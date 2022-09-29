import { GET_PRODUCT_LISTING } from '../Actions/dashboardAction';

const initialState = {
    product: ""
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_LISTING:
            return {
                product: action.payload
            };

        default:
            return state;
    }
}

export default dashboardReducer;