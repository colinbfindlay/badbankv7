import React from 'react'
import User from './User'

export default function UserList({ data }) {
  return (
    data.map(user => {
      // return <User key={user._id} user={user} />
      return <User key={user._id} user={user}/>
    })
  )
}