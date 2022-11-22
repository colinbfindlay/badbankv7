import React from 'react'

export default function Transaction({ transaction }) {

  const formattedDate = new Date(transaction.date).toLocaleString(); // Change the date format here

  if(transaction.isDeposit === 'true') {
  return (
    <div>
      <label className="text-success">
        <div>Deposit: ${transaction.amount}</div>
        <div>{formattedDate}</div>
        <div>{transaction.description}</div>
        <br/>
      </label>
    </div>
  )
  }
  return (
    <div>
      <label className="text-danger">
      <div>Withdraw: ${transaction.amount}</div>
        <div>{formattedDate}</div>
        <div>{transaction.description}</div>
        <br/>
      </label>
    </div>
  )

}