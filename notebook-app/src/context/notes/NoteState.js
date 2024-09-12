import React,{useState} from 'react'
import NoteContext from './NoteContext'
import axios from 'axios'

export default function NoteState(props) {
    const host = process.env.REACT_APP_LINK;
    const notesInitial = [];
    const [notes,setNotes]=useState(notesInitial);
    const [loadingState,setLodingState]=useState(false);
    
    //Get all notes
    const getNotes = async()=>{
      setLodingState(true);
      const url = `${host}/api/notes/fetchallnotes`;
      const headers = {
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      }
      const response = await axios.get(url,{headers});
      // console.log(response.data);
      // eslint-disable-next-line
      const json = await response.data;
       setNotes(json);
      setLodingState(false);
    }

    //Add a Note
    const addNote = async({title,description,tag})=>{
      setLodingState(true);
      const url = `${host}/api/notes/addnote`;
      const headers = {
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      }
      const requestBody = {title,description,tag}
      const response = await axios.post(url,requestBody,{headers});
      // eslint-disable-next-line
      const json = await response.data;
      // console.log(response.data);
      setLodingState(false);
    }
    //Delete a note 
    const deleteNote = async(id)=>{
      setLodingState(true);
      const url = `${host}/api/notes/deletenote/${id}`;
      const headers = {
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      }
      const response = await axios.delete(url,{headers});
      // eslint-disable-next-line
      const json = await response.data;
      setLodingState(false);
    }
    //Edit a note
    const updateNote = async(id,title,description,tag)=>{
      setLodingState(true);
      const url = `${host}/api/notes/updatenote/${id}`;
      const headers = {
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      }
      const requestBody = {title,description,tag};
      const response = await axios.put(url,requestBody,{headers});
      // eslint-disable-next-line
      const json = await response.data;
      setLodingState(false);
    }

  return (
    <NoteContext.Provider value={{notes,getNotes,addNote,deleteNote,updateNote,loadingState}}>
      {props.children}
    </NoteContext.Provider>
  )
}
