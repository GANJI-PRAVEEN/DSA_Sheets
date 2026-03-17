import React from 'react'
import Navbar from './Navbar'

const HomePage = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div>
      <Navbar/>
      <div className='text-center m-10'>
        <p className='text-lg sm:text-3xl'>Welcome {user?.name}</p>
      </div>

    </div>
  )
}

export default HomePage
