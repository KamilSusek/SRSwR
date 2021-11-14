import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { defaultValues } from 'app/shared/model/reservation.model';
import ReservationListItem from './reservations/reservation-list-item';
export type IHomeProp = StateProps;

const TEMP_DATA = [{ restaurantName: 'Esencja', reservationCode: '420420', tableNumber: 4, numberOfPlaces: 4, reservationStart: '', reservationEnd: '', notes: '' }];

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Row>
      <Col md="9">
        {account && account.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                You are logged in as user {account.login}.
              </Translate>
            </Alert>
          </div>
        ) : (
          <div></div>
        )}
      </Col>
      <h1>System Rezerwacji Stolika w Restauracji</h1>
      {TEMP_DATA.map((item, index) => (
        <ReservationListItem key={index} reservation={item} />
      ))}
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
