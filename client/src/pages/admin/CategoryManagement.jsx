import React from 'react'
import SideBar from '../../components/admin/SideBar'
import Category from '../../components/admin/category/Category'

function CategoryManagement() {
  return (
    <div className='flex h-full'>
        <SideBar/>
        <Category/>
    </div>
  )
}

export default CategoryManagement