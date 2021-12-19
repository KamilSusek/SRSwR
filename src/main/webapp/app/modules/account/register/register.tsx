import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

export interface IRegisterProps extends StateProps, DispatchProps {}

export const RegisterPage = (props: IRegisterProps) => {
  const [password, setPassword] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  useEffect(
    () => () => {
      props.reset();
    },
    []
  );

  const handleValidSubmit = (event, values) => {
    props.handleRegister(values.username, values.email, values.firstPassword, isOwner, props.currentLocale);
    event.preventDefault();
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title">Rejestracja</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="isOwner"
              label="Załóż konto właściciela restauracji"
              placeholder="Załóż konto właściciela restauracji"
              type="checkbox"
              onChange={e => setIsOwner(e.target.checked)}
            />
            <AvField
              name="username"
              label="Login"
              placeholder="Login"
              validate={{
                required: { value: true, errorMessage: 'Pole jest wymagane.' },
                pattern: {
                  value: '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$',
                  errorMessage: 'Podaj inny login.',
                },
                minLength: { value: 1, errorMessage: 'Pole powinno być o minimalnej długości 1.' },
                maxLength: { value: 50, errorMessage: 'Pole powinno być o maksymalnej długości 50.' },
              }}
            />
            <AvField
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
              validate={{
                required: { value: true, errorMessage: 'Pole jest wymagane.' },
                minLength: { value: 5, errorMessage: 'Pole powinno być o minimalnej długości 5.' },
                maxLength: { value: 254, errorMessage: 'Pole powinno być o maksymalnej długości 254.' },
              }}
            />
            <AvField
              name="firstPassword"
              label="Nowe hasło"
              placeholder="Nowe hasło"
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, errorMessage: 'Pole jest wymagane.' },
                minLength: { value: 4, errorMessage: 'Pole powinno być o minimalnej długości 4.' },
                maxLength: { value: 50, errorMessage: 'Pole powinno być o maksymalnej długości 50.' },
              }}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="secondPassword"
              label="Nowe hasło"
              placeholder="Nowe hasło"
              type="password"
              validate={{
                required: { value: true, errorMessage: 'Pole jest wymagane.' },
                minLength: { value: 4, errorMessage: 'Pole powinno być o minimalnej długości 4.' },
                maxLength: { value: 50, errorMessage: 'Pole powinno być o maksymalnej długości 50.' },
                match: { value: 'firstPassword', errorMessage: 'Hasła się nie zgadzają.' },
              }}
            />
            <Button id="register-submit" color="primary" type="submit">
              Zarejestruj się
            </Button>
          </AvForm>
          <p>&nbsp;</p>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
});

const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
