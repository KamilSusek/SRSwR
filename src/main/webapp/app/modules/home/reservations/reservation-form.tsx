import { Restaurant } from 'app/shared/model/restaurant.model';
import React, { useEffect } from 'react';
import { Container, Row, Col, option, Button } from 'reactstrap';
import UIInpunt from 'app/shared/layout/input/input';
import { connect, useDispatch } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getAllRestaurantsNotPaged } from '../restaurants/restaurant.reducer';
import { RouteComponentProps, useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createReservation, reset } from '../client-user/client-reservation.reducer';
import { FIELD_REQUIRED } from 'app/shared/error/validation-errors';

interface IReservationFormModel {
  id?: number;
  reservationCode?: string;
  restaurant: Restaurant | null;
  reservationDate: string;
  reservationStartTime: string;
  reservationEndTime: string;
  numberOfPlaces: number | null;
  tableNumber?: number | null;
  notes: string;
}

const initialValues = (): IReservationFormModel => ({
  restaurant: null,
  reservationStartTime: '',
  reservationDate: '',
  reservationEndTime: '',
  numberOfPlaces: null,
  tableNumber: null,
  notes: '',
});

const validationSchema = () =>
  Yup.object({
    restaurant: Yup.object().required(FIELD_REQUIRED).nullable(),
    reservationStartTime: Yup.string().required(FIELD_REQUIRED),
    reservationDate: Yup.string().required(FIELD_REQUIRED),
    reservationEndTime: Yup.string().required(FIELD_REQUIRED),
    numberOfPlaces: Yup.number().required(FIELD_REQUIRED).nullable(),
    tableNumber: Yup.number().required(FIELD_REQUIRED).nullable()
  });

interface IReservationForm extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const ReservationForm = (props: IReservationForm) => {
  const mapValuesToResponse = (values: IReservationFormModel) => ({
    reservationStart: `${values.reservationDate}T${values.reservationStartTime}:00Z`,
    reservationEnd: `${values.reservationDate}T${values.reservationEndTime}:00Z`,
    ...values,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = values => {
    dispatch(props.createReservation(mapValuesToResponse(values)));
  };

  const formik = useFormik<IReservationFormModel>({
    validateOnChange: false,
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
    return () => {
      props.reset();
    };
  }, [props.updateSuccess]);

  const restaurants = () => [
    { id: 0, value: '', data: null },
    ...props.restaurants.map((item, index) => ({
      id: index + 1,
      value: item.restaurantName,
      data: item,
    })),
  ];

  const handleRestaurantSelect = (id: number) => {
    const restautrant = restaurants().filter(item => item.id === +id);

    if (restautrant.length > 0) {
      formik.setFieldValue('restaurant', restautrant[0].data);
    } else {
      formik.setFieldValue('restaurant', null);
    }
  };

  const { values, handleChange, errors } = formik;

  return (
    <Container style={{ width: '60vw' }} className="d-flex w-66 flex-column justify-center card" fluid>
      <Row className="d-flex justify-content-between align-items-center m-1">
        <h1>Dodaj rezerwacje</h1>
        <Button onClick={goBack} color="danger">
          <FontAwesomeIcon icon="times" />
        </Button>
      </Row>
      <Row>
        <Col xs="12" md="6">
          <UIInpunt
            type="date"
            name="reservationDate"
            value={values.reservationDate}
            label="Data rezerwacji"
            onChange={handleChange}
            error={errors.reservationDate}
          />
        </Col>
        <Col xs="12" md="3">
          <UIInpunt
            type="time"
            name="reservationStartTime"
            value={values.reservationStartTime}
            label="Początek"
            onChange={handleChange}
            error={errors.reservationStartTime}
          />
        </Col>
        <Col xs="12" md="3">
          <UIInpunt
            type="time"
            name="reservationEndTime"
            value={values.reservationEndTime}
            label="Koniec"
            onChange={handleChange}
            error={errors.reservationEndTime}
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="3">
          <UIInpunt
            type="number"
            name="numberOfPlaces"
            value={values.numberOfPlaces}
            label="Liczba miejsc"
            onChange={handleChange}
            error={errors.numberOfPlaces}
          />
        </Col>
        <Col xs="12" md="3">
          <UIInpunt
            type="number"
            name="tableNumber"
            value={values.tableNumber}
            label="Numer stolika"
            onChange={handleChange}
            error={errors.tableNumber}
          />
        </Col>
        <Col xs="12" md="6">
          <UIInpunt
            type="select"
            label="Restauracja"
            onChange={event => handleRestaurantSelect(event.target.value)}
            error={errors.restaurant}
          >
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
          <UIInpunt type="textarea" name="notes" value={values.notes} label="Notatki" onChange={handleChange} error={errors.notes} />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12">
          <Button className="w-100" color="success" type="submit" onClick={formik.handleSubmit}>
            Dodaj
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  restaurants: storeState.restaurants.restaurants,
  updateSuccess: storeState.clientReservations.updateSuccess,
});

const mapDispatchToProps = { getAllRestaurantsNotPaged, createReservation, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm);
