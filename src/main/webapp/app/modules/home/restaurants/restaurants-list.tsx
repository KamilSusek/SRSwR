import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import UIListComponent from 'app/shared/layout/list/list';
import { IRootState } from 'app/shared/reducers';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import React, { useEffect, useState } from 'react';
import { getSortState } from 'react-jhipster';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import ReservationFilters from '../client-user/filters/reservation-filters';
import RestaurantListItem from './restaurant-list-item';
import { getAllRestaurants } from './restaurant.reducer';
import { Button, Row } from 'reactstrap';
import { useHistory } from 'react-router';

interface IRestaurantsList extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const RestaurantsList = (props: IRestaurantsList) => {
  const history = useHistory();
  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  useEffect(() => {
    props.getAllRestaurants(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const actionButton = () => (
    <Button
      color="primary"
      onClick={() => {
        history.push('/restaurants/create');
      }}
    >
      Dodaj restauracje
    </Button>
  );

  return (
    <>
      <UIListComponent
        title="Moje restauracje"
        data={props.restaurants}
        ActionButton={actionButton()}
        FilterElement={ReservationFilters}
        ListItem={RestaurantListItem}
        handlePagination={handlePagination}
        totalItems={props.totalItems}
        pagination={pagination}
        loading={props.loading}
      />
    </>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  restaurants: storeState.restaurants.restaurants,
  totalItems: storeState.restaurants.totalItems,
  loading: storeState.restaurants.loading,
});

const mapDispatchToProps = { getAllRestaurants };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsList);
