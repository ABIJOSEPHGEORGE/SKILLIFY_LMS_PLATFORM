import React from 'react'
import SideBar from '../../components/admin/SideBar'
import AllInstructors from '../../components/admin/users/AllInstructors'

function Instrcutors() {
  return (
    <div className='flex h-full'>
      <SideBar/>
      <AllInstructors/>
    </div>
  )
}

export default Instrcutors