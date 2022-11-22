import React, { useState, useEffect } from 'react'
import Transaction from './Transaction'
import { useAuth } from '../contexts/AuthContext'


export default function TransactionList({ data }) {
  const { currentUser } = useAuth()
  const filteredData = data.filter(user => user.userid === currentUser.uid);
  
  /*
  // This works to sort by Amount in decending order
  const sortedData = filteredData.sort(function(a, b){
    return b.amount - a.amount
  });
  */

  // This works to sort by date in decending order
  const sortedData = filteredData.sort(function(a,b) {
    const date1 = new Date(a.date)
    const date2 = new Date(b.date)
    return date2 - date1;
  })
  

  return (
    sortedData.map(transaction => {
      return (
        <Transaction key={transaction._id} transaction={transaction} />
      )
    })
  )
}


