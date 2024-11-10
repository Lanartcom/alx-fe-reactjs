// src/components/UserProfile.jsx
import { useContext } from 'react'
import UserContext from '../UserContext'

function UserProfile() {
  const { name, age, bio } = useContext(UserContext) // Access userData from context

  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Bio: {bio}</p>
    </div>
  )
}

export default UserProfile
