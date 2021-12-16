import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import ClientReservation from './client-reservation';
import ClientMyReservations from './client-my-reservation';
import ReservationForm from '../reservations/reservation-form';
import ReservationDetails from '../reservations/reservation-details';
import PrivateRoute from '../../../shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import ReservationEditForm from '../reservations/reservation-edit-form';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute exact path='/' component={ClientReservation} />
    <ErrorBoundaryRoute exact path='/my-reservations' component={ClientMyReservations} />
    <PrivateRoute exact path='/reservation/:id' component={ReservationDetails} />
    <PrivateRoute exact path='/reservation/edit/:id' component={ReservationEditForm} />
    <PrivateRoute exact path='/reservations/create' component={ReservationForm} hasAnyAuthorities={[AUTHORITIES.OWNER]}/>
  </div>
);

export default Routes;