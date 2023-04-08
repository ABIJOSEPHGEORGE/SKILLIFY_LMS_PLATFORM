import React from 'react'
import AllUsers from '../../components/admin/users/AllUsers'
import SideBar from '../../components/admin/SideBar'

function Students() {
  return (
    <div className='flex h-full'>
        <SideBar/>
        <AllUsers/>
    </div>
  )
}

export default Students