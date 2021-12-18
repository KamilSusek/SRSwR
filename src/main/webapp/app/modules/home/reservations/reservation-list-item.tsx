import { Reservation } from 'app/shared/model/reservation.model';
import { Container, Col, Row, Input, Label, Button } from 'reactstrap';
import React from 'react';
import { extractDate, extractTime } from '../../../shared/util/date-utils';
import { useDispatch } from 'react-redux';

export interface IButtonAction {
  action: () => void;
  title: string;
}

export interface ReservationActions {
  details?: (id: number) => void;
  delete?: (id: number) => void;
  edit?: (id: number) => void;
  assign?: (code: string) => void;
  cancel?: (code: string) => void;
}

interface IReservationListItem {
  data: Reservation;
  listItemActions: ReservationActions;
}

const ReservationListItem = (props: IReservationListItem) => {
  const { restaurant, id, reservationCode, numberOfPlaces, tableNumber, reservationStart, reservationEnd } = props.data;
  const dispatch = useDispatch();

  const renderDetailsButton = () =>
    props.listItemActions && props.listItemActions.details ? (
      <Button
        className="w-100"
        size="sm"
        onClick={() => {
          props.listItemActions.details(id);
        }}
      >
        Szczegóły
      </Button>
    ) : (
      <></>
    );

  const renderActionButton = () =>
    props.listItemActions && props.listItemActions.assign ? (
      <Button
        className="w-100"
        size="sm"
        color="success"
        onClick={() => {
          dispatch(props.listItemActions.assign(reservationCode));
        }}
      >
        Rezerwuj
      </Button>
    ) : (
      <></>
    );

  const renderEditButton = () =>
    props.listItemActions && props.listItemActions.edit ? (
      <Button
        className="w-100"
        size="sm"
        color="primary"
        onClick={() => {
          dispatch(props.listItemActions.edit(id));
        }}
      >
        Edytuj
      </Button>
    ) : (
      <></>
    );

  const renderCancelButton = () =>
    props.listItemActions && props.listItemActions.cancel ? (
      <Button
        className="w-100"
        size="sm"
        color="danger"
        outline
        onClick={() => {
          dispatch(props.listItemActions.cancel(reservationCode));
        }}
      >
        Anuluj
      </Button>
    ) : (
      <></>
    );

  const renderDeleteButton = () =>
    props.listItemActions && props.listItemActions.delete ? (
      <Button
        className="w-100"
        size="sm"
        color="danger"
        outline
        onClick={() => {
          dispatch(props.listItemActions.delete(id));
        }}
      >
        Usuń
      </Button>
    ) : (
      <></>
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
        <Col xs="12" md="6">
          {renderDetailsButton()}
          {renderEditButton()}
        </Col>
        <Col xs="12" md="6">
          {renderActionButton()}
          {renderDeleteButton()}
        </Col>
        {renderCancelButton()}
      </Row>
    </Container>
  );
};

export default ReservationListItem;
