import React, { useContext, useState, useEffect } from 'react'
import Card from '../contexts/CardContext'
import { useFormik } from 'formik';
import { Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import TransactionList from './TransactionList'

// DEPOSIT COMPONENT -------------------------
export default function Withdraw() {

  const [show, setShow] = useState(true);
  const { currentUser } = useAuth()
  const [transData, setTransData] = useState([]);


 // VALIDATION ---------------------------
  const validate = values => {
    const errors = {};

    if (!values.amount) {
      errors.amount = 'Required';
    } else if (isNaN(values.amount)) {
      errors.amount = 'Must be a Number';
    }else if (values.amount < 0) {
      errors.amount = 'Must be a Positive Number';
    }else if ((sum - values.amount) < -500) {
      errors.amount = 'Max $500 Overdraft Allowed';
    }

    if (!values.description) {
      errors.description = 'Required';
    } else if (values.amount.length > 15) {
      errors.amount = 'Must be 15 characters or less';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      amount: '',
      description: '',
      isDeposit: '',
    },
    validate,
    onSubmit://-----------------------------SUBMIT-----------------------------
      values => {
        //alert('Submitted');
        setShow(false);
        formik.resetForm();
          // MongoDB START
          // API Route: '/transactions/deposit/:userid/:email/:description/:amount/:isdeposit/:date'
          const date = new Date();
          //const url = `http://localhost:3001/transactions/deposit/${currentUser.uid}/${currentUser.email}/${values.description}/${-Math.abs(values.amount)}/${false}/${date}`; //running locally
          const url = `/transactions/deposit/${currentUser.uid}/${currentUser.email}/${values.description}/${-Math.abs(values.amount)}/${false}/${date}`; //running on server
          (async () => {
            var res = await fetch (url);
            var data = await res.json();
            console.log(data);
          })();
          // MongoDB END

          // Transaction Data
          //fetch('http://localhost:3001/transactions/all') //running locally
          fetch('/transactions/all') //running from server
            .then(response => response.json())
            .then(transData => {
              console.log(transData);
              setTransData(transData);
            });
         
      },
  });

  function clearForm(){
    setShow(true);
  }

  let filteredData = transData.filter(user => user.userid === currentUser.uid);
  
  let sum = filteredData.reduce(function(prev, current) {
    return prev + +current.amount
  }, 0);
  

  let balMsg = (value) => {
    if (value < 0) {
      return (
        "Negative Balance Alert!"
      )
    }
    return "Positive Balance"
  }


  // Sets the colour of the Balance and Overdraft Messages
  let balCol = (value) => {
    if (value < 0) {
      return (
        "text-danger"
      )
    }
    return "text-success"
  }
 


  // Transaction Data
  useEffect(() => {
    //fetch('http://localhost:3001/transactions/all') //running locally
    fetch('/transactions/all') //running from server
      .then(response => response.json())
      .then(transData => {
        console.log(transData);
        setTransData(transData);
      });
  }, []);


  return (
    <Container>
    <Row>
      <Col sm className="d-flex align-items-top justify-content-center" style={{ minHeight: "50vh"}}>
    <div className="w-100" style={{ maxWidth: "400px" }}>
    <h1 className="d-flex justify-content-center">Withdraw</h1>
      <br/>
    <Card
    bgcolor="dark"
    txtcolor="light"
    header="Withdraw Form"
    body={show ? (
      <>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="amount">Withdraw Amount</label><br/>
          <input
            id="amount"
            name="amount"
            type="text"
            className="form-control" 
            placeholder="Enter Amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
          />
          {formik.touched.amount && formik.errors.amount ? (
            <div className="text-danger">{formik.errors.amount}</div>
          ) : null}
          <br/>
          <label htmlFor="description">Withdraw Description</label><br/>
          <input
            id="description"
            name="description"
            type="text"
            className="form-control" 
            placeholder="Enter Description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-danger">{formik.errors.description}</div>
          ) : null}
          <br/>
          <br/>
          <button type="submit" className="btn btn-light" disabled={!(formik.isValid && formik.dirty)} >Submit</button>
        </form>
      </>
    ):(
      <>
        <h5 className="text-warning">Withdraw Successful!</h5>
        <button type="submit" className="btn btn-light" onClick={clearForm}>Make another Withdraw</button>
      </>
    )}
    />
    </div>


    </Col>
    <Col sm className="d-flex align-items-top justify-content-center" style={{ minHeight: "50vh"}}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <br/>
        <Card
          bgcolor="dark"
          txtcolor="light"
          header="Account Summary"
          title=""
          text=""
          body={
            <>
            <h5 className={balCol(sum)}>Current Balance: ${sum}</h5>
            <div className={balCol(sum)}>Overdraft: {balMsg(sum)}</div>
            <div>Total Transactions: {filteredData.length}</div>
            Transaction List:
            <TransactionList data={transData}/>
            </>
          }
        />
      </div>
    </Col>
    </Row>
    </Container>
  )
}