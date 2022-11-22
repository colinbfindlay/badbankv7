import React from 'react'
import { Button, Card, Row, Col } from 'react-bootstrap'

export default function UserCard({ data }) {


  return (

     // this format is from the react-bootstrap card section...Grid Cards
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {data.map((value, index) => (
      <Col  className="d-flex align-items-top justify-content-center" key={index}>
        <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="logo192.png"/>
          <Card.Body>
            <Card.Title>{value.email}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        </div>
      </Col>
      ))}
     </Row>

  )
}
