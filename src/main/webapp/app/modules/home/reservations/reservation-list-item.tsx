import { Reservation } from 'app/shared/model/reservation.model';
import { Container, Col, Row, Input, Label, Button } from 'reactstrap';
import React from 'react';

export interface IButtonAction {
  action: () => void;
  title: string;
}

interface IReservationListItem {
  data: Reservation;
}

const ReservationListItem = (props: IReservationListItem) => {
  const { restaurantName, reservationCode, numberOfPlaces, tableNumber, reservationStart, reservationEnd } = props.data;

  const renderDetailsButton = () => (
    <Button size="lg" color="primary" onClick={() => {}}>
      Szczegóły
    </Button>
  );

  const renderActionButton = () => (
    <Button size="lg" color="success" onClick={() => {}}>
      Rezerwuj
    </Button>
  );

  return (
    <Container className="m-1 container-md">
      <Row>
        <h1>{restaurantName}</h1>
      </Row>
      <Row>
        <h3>Kod rezerwacji: #{reservationCode}</h3>
      </Row>
      <Row className="mt-2">
        <Col xs="12" md="6">
          <Label>
            Liczba miejsc
            <Input type="number" value={numberOfPlaces} disabled />
          </Label>
        </Col>
        <Col xs="12" md="6">
          <Label>
            Numer stolika
            <Input type="number" value={tableNumber} disabled />
          </Label>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs="12" md="6">
          <Label>
            Początek rezerwacji
            <Input type="date" value={reservationStart} disabled />
          </Label>
        </Col>
        <Col xs="12" md="6">
          <Label>
            Koniec rezerwacji
            <Input type="date" value={reservationEnd} disabled />
          </Label>
        </Col>
      </Row>
      <Row className="justify-center">
        <Col xs="6" md="6" className="mt-1">
          {renderDetailsButton()}
        </Col>
        <Col xs="6" md="6" className="mt-1">
          {renderActionButton()}
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationListItem;
