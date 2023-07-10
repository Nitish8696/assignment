import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { RxHamburgerMenu } from 'react-icons/rx'

const Navbar = () => {
  const [toggle,setToggle] = useState(false)
  return (
    <div className='w-full h-full p-2'>
      <RxHamburgerMenu className='text-2xl cursor-pointer' onClick={() => setToggle(!toggle)}/>
      {toggle && <Sidebar setToggle={setToggle}/>}
    </div>
  )
}

export default Navbar
