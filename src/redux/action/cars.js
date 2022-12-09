import * as api from "../../config/api";
import { END_LOADING, FETCH_BY_ID, START_LOADING } from "./actionType";

export const getCarsById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchCarsDetail(id);
    dispatch({ type: FETCH_BY_ID, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error(error);
  }
};
