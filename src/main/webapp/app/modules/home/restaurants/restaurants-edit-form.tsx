import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UIInpunt from 'app/shared/layout/input/input';
import { useHistory, RouteComponentProps, useParams } from 'react-router-dom';
import { validationSchema } from './restaurants-form';
import { IRestaurantFormModel } from './restaurants-form';
import { reset, getRestaurant, updateRestaurant } from './restaurant.reducer';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

interface IResetaurantEditForm extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const ResetaurantEditForm = (props: IResetaurantEditForm) => {
  const { updateSuccess } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const goBack = () => {
    history.push('/restaurants');
  };

  const onSubmit = values => {
    dispatch(updateRestaurant(values));
  };

  const formik = useFormik<IRestaurantFormModel>({
    validateOnChange: false,
    initialValues: null,
    validationSchema: validationSchema(),
    onSubmit,
  });

  useEffect(() => {
    props.getRestaurant(+id);
  }, []);

  useEffect(() => {
    if (props.restaurant) {
      formik.setValues(props.restaurant);
    }
  }, [props.restaurant, props.fetching]);

  useEffect(() => {
    if (updateSuccess) {
      goBack();
    }
    return () => {
      props.reset();
    };
  }, [updateSuccess]);

  const { values, handleChange, errors } = formik;

  return !props.fetching && values ? (
    <Container style={{ width: '66vw' }} className="d-flex w-66 flex-column justify-center card" fluid>
      <Row className="d-flex justify-content-between align-items-center m-1">
        <h1>Edytuj restauracje</h1>
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
          <Button className="w-100" color="primary" onClick={formik.handleSubmit}>
            Edytuj
          </Button>
        </Col>
      </Row>
    </Container>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  updating: storeState.restaurants.updating,
  updateSuccess: storeState.restaurants.updateSuccess,
  restaurant: storeState.restaurants.restaurant,
  fetching: storeState.restaurants.loading,
});

const mapDispatchToProps = { getRestaurant, reset, updateRestaurant };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResetaurantEditForm);
