import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Alert from './components/Alert';
import Home from './components/Home'
// import About from './components/About'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Profile from './components/Profile';
import { useState } from 'react';

function App() {
  const [alert,setAlert]=useState(false);
  const showAlert=(status,message)=>{
    setAlert({status,message});
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }
  return (
    <>
    <NoteState>
    <Router>
      <div className='bg-grey-200'>
    <Navbar/>
    <Alert alert={alert} setAlert={setAlert} />
    <div>
      <Routes>
        <Route path='/'element={<Home/>} />
        <Route exact path='/login'element={<Login showAlert={showAlert}/>} />
        <Route exact path='/signup'element={<Signup showAlert={showAlert} />} />
        {/* <Route exact path='/about'element={<About  />} /> */}
        <Route exact path='/profile'element={<Profile/>} />
      </Routes>
    </div>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
