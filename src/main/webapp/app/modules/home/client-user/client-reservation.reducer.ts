import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { Reservation } from '../../../shared/model/reservation.model';
import { ICrudPutAction } from 'react-jhipster';

export const ACTION_TYPES = {
  FETCH_RESERVATIONS: 'client-reservations/FETCH_RESERVATIONS',
  CREATE_RESERVATION: 'client-reservations/CREATE_RESERVATION',
};

const initialState = {
  loading: false,
  errorMessage: null,
  updateSuccess: false,
  updating: false,
  reservations: [],
  reservation: null,
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
    case REQUEST(ACTION_TYPES.CREATE_RESERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RESERVATIONS):
    case FAILURE(ACTION_TYPES.CREATE_RESERVATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESERVATIONS):
      return {
        ...state,
        loading: false,
        reservations: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        reservation: action.payload.data,
      };
    default:
      return state;
  }
};

// Actions

const apiUrl = 'api/reservations';

export const getAllReservations = (page, size, sort) => {
  const requestUrl = `api/not-assigned/reservations${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RESERVATIONS,
    payload: axios.get(requestUrl),
  };
};

export const createReservation: ICrudPutAction<Reservation> = reservation => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.FETCH_RESERVATIONS,
    payload: axios.post(apiUrl, reservation),
  });
  return result;
};
