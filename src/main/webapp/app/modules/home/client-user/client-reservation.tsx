import React, { useState } from 'react';
import { Reservation } from 'app/shared/model/reservation.model';
import ReservationListItem from '../reservations/reservation-list-item';
import ReservationFilters from './filters/reservation-filters';
import { IRootState } from 'app/shared/reducers';
import { getAllReservations } from './client-reservation.reducer';
import UIListComponent from '../../../shared/layout/list/list';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getSortState } from 'react-jhipster';

interface IClientReservation extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const ClientReservation = (props: IClientReservation) => {
  const ITEMS_PER_PAGE = 3;

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

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

  return (
    <UIListComponent<Reservation>
      fetch={props.getAllReservations}
      data={props.reservations}
      FilterElement={ReservationFilters}
      ListItem={ReservationListItem}
      handlePagination={handlePagination}
      totalItems={props.totalItems}
      pagination={pagination}
    />
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  reservations: storeState.clientReservations.reservations,
  totalItems: storeState.clientReservations.totalItems,
});

const mapDispatchToProps = { getAllReservations };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClientReservation);
