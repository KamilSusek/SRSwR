import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

const accountMenuItemsAuthenticated = (
  <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu">
    <MenuItem icon="wrench" to="/account/settings">
      <Translate contentKey="global.menu.account.settings">Settings</Translate>
    </MenuItem>
    <MenuItem icon="lock" to="/account/password">
      <Translate contentKey="global.menu.account.password">Password</Translate>
    </MenuItem>
    <MenuItem icon="sign-out-alt" to="/logout">
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem>
  </NavDropdown>
);

const accountMenuItems = (
  <>
    <NavItem>
      <NavLink tag={Link} to="/login" className="d-flex align-items-center">
        <span>
          <Translate contentKey="global.menu.account.login">Sign in</Translate>
        </span>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/account/register" className="d-flex align-items-center">
        <span>
          <Translate contentKey="global.menu.account.register">Sign in</Translate>
        </span>
      </NavLink>
    </NavItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => <>{isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}</>;

export default AccountMenu;
