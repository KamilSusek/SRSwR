import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

const accountMenuItemsAuthenticated = (
  <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu">
    <MenuItem icon="lock" to="/account/password">
      Zmień hasło
    </MenuItem>
    <MenuItem icon="sign-out-alt" to="/logout">
      Wyloguj się
    </MenuItem>
  </NavDropdown>
);

const accountMenuItems = (
  <>
    <NavItem>
      <NavLink tag={Link} to="/login" className="d-flex align-items-center">
        <span>Zaloguj sie</span>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/account/register" className="d-flex align-items-center">
        <span>Zaloz konto</span>
      </NavLink>
    </NavItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => <>{isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}</>;

export default AccountMenu;
