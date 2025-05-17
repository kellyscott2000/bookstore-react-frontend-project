/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Sidebar.style.css'


function Sidebar() {
  return (
    <div className='bg-white sidebar p-2'>
        <div className='m-2'>
            <i className='bi bi-bootstrap-fill me-3 fs-4' ></i>
            <span className='brand-name fs-4'>Victory</span>
        </div>
        <hr className='text-dark' />
        <div className='list-group list-group-flush'>
            <a className='list-group-item py-2' href='/dashboard'>
               <i className='bi bi-speedometer2 fs-5 me-3'></i>
               <span>Dashboard</span> 
            </a>
            <a className='list-group-item py-2' href='/book'>
               <i className='bi bi-book fs-5 me-3'></i>
               <span>Books</span> 
            </a>
            <a className='list-group-item py-2' href='/'>
               <i className='bi bi-power fs-5 me-3'></i>
               <span>Logout</span> 
            </a>
            
        </div>
    </div>
  )
}

export default Sidebar