import React from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import SideBar from '../../components/admin/SideBar'

function InstructorDashboard() {
  console.log("dashboard")
  return (
    <div className='flex'>
        <SideMenu/>
    </div>
  )
}

export default InstructorDashboard