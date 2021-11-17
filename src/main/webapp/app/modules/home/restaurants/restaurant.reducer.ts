import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  FETCH_RESTAURANTS: 'restaurants/FETCH_RESTAURANTS',
};

const initialState = {
  loading: false,
  errorMessage: null,
  restaurants: [],
  totalItems: 0,
};

export type RestaurantsState = Readonly<typeof initialState>;

// Reducer

export default (state: RestaurantsState = initialState, action): RestaurantsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESTAURANTS):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RESTAURANTS):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESTAURANTS):
      return {
        ...state,
        loading: false,
        restaurants: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    default:
      return state;
  }
};

// Actions

export const getAllRestaurants = (page, size, sort) => {
  const requestUrl = `api/restaurants${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RESTAURANTS,
    payload: axios.get(requestUrl),
  };
};
