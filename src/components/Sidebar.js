import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { Link } from 'react-router-dom'
import { getEmployee } from '../Feature'
import { getManger,filter } from '../Feature'
import { BiSearch } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'

const Sidebar = ({ setToggle }) => {
  const {filtered_M} = useSelector((store)=>store.emp)
  
  const [query,setQuery] = useState('')

  const dispatch = useDispatch()

  const handleclick = (item, manager) => {
    setToggle(false)
    dispatch(getEmployee(item))
    dispatch(getManger(manager))
  }

  useEffect(()=>{
    dispatch(filter(query))
  },[query])

  return (
    <div className='w-[80%] border-r-2 fixed top-0 left-0 h-full bg-white'>
      <ImCross className='absolute top-0 right-0 sm:top-4 sm:right-4 cursor-pointer' onClick={() => setToggle(false)} />
      <form className='flex justify-center items-center my-2'>
        <div className='flex items-center w-[50%] gap-2 border-[2px] border-black rounded-tl-md rounded-bl-md'>
          <button className='w-[5%]'><BiSearch /></button>
          <input type="text" className='outline-none w-[95%]' placeholder='search' onChange={(e)=>setQuery(e.target.value)} />
        </div>
        <button type='submit' className='w-[15%] sm:w-[10%] border-[2px] border-l-0 border-black rounded-tr-md rounded-br-md text-white bg-black'>Search</button>
      </form>
      <div className='grid py-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 place-content-start w-full place-items-center'>
        {
          filtered_M.map((item) => {
            return <div key={item.id} className='w-[130px] h-[170px] shadow-md border cursor-pointer rounded-lg overflow-hidden'>
              <img src={item.image} alt="" onClick={() => setToggle(false)} />
              <Link to={'/'} onClick={() => handleclick(item.Employee, item.manager)}>{item.manager}</Link>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Sidebar
