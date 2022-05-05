import React from "react";
import { Container, Nav, Navbar, Dropdown, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="./../logo.png"
            className="d-inline-block align-top"
            alt="Real Cloud"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto custom-navbar d-flex justify-content-between w-100 flex-column flex-md-row">
            <div className="d-flex align-items-center flex-column flex-md-row">
              <Nav.Link
                as={Link}
                to="/prospect/search"
                active={location.pathname === "/prospect/search"}
              >
                Search Properties
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/prospect/people-search"
                active={location.pathname === "/prospect/people-search"}
              >
                Search People
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/prospect/my-properties"
                active={location.pathname === "/prospect/my-properties"}
              >
                My Properties
              </Nav.Link>
            </div>
            <div className="d-flex align-items-center">
              <Button>Your Credits: 0</Button>
              <Dropdown>
                <Dropdown.Toggle className="drop-navlink">
                  <img
                    src="./../user.jpg"
                    className="drop-img rounded-circle"
                    alt="userlogo"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <div className="d-flex">
                      <svg
                        className="svg-icon"
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path>
                      </svg>
                      <p>Account</p>
                    </div>
                  </Dropdown.Item>
                  <hr></hr>
                  <Dropdown.Item>
                    <div className="d-flex">
                      <svg
                        className="svg-icon"
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z"></path>
                      </svg>
                      <p>
                        Help Center<p>(844) 300 - 5122</p>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <hr></hr>
                  <Dropdown.Item>
                    <div className="d-flex">
                      <svg
                        className="svg-icon"
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path>
                      </svg>
                      <p>Sign out</p>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
