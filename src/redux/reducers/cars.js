// eslint-disable-next-line
import { FETCH_BY_ID } from "../action/actionType";
// eslint-disable-next-line
export default (state = { isLoading: true, cars: [] }, action) => {
  switch (action.type) {
    case FETCH_BY_ID:
      return {
        ...state,
        cars: action.payload,
      };

    default:
      return state;
  }
};
