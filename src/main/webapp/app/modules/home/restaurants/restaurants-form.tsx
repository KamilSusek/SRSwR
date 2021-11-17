import React from 'react';
import { useFormik } from 'formik';
import { Container } from 'reactstrap';
import * as Yup from 'yup';

interface IRestaurantForm {
  restaurantName: string;
  city: string;
  street: string;
  postalCode: string;
  description: string;
}

const defaultValues = (): IRestaurantForm => ({
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

const RestaurantsForm = () => {

  const onSubmit = values => {
    alert(values);
  }
  
  const formik = useFormik<IRestaurantForm>({
    initialValues: defaultValues(),
    validationSchema: validationSchema(),
    onSubmit
  });

  return <Container></Container>;
};

export default RestaurantsForm;
