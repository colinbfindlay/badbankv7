import React, { useState } from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()


  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch {
      setError('Failed to log out')
    }
  }


  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">BadBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#/deposit">Deposit</Nav.Link>
            <Nav.Link href="#/withdraw">Withdraw</Nav.Link>

          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in As: {currentUser.email}
            </Navbar.Text>
            <Button variant="link" onClick={handleLogout}>Log Out</Button>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
