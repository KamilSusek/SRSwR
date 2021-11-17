import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { Restaurant } from '../../../shared/model/restaurant.model';
import { ICrudPutAction } from 'react-jhipster';

export const ACTION_TYPES = {
  FETCH_RESTAURANTS: 'restaurants/FETCH_RESTAURANTS',
  CREATE_RESTAURANT: 'restaurants/CREATE_RESTAURANT',
};

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
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
    case REQUEST(ACTION_TYPES.CREATE_RESTAURANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RESTAURANTS):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case FAILURE(ACTION_TYPES.CREATE_RESTAURANT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESTAURANTS):
      return {
        ...state,
        loading: false,
        restaurants: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESTAURANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
      };
    default:
      return state;
  }
};

// Actions
const apiUrl = 'api/restaurants';

export const getAllRestaurants = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RESTAURANTS,
    payload: axios.get(requestUrl),
  };
};

export const createRestaurant: ICrudPutAction<Restaurant> = restaurant => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESTAURANT,
    payload: axios.post(apiUrl, restaurant),
  });
  return result;
};
