import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';

export interface IUserPasswordProps extends StateProps, DispatchProps {}

export const PasswordPage = (props: IUserPasswordProps) => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    props.reset();
    props.getSession();
    return () => {
      props.reset();
    };
  }, []);

  const handleValidSubmit = (event, values) => {
    props.savePassword(values.currentPassword, values.newPassword);
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="password-title">Zmień hasło dla użytkownika: {props.account.login}</h2>
          <AvForm id="password-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="currentPassword"
              label="Obecne hasło"
              placeholder="Obecne hasło"
              type="password"
              validate={{
                required: { value: true, errorMessage: 'Pole jest wymagane.' },
              }}
            />
            <AvField
              name="newPassword"
              label="Nowe hasło"
              placeholder="Nowe hasło"
              type="password"
              validate={{
                required: { value: true, errorMessage: 'Pole jest wymagane.' },
                minLength: { value: 4, errorMessage: 'Hasło powinno zawierac minimalnie 4 znaki.' },
                maxLength: { value: 50, errorMessage: 'Hasło powinno zawierac maksymalnie 50 znaków.' },
              }}
              onChange={updatePassword}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="confirmPassword"
              label="Potwierdź nowe hasło"
              placeholder="Potwierdź nowe hasło"
              type="password"
              validate={{
                required: {
                  value: true,
                  errorMessage: 'Pole jest wymagane.',
                },
                minLength: {
                  value: 4,
                  errorMessage: 'Hasło powinno zawierac minimalnie 4 znaki.',
                },
                maxLength: {
                  value: 50,
                  errorMessage: 'Hasło powinno zawierac maksymalnie 50 znaków.',
                },
                match: {
                  value: 'newPassword',
                  errorMessage: 'Hasła nie są takie same.',
                },
              }}
            />
            <Button color="success" type="submit">
              Zapisz
            </Button>
          </AvForm>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { getSession, savePassword, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPage);
