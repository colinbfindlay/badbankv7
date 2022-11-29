import React from 'react'
import logo from './bank.png'
import Card from '../contexts/CardContext'
import { Container } from 'react-bootstrap'

export default function Welcome() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "75vh"}}>
    <div className="w-100" style={{ maxWidth: "400px" }}>
    <br/>
    <Card
      bgcolor="secondary"
      txtcolor="white"
      header="Sign up Successful!"
      title="Full Stack Banking App using MERN"
      text="Welcome to Bad Bank, please use the menu above to navigate the site"
      body={(<img src={logo} className="img-fluid" alt="Responsive Image"/>)}
    />
    </div>
    </Container>
  )
}