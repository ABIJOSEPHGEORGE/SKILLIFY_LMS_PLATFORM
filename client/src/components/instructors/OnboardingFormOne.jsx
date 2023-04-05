import React from 'react'

function OnboardingFormOne({formik}) {
   
  return (
    <>
        
        <h2 className='text-black font-semibold text-3xl w-full leading-10'>What kind of teaching have you done before ?</h2>
        <form className='w-full h-2/5 my-5 flex flex-col place-content-evenly' onSubmit={formik.handleSubmit}>
            <div className="flex place-content-start place-items-center border-2 border-black px-3 py-2">
                <input type="radio" name="experience_mode" id='online' className='p-2 cursor-pointer' onChange={formik.handleChange} value="online"/>
                <label htmlFor="online" id='online' className='text-xl font-semibold text-black px-3 cursor-pointer'>Online</label>
            </div>
            <div className="flex place-content-start place-items-center border-2 border-black px-3 py-2">
                <input type="radio" name="experience_mode" id='offline' className='p-2 cursor-pointer' onChange={formik.handleChange} value="Offline"/>
                <label htmlFor="offline" id='offline' className='text-xl font-semibold text-black px-3 cursor-pointer'>Offline</label>
            </div>
            <div className="flex place-content-start place-items-center border-2 border-black px-3 py-2">
                <input type="radio" name="experience_mode" id='both' className='p-2 cursor-pointer' onChange={formik.handleChange} value="both"/>
                <label htmlFor="both" id='both' className='text-xl font-semibold text-black px-3 cursor-pointer'>Both</label>
            </div>
        </form>
    </>
  )
}

export default OnboardingFormOne