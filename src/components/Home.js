import React from 'react'
import logo from './bank.png'
import Card from '../contexts/CardContext'
import { Container } from 'react-bootstrap'

export default function Home() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "75vh"}}>
    <div className="w-100" style={{ maxWidth: "400px" }}>
    <br/>
    <Card
      bgcolor="secondary"
      txtcolor="white"
      header="Welcome to Bad Bank"
      title="Full Stack Banking App using MERN"
      text="Colin Findlay, Class: Feb. 2022, Section B"
      body={(<img src={logo} className="img-fluid" alt="Responsive Image"/>)}
    />
    </div>
    </Container>
  )
}
