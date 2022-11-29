import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    // Firebase Create User
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      //setSuccess('You have successfully signed up!  Taking you to the Home Page.')
      //alert('Account Successfully Created!')
      setLoading(true)
      navigate("/welcome")
      /*setTimeout(() => {
        navigate("/")
      }, 2000)*/
      


    } catch {
      setError('Failed to create an account')
    }
    //setLoading(false)
    // Firebase END

    // MongoDB Create User
    //const url = `http://localhost:3001/account/create/${emailRef.current.value}`; //running locally
    const url = `/account/create/${emailRef.current.value}`; // running from server
    (async () => {
      var res = await fetch (url);
      var data = await res.json();
      console.log(data);
    })();
    // MongoDB END


  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
     <div className="w-100" style={{ maxWidth: "400px" }}>
     <h1 className="d-flex justify-content-center">Colin Findlay</h1>
    <h3 className="d-flex justify-content-center">Full Stack Banking Application</h3>
    <br/>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit} >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control disabled={loading} type="email" ref={emailRef} required />
            </Form.Group>
            <br/>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control disabled={loading} type="password" ref={passwordRef} required />
            </Form.Group>
            <br/>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control disabled={loading} type="password" ref={passwordConfirmRef} required/>
            </Form.Group>
            <br/>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
    </Container>
  )
}
