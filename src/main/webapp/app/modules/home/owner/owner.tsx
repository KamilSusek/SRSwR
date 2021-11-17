import React from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

interface IOwner extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const Owner = (props: IOwner) => {

  return (
    <>
    Blank owner page
    </>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  reservations: storeState.clientReservations.reservations,
  totalItems: storeState.clientReservations.totalItems,
});

const mapDispatchToProps = { };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
