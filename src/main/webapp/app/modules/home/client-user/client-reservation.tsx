import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Alert } from 'reactstrap';
import { defaultValues, Reservation } from 'app/shared/model/reservation.model';
import ReservationListItem from '../reservations/reservation-list-item';
import ReservationFilters from './filters/reservation-filters';
import { IRootState } from 'app/shared/reducers';
import { getAllReservations } from './client-reservation.reducer';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

interface IClientReservation extends StateProps, DispatchProps {}

const ClientReservation = (props: IClientReservation) => {
  return (
    <UIListComponent<Reservation>
      fetch={props.getAllReservations}
      data={props.reservations}
      FilterElement={ReservationFilters}
      ListItem={ReservationListItem}
    />
  );
};

interface IListComponent<Data> {
  fetch?: () => void;
  data: Data[];
  ListItem: ({ data: Data }) => JSX.Element;
  FilterElement?: (props: any) => JSX.Element;
}

const UIListComponent = <Data extends unknown>(props: IListComponent<Data>) => {
  const { data, ListItem, FilterElement } = props;

  useEffect(() => {
    props.fetch();
  }, []);

  return (
    <Container fluid className="d-flex flex-column justify-content-center w-100">
      {FilterElement && <FilterElement />}
      <ListGroup className="mt-2">
        {data.length > 0 ? (
          data.map((item, index) => (
            <ListGroupItem key={index}>
              <ListItem data={item} />
            </ListGroupItem>
          ))
        ) : (
          <Alert color="danger">Brak danych.</Alert>
        )}
      </ListGroup>
    </Container>
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
