import React from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import { getReservation } from '../client-user/client-reservation.reducer';
import { IRootState } from 'app/shared/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UIInpunt from 'app/shared/layout/input/input';
import { useHistory, useParams } from 'react-router';
import { extractDate, extractTime } from 'app/shared/util/date-utils';
import { connect } from 'react-redux';

interface IReservationDetails extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const ReservationDetails = (props: IReservationDetails) => {
  const history = useHistory();
  const { id } = useParams();
  const values = props.reservation;
  React.useEffect(() => {
    props.getReservation(+id);
  }, []);

  return props.fetching ? (
    <Container style={{ width: '60vw' }} className="d-flex w-66 flex-column justify-center align-items-center card" fluid>
      <Spinner />
    </Container>
  ) : props.reservation ? (
    <Container style={{ width: '60vw' }} className="d-flex w-66 flex-column justify-center card" fluid>
      <Row className="d-flex justify-content-between align-items-center m-1">
        <h1>Szeczgóły rezerwacji</h1>
        <Button onClick={() => history.goBack()} color="primary">
          <FontAwesomeIcon icon="times" />
        </Button>
      </Row>
      <Row>
        <Col xs="12" md="6">
          <UIInpunt type="date" value={extractDate(values.reservationStart)} label="Data rezerwacji" disabled />
        </Col>
        <Col xs="12" md="3">
          <UIInpunt type="time" value={extractTime(values.reservationStart)} label="Początek" disabled />
        </Col>
        <Col xs="12" md="3">
          <UIInpunt type="time" value={extractTime(values.reservationEnd)} label="Koniec" disabled />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="3">
          <UIInpunt type="number" value={values.numberOfPlaces} label="Liczba miejsc" disabled />
        </Col>
        <Col xs="12" md="3">
          <UIInpunt type="number" value={values.tableNumber} label="Numer stolika" disabled />
        </Col>
        <Col xs="12" md="6">
          <UIInpunt type="text" value={values.restaurant.restaurantName} label="Restauracja" disabled />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12">
          <UIInpunt type="textarea" value={values.notes} label="Notatki" disabled />
        </Col>
      </Row>
    </Container>
  ) : (
    <div>Nie znaleziono</div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  reservation: storeState.clientReservations.reservation,
  fetching: storeState.clientReservations.loading,
});

const mapDispatchToProps = { getReservation };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReservationDetails);
