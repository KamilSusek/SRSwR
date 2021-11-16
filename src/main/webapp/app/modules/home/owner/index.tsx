import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Owner from './owner';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path='/' component={Owner} />
  </div>
);

export default Routes;