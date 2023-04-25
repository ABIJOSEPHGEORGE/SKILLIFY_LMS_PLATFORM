import { Textarea } from '@material-tailwind/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Notes({courseId}) {
    const [note,setNote] = useState('');
    const [notes,setNotes] = useState([])

    useEffect(()=>{
        fetchNotes()
    },[])

    function newNote(e){
        e.preventDefault()
        axios.post(`/user/course/notes/${courseId}`,{note:note})
        .then((res)=>{
            fetchNotes();
            setNote('')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function fetchNotes(){
        axios.get(`/user/course/notes/${courseId}`)
        .then((res)=>{
            setNotes(res.data.results)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    console.log(notes)
  return (
    <div className='w-full font-poppins'>
        <div className="flex flex-col place-items-center w-full">
            <form className='w-4/5 flex flex-col gap-3' onSubmit={(e)=>{newNote(e)}}>
                <h1 className='text-lg font-semibold text-center font-poppins'>New Note</h1>
                <Textarea label='write a note' value={note} onChange={(e)=>{setNote(e.target.value)}} placeholder='write a note' color="gray" variant='static'></Textarea>
                <button className='text-white bg-black px-4 py-3' type='submit'>Create Note</button>
            </form>

            <div className="flex flex-col w-4/5 place-items-center py-5 overflow-y-scroll scrollbar-hide">
                <h2 className='text-lg font-semibold text-primaryBlue'>Previous Notes</h2>
                {
                    notes?.map((note)=>(
                        <div className="flex flex-col gap-2 py-3 bg-gray-300 w-full my-2">
                            <p className='text-md p-2 text-black'>{note.note}</p>
                        </div>
                    ))
                }
               
            </div>
        </div>
       
    </div>
  )
}

export default Notes