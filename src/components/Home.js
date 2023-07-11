import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BiSearchAlt } from 'react-icons/bi'
import { filterE } from '../Feature'
import { ImCross } from 'react-icons/im'
import { v4 as uuidv4 } from 'uuid';
import { updateEmployee } from '../Feature'

const Home = () => {
    const dispatch = useDispatch()
    const { emplyee, manager,isLoading } = useSelector((store) => store.emp)

    const [fileURL, setFileURL] = useState('');
    const [Name, setName] = useState('')
    const [query, setQuery] = useState('')
    const [modal, setModal] = useState(false)

    useEffect(() => {
        dispatch(filterE(query))
    }, [query])

    const handleSubmit = (e) => {
        let newManager = {
            id: uuidv4(),
            employee: Name,
            image: fileURL
        }
        dispatch(updateEmployee(newManager))
        setFileURL('')
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
    return (
        <>
            <div className='flex w-full items-center justify-center'>
                <div className='flex items-center bg-white w-[350px] p-2 my-2'>
                    <BiSearchAlt className='w-[10%]' />
                    <input type="text" placeholder='Search Employees Of Perticular Manager' onChange={(e) => setQuery(e.target.value)} className='w-[90%] outline-none' />
                </div>
            </div>
            {manager ? <h1 className='pl-[80px] text-xl font-semibold'>Employees of {manager} are :-</h1> : <h1 className='pl-[20px] text-xl font-semibold'>Please Open Sidebar for seeing and Add Managers</h1>}
            <div className='border-t-[2px] grid py-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 place-content-start w-full place-items-center'>
                {emplyee.map((item) => {
                    return <div key={item.id} className='w-[130px] h-[170px] shadow-md hover:shadow-xl border rounded-lg overflow-hidden'>
                        <img src={item.image} alt="" />
                        <h1>{item.employee}</h1>
                    </div>
                })}
            </div>
            {isLoading && <div className='flex justify-center items-center my-2' disabled={emplyee}>
                <button className='w-[250px] border p-2 bg-black text-white rounded-lg shadow-md' onClick={() => setModal(true)}>Add Employee</button>
            </div>}
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
                            </div>
                            <img src={fileURL} alt="" />
                            <button type='submit' className='bg-gray-100 border border-black text-black rounded-md hover:shadow-md my-2 px-2 py-1'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Home
