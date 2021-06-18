import React from 'react'
import { FiSmile } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="center text-gray-700">
      <FiSmile style={{fontSize: '150px'}}/>
      <h1 className="h1 my-5">Hello there! Welcome to SkyLaundry</h1>
      <p className="w-full max-w-md text-center">The place for all your laundry needs. You've successfully logged in. As a customer, access create a new order request, a delivery driver will be at your door steps within a few hours! Why wait? <Link to="/order" className="underline">Order now..</Link>.</p>
    </div>
  )
}

export default Home
