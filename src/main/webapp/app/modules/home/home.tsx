import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import ClientReservation from './client-user/client-reservation';
export type IHomeProp = StateProps;


export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Container>
      {account && account.login ? <ClientReservation /> : <div></div>}
    </Container>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
