import axios from "axios";

export const GET_FORM = "GET_FORM";

export const getForm =  () => {
  return async function (dispatch) {
    // const result = await axios.get("http://localhost:3001/forms");
    const result = await axios.get("https://server-greydive-production.up.railway.app/forms");

    return dispatch({
      type: GET_FORM,
      payload: result.data,
    });
  };
}