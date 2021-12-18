import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Alert, Col, Row } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { handlePasswordResetInit, reset } from '../password-reset.reducer';

export type IPasswordResetInitProps = DispatchProps;

export class PasswordResetInit extends React.Component<IPasswordResetInitProps> {
  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handlePasswordResetInit(values.email);
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1>
              Resetuj hasło
            </h1>
            <Alert color="warning">
              <p>
                Wprowadź adres email, na który zarejestrowano konto.
              </p>
            </Alert>
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvField
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
                validate={{
                  required: { value: true, errorMessage: "Pole jest wymagane." },
                  minLength: { value: 5, errorMessage: 'Pole powinno zawierac minimalnie 5 znaków.' },
                  maxLength: { value: 254, errorMessage: 'Pole powinno zawierac maksymalnie 254 znaki.' },
                }}
              />
              <Button color="primary" type="submit">
                Resetuj hasło
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = { handlePasswordResetInit, reset };

type DispatchProps = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(PasswordResetInit);
