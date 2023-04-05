import React from 'react'
import SideBar from '../../components/admin/SideBar'
import AllInstructors from '../../components/admin/AllInstructors'

function Instrcutors() {
  return (
    <div className='flex'>
      <SideBar/>
      <AllInstructors/>
    </div>
  )
}

export default Instrcutors