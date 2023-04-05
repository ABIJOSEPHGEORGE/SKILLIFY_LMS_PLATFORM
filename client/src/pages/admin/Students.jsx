import React from 'react'
import AllUsers from '../../components/admin/AllUsers'
import SideBar from '../../components/admin/SideBar'

function Students() {
  return (
    <div className='flex'>
        <SideBar/>
        <AllUsers/>
    </div>
  )
}

export default Students