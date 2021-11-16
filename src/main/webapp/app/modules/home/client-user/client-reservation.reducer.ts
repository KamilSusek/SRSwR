import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  FETCH_RESERVATIONS: 'client-reservations/FETCH_RESERVATIONS',
};

const initialState = {
  loading: false,
  errorMessage: null,
  reservations: [],
  totalItems: 0,
};

export type ClientReservationsState = Readonly<typeof initialState>;

// Reducer

export default (state: ClientReservationsState = initialState, action): ClientReservationsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESERVATIONS):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RESERVATIONS):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESERVATIONS):
      return {
        ...state,
        loading: false,
        reservations: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    default:
      return state;
  }
};

// Actions

export const getAllReservations = (page, size, sort) => {
  const requestUrl = `api/not-assigned/reservations${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RESERVATIONS,
    payload: axios.get(requestUrl),
  };
};
