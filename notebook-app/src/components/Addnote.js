import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/NoteContext';

export default function Addnote() {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [noteData, setNoteData] = useState({title: '',description: '',tags: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData({ ...noteData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(noteData);
    setNoteData({title: '',description: '',tags: ''});
  };

  return (
    <div className=" mx-2 mt-20 p-10 bg-white rounded-lg border-solid border-2 border-grey shadow-lg">
      <div className='container mx-auto'>
      <h1 className="text-2xl font-semibold mb-4" style={{fontSize:"30px"}}>Add a Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={noteData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
            placeholder="Enter the note title"
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
            value={noteData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
            placeholder="Enter the note description"
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
            value={noteData.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
            placeholder="Enter tags"
          />
        </div>
        <div className="mb-0">
          <button
            type="submit"
            className="w-40 bg-gray-800 text-white font-semibold py-2 rounded-lg hover:ring focus:outline-none"
          >
            Add Note
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
