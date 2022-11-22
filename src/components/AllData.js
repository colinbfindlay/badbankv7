import React, { useState, useEffect } from 'react'
import UserList from './UserList'
import TransactionList from './TransactionList'
import { useAuth } from '../contexts/AuthContext'
import UserCard from './UserCard'

export default function AllData() {

    // Code added to fetch data from API
    const [data, setData] = useState([]);
    const [transData, setTransData] = useState([]);
    const { currentUser } = useAuth()

    
    // SECURED User Data
    useEffect(() => {
      if (currentUser) {
        currentUser.getIdToken()
        .then(idToken => {
          console.log('idToken:', idToken);
          //fetch('http://localhost:3001/account/all', {    // running locally
            fetch('/account/all', {                         //running on server
            method: 'GET',
            headers: {
              'Authorization': idToken
            }
          }) 
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(data);
      });
        }).catch(e => console.log('e:', e));
      } else {
        console.warn('There is currently no logged in user. Unable to call Auth Route.');
      } 
    }, []); 
    
    
    

    /*
    // UNSECURED ALL USERS
    useEffect(() => {
    fetch('http://localhost:3001/account/all') //running locally
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      });
     }, []);
     */


    



    /* --- This Works
    // Transaction Data
    useEffect(() => {
      fetch('http://localhost:3001/transactions/all') //running locally
      //fetch('/account/all') //running from server
        .then(response => response.json())
        .then(transData => {
          console.log(transData);
          setTransData(transData);
        });
    }, []);
    */


  return (
    <div>
      <br/>
      <UserCard data={data}/>
      Users:
      <UserList data={data}/>
      Transactions:
      <TransactionList data={transData}/>
    </div>
  )
}
