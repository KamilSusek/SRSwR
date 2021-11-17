import React from 'react';
import { Restaurant } from '../../../shared/model/restaurant.model';
import { Container, Row, Col, Label, Input } from 'reactstrap';

interface IRestaurantListItem {
  data: Restaurant;
}

const RestaurantListItem = (props: IRestaurantListItem) => {
  const { data } = props;
  return (
    <Container className="m-1 d-flex flex-column">
      <h1>{data.restaurantName}</h1>
      <Row>
        <Col xs="12" md="6">
          <Label>
            Miasto
            <Input type="text" value={data.city} disabled />
          </Label>
        </Col>
        <Col xs="12" md="6">
          <Label>
            Ulica
            <Input type="text" value={data.street} disabled />
          </Label>
        </Col>
        <Col xs="12" md="6">
          <Label>
            Kod pocztowy
            <Input type="text" value={data.postalCode} disabled />
          </Label>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12">
          <Label className="w-100">
            Opis
            <Input type="textarea" value={data.description} disabled />
          </Label>
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantListItem;
