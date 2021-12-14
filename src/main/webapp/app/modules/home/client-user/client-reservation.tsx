import React, { useEffect, useState } from 'react';
import { Reservation } from 'app/shared/model/reservation.model';
import ReservationListItem, { ReservationActions } from '../reservations/reservation-list-item';
import ReservationFilters from './filters/reservation-filters';
import { IRootState } from 'app/shared/reducers';
import { getAllReservations, assignReservation } from './client-reservation.reducer';
import UIListComponent from '../../../shared/layout/list/list';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getSortState } from 'react-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { toast } from 'react-toastify';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { useHistory } from 'react-router';

interface IClientReservation extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const ClientReservation = (props: IClientReservation) => {
  const { updating, updateSuccess } = props;
  const history = useHistory();
  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const fetchReservations = () => {
    props.getAllReservations(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success('Pomyslnie dokonano rezerwacji.');
      fetchReservations();
    }
  }, [updating, updateSuccess]);

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

  const fetchSingleReservation = (id: number) => {
    history.push(`/reservation/${id}`);
  };

  const actions = props.isOwner ? {} : props.isUser ? { assign: assignReservation, details: fetchSingleReservation } : {};

  return (
    <UIListComponent<Reservation, ReservationActions>
      title="Wszystkie rezerwacje"
      data={props.reservations}
      FilterElement={ReservationFilters}
      ListItem={ReservationListItem}
      handlePagination={handlePagination}
      listItemActions={actions}
      totalItems={props.totalItems}
      pagination={pagination}
      loading={props.fetching}
    />
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  reservations: storeState.clientReservations.reservations,
  totalItems: storeState.clientReservations.totalItems,
  fetching: storeState.clientReservations.loading,
  updateSuccess: storeState.clientReservations.updateSuccess,
  updating: storeState.clientReservations.updating,
  isUser: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.USER]),
  isOwner: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.OWNER]),
});

const mapDispatchToProps = { getAllReservations, assignReservation };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClientReservation);
