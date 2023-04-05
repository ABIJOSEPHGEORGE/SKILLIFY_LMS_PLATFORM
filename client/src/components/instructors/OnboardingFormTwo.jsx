import React from 'react'


function OnboardingFormTwo({formik}) {
  return (
    <>
        <h2 className='text-black font-semibold text-3xl w-full leading-10'>What kind of teaching have you done before ?</h2>
        <form className='w-full h-2/5 my-5 flex flex-col place-content-evenly' onSubmit={formik.handleSubmit}>
            <div className="flex place-content-start place-items-center border-2 border-black px-3 py-2">
                <input type="radio" name="experience_years" id='fresher' className='p-2 cursor-pointer' onChange={formik.handleChange} values="I am a fresher"/>
                <label htmlFor="fresher" id='fresher' className='text-xl font-semibold text-black px-3 cursor-pointer'>I am a fresher</label>
            </div>
            <div className="flex place-content-start place-items-center border-2 border-black px-3 py-2">
                <input type="radio" name="experience_years" id='1year' className='p-2 cursor-pointer' onChange={formik.handleChange} value="More than 1 year"/>
                <label htmlFor="1year" id='1year' className='text-xl font-semibold text-black px-3 cursor-pointer'>More than 1 year</label>
            </div>
            <div className="flex place-content-start place-items-center border-2 border-black px-3 py-2">
                <input type="radio" name="experience_years" id='5years' className='p-2 cursor-pointer' onChange={formik.handleChange} value="More than 5 years"/>
                <label htmlFor="5years" id='5years' className='text-xl font-semibold text-black px-3 cursor-pointer'>More than 5 years</label>
            </div>
        </form>
    </>
  )
}

export default OnboardingFormTwo