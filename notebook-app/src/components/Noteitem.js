import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';

export default function Noteitem(props) {
  const {note,update,updateIndex}=props;
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const [delModal,setDelModal]=useState(false);
  const originalDate = note.date;
    const dateObject = new Date(originalDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    const formattedDateTime = `${day}-${month}-${year}`;
  const modalToggle = ()=>{
    setDelModal(delModal?false:true);
    updateIndex();
  }
  
  return (
    <>
      {/* // */}
       <div className="bg-teal-200 mx-8 border-2 shadow-md border-dashed ring-offset-black border-teal-100 relative mb-2 sm:mb-3 md:mb-5 lg:mb-6 xl:mb-8 p-4 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <h3 className="text-xl font-semibold mb-1">{note.title}</h3>
        <p>{note.description}</p>
        <p className='absolute right-2 bottom-1 text-sm text-gray-700 font-semibold'>{formattedDateTime}</p>
        <i className="fa-solid fa-trash fa-lg mt-5 cursor-pointer" onClick={modalToggle}></i>
        <i className="fa-solid fa-pen-to-square fa-lg absolute right-1 top-3 cursor-pointer" onClick={()=>{update(note._id,note.title,note.description,note.tag)}}></i>
      </div>

      <div className={`fixed top-0 left-0 w-full h-full  flex items-center justify-center ${delModal ? '' : 'hidden'}`}>
      <div className="modal-container">
        <div className="modal-content bg-white p-6 rounded-lg border-solid border-2 border-grey shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete this note?</p>
        
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none mr-2"
                onClick={()=>{deleteNote(note._id)}}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none"
                onClick={modalToggle}
              >
                Cancel
              </button>
            </div>
      
            </div>
      </div>
    </div>
      {/* // */}
    </>
  )
}
