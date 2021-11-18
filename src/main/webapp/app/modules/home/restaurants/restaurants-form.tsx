import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Container, Row, Col, Button } from 'reactstrap';
import * as Yup from 'yup';
import UIInpunt from 'app/shared/layout/input/input';
import { createRestaurant } from './restaurant.reducer';
import { IRootState } from 'app/shared/reducers';
import { connect, useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IRestaurantFormModel {
  restaurantName: string;
  city: string;
  street: string;
  postalCode: string;
  description: string;
}

const defaultValues = (): IRestaurantFormModel => ({
  restaurantName: '',
  city: '',
  street: '',
  postalCode: '',
  description: '',
});

const validationSchema = () =>
  Yup.object({
    restaurantName: Yup.string().required(),
    city: Yup.string().required(),
    street: Yup.string().required(),
    postalCode: Yup.string().required(),
    description: Yup.string().required(),
  });

interface IRestaurantForm extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const RestaurantsForm = (props: IRestaurantForm) => {
  const { updateSuccess } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const goBack = () => {
    history.push('/restaurants');
  };

  const onSubmit = values => {
    dispatch(createRestaurant(values));
  };

  const formik = useFormik<IRestaurantFormModel>({
    initialValues: defaultValues(),
    validationSchema: validationSchema(),
    onSubmit,
  });

  useEffect(() => {
    if (updateSuccess) {
      goBack();
    }
  }, [updateSuccess]);

  const { values, handleChange, errors, handleSubmit } = formik;

  return (
    <Container style={{ width: '66vw' }} className="d-flex w-66 flex-column justify-center card" fluid>
      <Row className="d-flex justify-content-between align-items-center m-1">
        <h1>Dodaj restauracje</h1>
        <Button onClick={goBack} color="danger">
          <FontAwesomeIcon icon="times" />
        </Button>
      </Row>
      <Row>
        <Col xs="12" md="6">
          <UIInpunt
            label="Nazwa restauracji"
            type="text"
            name="restaurantName"
            value={values.restaurantName}
            onChange={handleChange}
            error={errors.restaurantName}
          />
        </Col>
        <Col xs="12" md="6">
          <UIInpunt label="Miasto" type="text" name="city" value={values.city} onChange={handleChange} error={errors.city} />
        </Col>
        <Col xs="12" md="6">
          <UIInpunt label="Ulica" type="text" name="street" value={values.street} onChange={handleChange} error={errors.street} />
        </Col>
        <Col xs="12" md="6">
          <UIInpunt
            label="Kod pocztowy"
            type="text"
            name="postalCode"
            value={values.postalCode}
            onChange={handleChange}
            error={errors.postalCode}
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12">
          <UIInpunt
            label="Opis"
            type="textarea"
            name="description"
            value={values.description}
            onChange={handleChange}
            error={errors.description}
          />
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
  updating: storeState.restaurants.updating,
  updateSuccess: storeState.restaurants.updateSuccess,
});

const mapDispatchToProps = { createRestaurant };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsForm);
