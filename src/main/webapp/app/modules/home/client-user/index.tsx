import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import ClientReservation from './client-reservation';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path='/' component={ClientReservation} />
  </div>
);

export default Routes;