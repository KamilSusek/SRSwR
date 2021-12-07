import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">Swsr</Translate>
    </span>
    <span className="navbar-version">{appConfig.VERSION}</span>
  </NavbarBrand>
);

export const Reservations = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <span>Rezerwacje</span>
    </NavLink>
  </NavItem>
);

export const Restaurants = props => (
  <NavItem>
    <NavLink tag={Link} to="/restaurants" className="d-flex align-items-center">
      <span>Restauracje</span>
    </NavLink>
  </NavItem>
);

export const AddReservation = props => (
  <NavItem>
    <NavLink tag={Link} to="/reservations/create" className="d-flex align-items-center">
      <span>Dodaj rezerwacje</span>
    </NavLink>
  </NavItem>
);

export const MyReservations = props => (
  <NavItem>
    <NavLink tag={Link} to="/my-reservations" className="d-flex align-items-center">
      <span>Moje rezerwacje</span>
    </NavLink>
  </NavItem>
);
