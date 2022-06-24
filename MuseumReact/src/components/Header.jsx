import React, { Component } from 'react';
import { Navbar, Nav, Container, NavDropdown, NavItem} from 'react-bootstrap';

import '../App.css';
import { isLoggedIn } from './auth/utils';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };}
    /**
     * Eksponati
     * @returns <NavDropdown title="Eksponati" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/exhibits">Prikazi eksponate</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item disabled={!isLoggedIn()} href="/addexhibit">Dodaj eksponat</NavDropdown.Item>
                </NavDropdown>
     */
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/home">Muzeji Srbije</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Muzeji" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/museums">Prikazi muzeje</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item disabled={!isLoggedIn()} href="/addmuseum">Dodaj muzej</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Izlozbene sale" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/auditoriums">Prikazi sale</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Izlozbe" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/exhibitions">Prikazi izlozbe</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item disabled={!isLoggedIn()} href="/addexhibition">Dodaj izlozbu</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Korisnik" id="collasible-nav-dropdown">
                   {isLoggedIn() ? <NavDropdown.Item href="/logout">Odjava</NavDropdown.Item> : <NavDropdown.Item href="/login">Prijava</NavDropdown.Item>} 
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
          )
      }
}
export default Header;