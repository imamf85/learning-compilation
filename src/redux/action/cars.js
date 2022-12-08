import * as api from "../../config/api";
import { FETCH_BY_ID } from "./actionType";

export const getCarsById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchCarsDetail(id);
    // console.log(data);
    dispatch({ type: FETCH_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};
