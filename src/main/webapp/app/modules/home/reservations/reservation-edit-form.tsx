import { Restaurant } from 'app/shared/model/restaurant.model';
import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import UIInpunt from 'app/shared/layout/input/input';
import { connect, useDispatch } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getAllRestaurantsNotPaged } from '../restaurants/restaurant.reducer';
import { RouteComponentProps, useHistory, useParams } from 'react-router';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { reset, getReservation, updateReservation } from '../client-user/client-reservation.reducer';
import { IReservationFormModel, validationSchema } from './reservation-form';
import { Reservation } from '../../../shared/model/reservation.model';
import { extractDate, extractTime } from '../../../shared/util/date-utils';

interface IReservationEditForm extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const ReservationEditForm = (props: IReservationEditForm) => {
  const mapValuesToResponse = (values: IReservationFormModel) => ({
    reservationStart: `${values.reservationDate}T${values.reservationStartTime}:00Z`,
    reservationEnd: `${values.reservationDate}T${values.reservationEndTime}:00Z`,
    ...values,
  });

  const mapReservationToFormValues = (reservation: Reservation): IReservationFormModel => {
    const { reservationStart, restaurant, notes, reservationEnd, numberOfPlaces, tableNumber } = reservation;
    return {
      reservationDate: extractDate(reservationStart),
      reservationStartTime: extractTime(reservationStart),
      reservationEndTime: extractTime(reservationEnd),
      notes,
      numberOfPlaces,
      tableNumber,
      restaurant,
    };
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const onSubmit = values => {
    dispatch(props.updateReservation({ id: props.reservation.id, ...mapValuesToResponse(values) }));
  };

  const formik = useFormik<IReservationFormModel>({
    validateOnChange: false,
    initialValues: null,
    validationSchema: validationSchema(),
    onSubmit,
  });

  useEffect(() => {
    props.getReservation(+id);
  }, []);

  useEffect(() => {
    props.getAllRestaurantsNotPaged();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      goBack();
    }
    return () => {
      props.reset();
    };
  }, [props.updateSuccess]);

  useEffect(() => {
    if (props.reservation) {
      formik.setValues(mapReservationToFormValues(props.reservation));
    }
  }, [props.reservation, props.fetching]);

  const goBack = () => {
    history.push('/');
  };

  const restaurants = () => [
    { id: 0, value: '', data: null },
    ...props.restaurants.map((item, index) => ({
      id: index + 1,
      value: item.restaurantName,
      data: item,
    })),
  ];

  const handleRestaurantSelect = (restaurantId: number) => {
    const restautrant = restaurants().filter(item => item.id === +restaurantId);

    if (restautrant.length > 0) {
      formik.setFieldValue('restaurant', restautrant[0].data);
    } else {
      formik.setFieldValue('restaurant', null);
    }
  };

  const { values, handleChange, errors } = formik;

  const getRestarurantId = () => {
    const restaurant = restaurants().filter(item => values.restaurant && values.restaurant.restaurantName === item.value);
    if (restaurant.length > 0) {
      return restaurant[0].id;
    }
    return 0;
  };

  return values ? (
    <Container style={{ width: '60vw' }} className="d-flex w-66 flex-column justify-center card" fluid>
      <Row className="d-flex justify-content-between align-items-center m-1">
        <h1>Edytuj rezerwacje</h1>
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
            value={getRestarurantId()}
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
          <Button className="w-100" color="primary" type="submit" onClick={formik.handleSubmit}>
            Edytuj
          </Button>
        </Col>
      </Row>
    </Container>
  ) : (
    <></>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  restaurants: storeState.restaurants.restaurants,
  reservation: storeState.clientReservations.reservation,
  updateSuccess: storeState.clientReservations.updateSuccess,
  fetching: storeState.clientReservations.loading,
});

const mapDispatchToProps = { getReservation, reset, getAllRestaurantsNotPaged, updateReservation };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReservationEditForm);
