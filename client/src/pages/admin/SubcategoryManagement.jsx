import React from 'react'
import SideBar from '../../components/admin/SideBar'
import SubCategory from '../../components/admin/sub category/SubCategory'

function SubcategoryManagement() {
  return (
    <div className='flex h-full'>
        <SideBar/>
        <SubCategory/>
    </div>
  )
}

export default SubcategoryManagement