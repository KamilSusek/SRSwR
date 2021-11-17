import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import RestaurantsForm from './restaurants-form';
import RestaurantsList from './restaurants-list';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute exact path='/restaurants' component={RestaurantsList} />
    <ErrorBoundaryRoute exact path='/restaurants/create' component={RestaurantsForm} />
  </div>
);

export default Routes;