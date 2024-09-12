import React,{useContext,useEffect,useState} from 'react'
import Addnote from './Addnote'
import Noteitem from './Noteitem'
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';


export default function Notes(props) {
  const navigate = useNavigate();
  const {updateIndex} = props;
  const context = useContext(noteContext);
  const {notes,getNotes,updateNote,loadingState} = context;

  const [modalClick,setModalClick]=useState(false)
  const clickedModal = ()=>{
    setModalClick(modalClick?false:true);
    updateIndex();
  }
  const [editNote,setEditNote]=useState({id:'',title: '',description: '',tag: '',});
  const update =(id,title,description,tag)=>{
    setEditNote({id,title,description,tag});
    clickedModal();
  }
  const handleChange=(e)=>{
    setEditNote({...editNote,[e.target.name]:e.target.value})
  }

  const handleSave = ()=>{
    updateNote(editNote.id,editNote.title,editNote.description,editNote.tag);
    clickedModal();
  }

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  },)

  return (
    <div className=' container mx-auto my-9'>
      <Addnote/>
      {/* {loadingState && <Loader/>} */}
      <div className=' my-10 '>
      <h1 className="text-2xl font-semibold mx-8 mb-4" style={{fontSize:"30px"}}>Your Notes</h1>
      <div className="container mx-auto flex flex-wrap">
      {notes.length===0 && <div className='ml-9'>No notes to display</div>}
      {notes.map((note)=>{
        return <Noteitem key={note._id} update={update} updateIndex={updateIndex} note={note} />
      })}
      </div>
      </div>

      {/* ?????? */}
      <form onSubmit={handleSave}>
      <div className={`fixed top-0 z-50 left-0 w-full h-full flex items-center justify-center ${modalClick ? '' : 'hidden'}`}>
      <div className="modal-container  relative">
        <div className="modal-content xl:w-96 lg:w-96 md:w-96 sm:w-80 w-64 border-gray border-solid border-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editNote.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
              // placeholder="Enter the note title"
              required
              minLength={5}

            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600 mb-1">
              Description
            </label>
            <input
              id="description"
              name="description"
              value={editNote.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
              // placeholder="Enter the note description"
              required
              minLength={5}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-gray-600 mb-1">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={editNote.tag}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
              // placeholder="Enter tags"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              // onClick={handleSave}
              className=" bg-gray-800 text-white font-semibold py-2 rounded-lg hover:ring focus:outline-none px-4 mr-2"
            >
              Save
            </button>
            <i className="fa-solid absolute top-5 right-1 fa-circle-xmark fa-2xl cursor-pointer" onClick={clickedModal}></i>
          </div>
        </div>
      </div>
    </div>
    </form>
      {/* ?????? */}
    </div>
  )
}
