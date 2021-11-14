import { Reservation } from 'app/shared/model/reservation.model';
import { Container, Col, Row, Input, Label, Button } from 'reactstrap';
import React from 'react';

export interface IButtonAction {
  action: () => void;
  title: string;
}

interface IReservationListItem {
  reservation: Reservation;
  actions?: IButtonAction;
}

const ReservationListItem = (props: IReservationListItem) => {
  const { restaurantName, reservationCode, numberOfPlaces, tableNumber, reservationStart, reservationEnd } = props.reservation;
  return (
    <Container className="card m-2">
      <Row>
        <h1>{restaurantName}</h1>
      </Row>
      <Row>
        <h3>Kod rezerwacji: #{reservationCode}</h3>
      </Row>
      <Row className="mt-2">
        <Col xs="6" md="6">
          <Label>
            Liczba miejsc
            <Input type="number" value={numberOfPlaces} disabled />
          </Label>
        </Col>
        <Col xs="6" md="6">
          <Label>
            Numer stolika
            <Input type="number" value={tableNumber} disabled />
          </Label>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs="6" md="6">
          <Label>
            Początek rezerwacji
            <Input type="date" value={reservationStart} disabled />
          </Label>
        </Col>
        <Col xs="6" md="6">
          <Label>
            Koniec rezerwacji
            <Input type="date" value={reservationEnd} disabled />
          </Label>
        </Col>
      </Row>
      <Row>
        <Button color="success" type="submit">
          Rezerwuj
        </Button>
      </Row>
    </Container>
  );
};

export default ReservationListItem;
