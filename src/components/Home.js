import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const { emplyee,manager } = useSelector((store) => store.emp)
    return (
        <>
        {manager ? <h1>Employees of {manager} are :-</h1> : <h1>Please Open Sidebar for seeing and Add Managers</h1>}
            <div className='border-t-[2px] grid py-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 place-content-start w-full h-[100vh] place-items-center'>
                {emplyee.map((item) => {
                    return <div key={item.id} className='w-[130px] h-[170px] shadow-md border rounded-lg overflow-hidden'>
                        <img src={item.image} alt="" />
                        <h1>{item.employee}</h1>
                    </div>
                })}
            </div>
        </>
    )
}

export default Home
