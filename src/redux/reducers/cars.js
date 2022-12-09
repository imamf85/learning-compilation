// eslint-disable-next-line
import { END_LOADING, FETCH_BY_ID, START_LOADING } from "../action/actionType";
const INITIAL_STATE = {
  isLoading: true,
  cars: [],
}
// eslint-disable-next-line
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LOADING: {
      return {
        ...state,
        isLoading: true
      }
    }

    case END_LOADING: {
      return {
        ...state,
        isLoading: false
      }
    }

    case FETCH_BY_ID:
      return {
        ...state,
        cars: action.payload,
      };

    default:
      return state;
  }
};
