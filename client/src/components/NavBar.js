import React, { Component } from 'react';
import { Button, Navbar, NavbarBrand, NavItem, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar color="info" expand="md">
          <NavbarBrand tag="div">
            <Link to="/jokes">Dad Jokes</Link>
          </NavbarBrand>
          <Nav>
            <NavItem>
              <Link to="/jokes">Jokes</Link>
            </NavItem>
            <NavItem>
              <Link to="/signin">Sign in</Link>
            </NavItem>
            <NavItem>
              <Link to="/signup">Sign up</Link>
            </NavItem>
            <NavItem>
              <Button onClick={this.props.signOut}>Sign out</Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
