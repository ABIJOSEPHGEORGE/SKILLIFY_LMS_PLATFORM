import React from 'react'
import SideBar from '../../components/admin/SideBar'
import Category from '../../components/admin/Category'

function CategoryManagement() {
  return (
    <div className='flex'>
        <SideBar/>
        <Category/>
    </div>
  )
}

export default CategoryManagement