import React from 'react';
import { Translate } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    if (username && password) {
      handleLogin(username, password, rememberMe);
    }
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
        <AvForm onSubmit={this.handleSubmit}>
          <ModalHeader id="login-title" toggle={handleClose}>
            Zaloguj się
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                {loginError ? (
                  <Alert color="danger">
                    <strong>Nie udało się zalogować!</strong> Sprawdź wprowadzone dane i spróbuj ponownie.
                  </Alert>
                ) : null}
              </Col>
              <Col md="12">
                <AvField name="username" label="Login" placeholder="Login" required errorMessage="Pole nie może być puste!" autoFocus />
                <AvField
                  name="password"
                  type="password"
                  label="Hasło"
                  placeholder="Hasło"
                  required
                  errorMessage="Pole nie może być puste!"
                />
              </Col>
            </Row>
            <div className="mt-1">&nbsp;</div>
            <Alert color="warning">
              <span>Zapomniałeś hasło? </span>
              <Link to="/account/reset/request">Kliknij aby odzyskać konto.</Link>
            </Alert>
            <Alert color="warning">
              <span>Nie posiadasz konta?</span> <Link to="/account/register">Zarejestruj się.</Link>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose} tabIndex="1">
              Anuluj
            </Button>{' '}
            <Button color="primary" type="submit">
              Zaloguj się
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    );
  }
}

export default LoginModal;
