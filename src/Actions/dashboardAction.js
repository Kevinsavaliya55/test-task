import axios from "axios";

export const GET_PRODUCT_LISTING = 'GET_PRODUCT_LISTING';

export const updateProductData = (data) => {
  return async (dispatch) => {
    return dispatch({
      type: GET_PRODUCT_LISTING,
      payload: data,
    });
  }
}

export function getProductData() {
    return async (dispatch) => {
      try {
        const response = await axios.get(
          `https://front-end-test-app.s3.amazonaws.com/menu.json`
        );
        return dispatch({
          type: GET_PRODUCT_LISTING,
          payload: response,
        });
      } catch (err) {
        console.log(err);
      }
    };
  }
  