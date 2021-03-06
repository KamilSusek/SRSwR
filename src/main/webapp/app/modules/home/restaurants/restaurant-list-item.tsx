import React from 'react';
import { Restaurant } from '../../../shared/model/restaurant.model';
import { Container, Row, Col, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRestaurant } from './restaurant.reducer';

interface IRestaurantListItem {
  data: Restaurant;
}

const RestaurantListItem = (props: IRestaurantListItem) => {
  const { data } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const goToEditForm = () => {
    history.push(`restaurants/edit/${data.id}`);
  };

  const handleDeleteById = () => {
    dispatch(deleteRestaurant(data.id));
  };

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
      <Row>
        <Col xs="12" md="12" className="m-1">
          <Button className="w-100" color="primary" onClick={goToEditForm}>
            Edytuj
          </Button>
        </Col>
        <Col xs="12" md="12" className="m-1">
          <Button className="w-100" color="danger" onClick={handleDeleteById}>
            Usun
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantListItem;
