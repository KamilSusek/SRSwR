import { Reservation } from 'app/shared/model/reservation.model';
import { Container, Col, Row, Input, Label, Button } from 'reactstrap';
import React from 'react';
import { convertDateTimeFromServer, extractDate, extractTime } from '../../../shared/util/date-utils';

export interface IButtonAction {
  action: () => void;
  title: string;
}

interface IReservationListItem {
  data: Reservation;
}

const ReservationListItem = (props: IReservationListItem) => {
  const { restaurant, reservationCode, numberOfPlaces, tableNumber, reservationStart, reservationEnd } = props.data;

  const renderDetailsButton = () => (
    <Button className="w-100" size="sm" onClick={() => {}}>
      Szczegóły
    </Button>
  );

  const renderActionButton = () => (
    <Button className="w-100" size="sm" color="success" onClick={() => {}}>
      Rezerwuj
    </Button>
  );

  return (
    <Container className="m-1 d-flex flex-column">
      <Row>
        <h4>{restaurant.restaurantName}</h4>
      </Row>
      <Row>
        <p>Kod rezerwacji: #{reservationCode}</p>
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
      <Row>
        <Col xs="12" md="6">
          <Row>
            <Col xs="12" md="6">
              <h5>Początek rezerwacji</h5>
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col xs="12" md="6">
              <Label>
                Data
                <Input type="text" value={extractDate(reservationStart)} disabled />
              </Label>
            </Col>
            <Col xs="12" md="4">
              <Label>
                Godzina
                <Input type="text" value={extractTime(reservationStart)} disabled />
              </Label>
            </Col>
          </Row>
        </Col>
        <Col xs="12" md="6">
          <Row>
            <Col xs="12" md="6">
              <h5>Koniec rezerwacji</h5>
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col xs="12" md="6">
              <Label>
                Data
                <Input type="text" value={extractDate(reservationEnd)} disabled />
              </Label>
            </Col>
            <Col xs="12" md="4">
              <Label>
                Godzina
                <Input type="text" value={extractTime(reservationEnd)} disabled />
              </Label>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-center">
        <Col xs="12" md="6" className="mt-1">
          {renderDetailsButton()}
        </Col>
        <Col xs="12" md="6" className="mt-1">
          {renderActionButton()}
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationListItem;
