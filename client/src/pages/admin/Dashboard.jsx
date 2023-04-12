import React from 'react'
import SideBar from '../../components/admin/SideBar'
import SideMenu from '../../components/instructors/SideMenu'


function Dashboard() {
  return (
    <div className='flex h-full'>
        <SideBar/>
        Dashboard
    </div>
  )
}

export default Dashboard