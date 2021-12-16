import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { Reservation } from '../../../shared/model/reservation.model';
import { ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { deleteUser } from '../../administration/user-management/user-management.reducer';

export const ACTION_TYPES = {
  FETCH_RESERVATIONS: 'client-reservations/FETCH_RESERVATIONS',
  FETCH_SINGLE_RESERVATION: 'client-reservations/FETCH_SINGLE_RESERVATION',
  FETCH_MY_RESERVATIONS: 'client-reservations/FETCH_MY_RESERVATIONS',
  CANCEL_RESERVATION: 'client-reservations/CANCEL_RESERVATION',
  CREATE_RESERVATION: 'client-reservations/CREATE_RESERVATION',
  ASSIGN_RESTAURANT: 'client-reservations/ASSIGN_RESTAURANT',
  DELETE_RESTAURANT: 'client-reservations/DELETE_RESTAURANT',
  RESET: 'client-reservations/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  updateSuccess: false,
  updating: false,
  cancelSuccess: false,
  canceling: false,
  deleteSuccess: false,
  deleting: false,
  reservations: [],
  myReservations: [],
  reservation: null,
  totalItems: 0,
  totalItemsMyReservation: 0,
};

export type ClientReservationsState = Readonly<typeof initialState>;

// Reducer

export default (state: ClientReservationsState = initialState, action): ClientReservationsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SINGLE_RESERVATION):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.FETCH_RESERVATIONS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        cancelSuccess: false,
        deleteSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.FETCH_MY_RESERVATIONS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        cancelSuccess: false,
        deleteSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CANCEL_RESERVATION):
      return {
        ...state,
        errorMessage: null,
        cancelSuccess: false,
        canceling: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_RESERVATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case REQUEST(ACTION_TYPES.ASSIGN_RESTAURANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case REQUEST(ACTION_TYPES.DELETE_RESTAURANT):
      return {
        ...state,
        errorMessage: null,
        deleteSuccess: false,
        deleting: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SINGLE_RESERVATION):
    case FAILURE(ACTION_TYPES.FETCH_RESERVATIONS):
    case FAILURE(ACTION_TYPES.FETCH_MY_RESERVATIONS):
    case FAILURE(ACTION_TYPES.CREATE_RESERVATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        cancelSuccess: false,
        errorMessage: action.payload,
      };
    case FAILURE(ACTION_TYPES.CANCEL_RESERVATION):
      return {
        ...state,
        loading: false,
        canceling: false,
        cancelSuccess: false,
        errorMessage: action.payload,
      };
    case FAILURE(ACTION_TYPES.ASSIGN_RESTAURANT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case FAILURE(ACTION_TYPES.DELETE_RESTAURANT):
      return {
        ...state,
        loading: false,
        deleting: false,
        deleteSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SINGLE_RESERVATION):
      return {
        ...state,
        loading: false,
        reservation: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESERVATIONS):
      return {
        ...state,
        loading: false,
        reservations: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_MY_RESERVATIONS):
      return {
        ...state,
        loading: false,
        myReservations: action.payload.data,
        totalItemsMyReservation: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        reservation: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CANCEL_RESERVATION):
      return {
        ...state,
        canceling: false,
        cancelSuccess: true,
      };
    case SUCCESS(ACTION_TYPES.ASSIGN_RESTAURANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESTAURANT):
      return {
        ...state,
        deleting: false,
        deleteSuccess: true,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Actions

const apiUrl = 'api/reservations';

export const getReservation = (id: number) => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SINGLE_RESERVATION,
    payload: axios.get(requestUrl),
  };
};

export const getAllReservations = (page, size, sort) => {
  const requestUrl = `api/not-assigned/reservations${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RESERVATIONS,
    payload: axios.get(requestUrl),
  };
};

export const getAllOwnerReservations = (page, size, sort) => {
  const requestUrl = `api/owner/reservations${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RESERVATIONS,
    payload: axios.get(requestUrl),
  };
};

export const getAllMyReservations = (page, size, sort) => {
  const requestUrl = `api/my-reservations${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MY_RESERVATIONS,
    payload: axios.get(requestUrl),
  };
};

export const cancelReservation: ICrudPutAction<string> = code => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CANCEL_RESERVATION,
    payload: axios.post(`${apiUrl}/cancel/${code}`),
  });
  return result;
};

export const createReservation: ICrudPutAction<Reservation> = reservation => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESERVATION,
    payload: axios.post(apiUrl, reservation),
  });
  return result;
};

export const updateReservation: ICrudPutAction<Reservation> = reservation => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESERVATION,
    payload: axios.put(apiUrl, reservation),
  });
  return result;
};

export const assignReservation: ICrudPutAction<string> = code => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.ASSIGN_RESTAURANT,
    payload: axios.post(`${apiUrl}/assign/${code}`),
  });
  return result;
};

export const deleteReservation: ICrudDeleteAction<void> = id => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESTAURANT,
    payload: axios.delete(`${apiUrl}/${id}`),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
