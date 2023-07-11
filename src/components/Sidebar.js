import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { Link } from 'react-router-dom'
import { getEmployee, getId, updateLoading } from '../Feature'
import { getManger, filter, pushManager } from '../Feature'
import { BiSearchAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { Arry } from '../Data'

const Sidebar = ({ setToggle }) => {
  const [fileURL, setFileURL] = useState('');
  const [filesURL, setFilesURL] = useState('');

  const [Name, setName] = useState('')
  const [Ename,setEname] = useState('')
  const { filtered_M } = useSelector((store) => store.emp)

  const [modal, setModal] = useState(false)
  const [query, setQuery] = useState('')

  const dispatch = useDispatch()

  const handleclick = (item, manager, id) => {
    setToggle(false)
    dispatch(getId(id))
    dispatch(getEmployee(item))
    dispatch(getManger(manager))
    dispatch(updateLoading())
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const url = e.target.result;
        setFileURL(url);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleFileChangee = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const url = e.target.result;
        setFilesURL(url);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    let newManager = {
      id: uuidv4(),
      manager: Name,
      image: fileURL,
      Employee : [
        {
          id:uuidv4(),
          employee : Ename,
          image : filesURL,
        }
      ]
    }
    dispatch(pushManager(newManager))
    setFileURL('')
  }
  console.log(Arry);
  useEffect(() => {
    dispatch(filter(query))
  },[query])

  return (
    <div className='w-[80%] border-r-2 fixed top-0 left-0 h-full bg-white overflow-y-scroll'>
      <ImCross className='absolute top-2 right-2 sm:top-4 sm:right-4 cursor-pointer' onClick={() => setToggle(false)} />
      <div className='flex w-full items-center justify-center'>
        <div className='flex items-center bg-white w-[250px] p-2 mt-8 border-[1px] border-black'>
          <BiSearchAlt className='w-[10%]' />
          <input type="text" placeholder='Search Employees Of Perticular Manager' onChange={(e) => setQuery(e.target.value)} className='w-[90%] outline-none' />
        </div>
      </div>
      <div className='grid py-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 place-content-start w-full place-items-center'>
        {
          filtered_M.map((item) => {
            return <div key={item.id} className='w-[130px] h-[170px] shadow-sm hover:shadow-xl border cursor-pointer rounded-lg overflow-hidden' onClick={() => handleclick(item.Employee, item.manager,item.id)}>
              <img src={item.image} alt="" onClick={() => setToggle(false)} />
              <Link to={'/'}>{item.manager}</Link>
            </div>
          })
        }
      </div>
      <div className='flex justify-center items-center my-2'>
        <button className='w-[250px] border p-2 bg-black text-white rounded-lg shadow-md' onClick={() => setModal(true)}>Add Managers</button>
      </div>
      {modal && <div className='fixed top-0 left-0 bg-gray-400/[0.8] w-full h-screen'>
        <ImCross className='absolute text-xl cursor-pointer top-4 right-4 text-red-600' onClick={() => setModal(false)} />
        <div className='w-full h-full flex justify-center items-center'>
          <div className='bg-white w-[350px] h-auto p-2 rounded-md shadow-md'>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name :</label>
                <input type="text" placeholder='Name' className='border-[1px] border-black outline-none w-full rounded-md shadow-md'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Profile Photo :</label>
                <input type="file" onChange={handleFileChange} />
                <div className='mt-2'>
                  <h1 className='font-semibold'>Add Employes</h1>
                  <hr />
                  <div className='my-1'>
                    <label>Employee Name : </label>
                    <input type="text" className='border-[1px] border-black outline-none rounded-md shadow-md' placeholder='Name' onChange={(e)=>setEname(e.target.value)}/>
                  </div>
                  <div className='flex flex-col my-1'>
                    <label>Employee Profile :</label>
                    <input type="file" onChange={handleFileChangee}/>
                  </div>
                  <hr />
                </div>
              </div>
              {/* <img src={fileURL} alt="" /> */}
              <button type='submit' className='border border-black rounded-md hover:shadow-md my-2 px-2 py-1'>Submit</button>
            </form>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Sidebar
