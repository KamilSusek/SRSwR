import { Restaurant } from 'app/shared/model/restaurant.model';
import React, { useEffect } from 'react';
import { Container, Row, Col, option, Button } from 'reactstrap';
import UIInpunt from 'app/shared/layout/input/input';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getAllRestaurantsNotPaged } from '../restaurants/restaurant.reducer';
import { RouteComponentProps, useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IReservationFormModel {
  id?: number;
  reservationCode?: string;
  restaurant: Restaurant | null;
  reservationStartDate: string;
  reservationStartTime: string;
  reservationEndDate: string;
  reservationEndTime: string;
  numberOfPlaces: number | null;
  tableNumber?: number | null;
  notes: string;
}

const initialValues = (): IReservationFormModel => ({
  restaurant: null,
  reservationStartTime: '',
  reservationStartDate: '',
  reservationEndDate: '',
  reservationEndTime: '',
  numberOfPlaces: null,
  tableNumber: null,
  notes: '',
});

const validationSchema = () =>
  Yup.object({
    restaurant: Yup.object().required(),
    reservationStartTime: Yup.string().required(),
    reservationStartDate: Yup.string().required(),
    reservationEndDate: Yup.string().required(),
    reservationEndTime: Yup.string().required(),
    numberOfPlaces: Yup.number().required(),
    tableNumber: Yup.number().required(),
    notes: Yup.string().required(),
  });

interface IReservationForm extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const ReservationForm = (props: IReservationForm) => {
  const onSubmit = values => {};
  const history = useHistory();
  const formik = useFormik<IReservationFormModel>({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit,
  });

  useEffect(() => {
    props.getAllRestaurantsNotPaged();
  }, []);

  const goBack = () => {
    history.push('/');
  };
  useEffect(() => {
    if (props.updateSuccess) {
      goBack();
    }
  }, [props.updateSuccess]);

  const restaurants = () => [
    { id: 0, value: '' },
    ...props.restaurants.map((item, index) => ({
      id: index + 1,
      value: item.restaurantName,
    })),
  ];

  return (
    <Container style={{ width: '60vw' }} className="d-flex w-66 flex-column justify-center card" fluid>
      <Row className="d-flex justify-content-between align-items-center m-1">
        <h1>Dodaj rezerwacje</h1>
        <Button onClick={goBack} color="danger">
          <FontAwesomeIcon icon="times" />
        </Button>
      </Row>
      <Row>
        <Col xs="12" md="4">
          <UIInpunt type="date" label="Początek rezerwacji" />
        </Col>
        <Col xs="12" md="2">
          <UIInpunt type="time" label="Godzina" />
        </Col>
        <Col xs="12" md="4">
          <UIInpunt type="date" label="Koniec rezerwacji" />
        </Col>
        <Col xs="12" md="2">
          <UIInpunt type="time" label="Godzina" />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="3">
          <UIInpunt type="number" label="Liczba miejsc" />
        </Col>
        <Col xs="12" md="3">
          <UIInpunt type="number" label="Numer stolika" />
        </Col>
        <Col xs="12" md="6">
          <UIInpunt type="select" label="Restauracja">
            {restaurants().map((item, index) => (
              <option key={index} value={item.id}>
                {item.value}
              </option>
            ))}
          </UIInpunt>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12">
          <UIInpunt type="textarea" label="Notatki" />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12">
          <Button className="w-100" color="success" onClick={formik.handleSubmit}>
            Dodaj
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  restaurants: storeState.restaurants.restaurants,
  updateSuccess: storeState.restaurants.updateSuccess
});

const mapDispatchToProps = { getAllRestaurantsNotPaged };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm);
