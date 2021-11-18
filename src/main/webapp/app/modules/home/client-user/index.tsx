import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import ClientReservation from './client-reservation';
import ReservationForm from '../reservations/reservation-form';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute exact path='/' component={ClientReservation} />
    <ErrorBoundaryRoute exact path='/reservations/create' component={ReservationForm} />
  </div>
);

export default Routes;