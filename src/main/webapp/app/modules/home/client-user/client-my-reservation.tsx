import React, { useEffect, useState } from 'react';
import { Reservation } from 'app/shared/model/reservation.model';
import ReservationListItem, { ReservationActions } from '../reservations/reservation-list-item';
import ReservationFilters from './filters/reservation-filters';
import { IRootState } from 'app/shared/reducers';
import { getAllMyReservations, cancelReservation } from './client-reservation.reducer';
import UIListComponent from '../../../shared/layout/list/list';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getSortState } from 'react-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { toast } from 'react-toastify';

interface IClientReservation extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const ClientMyReservations = (props: IClientReservation) => {
  const { canceling, cancelSuccess } = props;
  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const fetchReservations = () => {
    props.getAllMyReservations(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    fetchReservations();
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

  useEffect(() => {
    if (cancelSuccess) {
      toast.success('Pomyslnie anulowano rezerwacje.');
      fetchReservations();
    }
  }, [canceling, cancelSuccess]);

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
    <UIListComponent<Reservation, ReservationActions>
      title="Moje rezerwacje"
      data={props.reservations}
      FilterElement={ReservationFilters}
      ListItem={ReservationListItem}
      listItemActions={{ cancel: cancelReservation }}
      handlePagination={handlePagination}
      totalItems={props.totalItems}
      pagination={pagination}
      loading={props.fetching}
    />
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  reservations: storeState.clientReservations.myReservations,
  totalItems: storeState.clientReservations.totalItemsMyReservation,
  fetching: storeState.clientReservations.loading,
  cancelSuccess: storeState.clientReservations.cancelSuccess,
  canceling: storeState.clientReservations.canceling,
});

const mapDispatchToProps = { getAllMyReservations, cancelReservation };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClientMyReservations);
