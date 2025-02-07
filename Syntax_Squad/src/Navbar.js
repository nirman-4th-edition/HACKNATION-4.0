import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Input,
  InputGroup,
  Button,
} from "reactstrap";
import "./App.css";

const NavbarMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const routes = [
    { name: "Agra", path: "/Agra" },
    { name: "Taj Mahal", path: "/ticketTaj" },
    { name: "Fatehpur Sikri", path: "/fatepursikri" },
    { name: "Agra Fort", path: "/agrafort" },
    { name: "Pune", path: "/Pune" },
    { name: "Aga Khan Palace", path: "/ticketAgakhan" },
    { name: "Kelkar Museum", path: "/ticketKelkar" },
    { name: "Shaniwar Wada", path: "/Shaniwar" },
    { name: "New Delhi", path: "/NewDelhi" },
    { name: "Humayun's Tomb", path: "/HumayunTomb" },
    { name: "Qutub Minar", path: "/QutubMinar" },
    { name: "Red Fort", path: "/Redfort" },
    { name: "Kolkata", path: "/Kolkata" },
    { name: "Indian Museum", path: "/indianmuseum" },
    { name: "Victoria Memorial", path: "/victoriameuseum" },
    { name: "Jorasanko Thakur Bari", path: "/Jorasanko" },
    { name: "Jaipur", path: "/Jaipur" },
    { name: "Amber Palace", path: "/AmberPalace" },
    { name: "Hawa Mahal", path: "/hawamahal" },
    { name: "Jantar Mantar", path: "/jantarmantar" },
    { name: "Chowmahalla Palace", path: "/chowmahalla" },
    { name: "Golconda Fort", path: "/Golconda" },
    { name: "Falaknuma Palace", path: "/falaknuma" },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim() === "") {
      setFilteredRoutes([]);
    } else {
      const matches = routes.filter((route) =>
        route.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRoutes(matches);
    }
  };

  const handleSelectRoute = (path) => {
    window.location.href = path; // Navigate to the selected route
  };

  return (
    <div>
      <Navbar dark expand="md" fixed="top" className="navDark">
        <Container>
          <NavbarBrand href="/">
            <h4 className="NavBrand">Safar</h4>
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto align-items-center" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/react/card">Locations</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/react/admin">Admin Login</NavLink>
              </NavItem>
              <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/about">About Us</DropdownItem>
                  <DropdownItem href="/contact">Contact</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/help">Help</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem className="ms-3 position-relative">
                <InputGroup>
                  <Input
                    placeholder="Search..."
                    value={searchText}
                    onChange={handleSearchChange}
                  />
                  <Button color="primary" onClick={() => handleSelectRoute(filteredRoutes[0]?.path)}>
                    Go
                  </Button>
                </InputGroup>
                {filteredRoutes.length > 0 && (
                  <div className="dropdown-menu show search-dropdown">
                    {filteredRoutes.map((route) => (
                      <div
                        key={route.path}
                        className="dropdown-item"
                        onClick={() => handleSelectRoute(route.path)}
                      >
                        {route.name}
                      </div>
                    ))}
                  </div>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarMain;
