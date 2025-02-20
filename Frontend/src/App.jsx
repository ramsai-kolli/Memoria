import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from "./home.jsx";
import Register from "./register.jsx";
import Login from "./login.jsx";
import Login2 from "./login2.jsx";
function App() {
   

  return (
    <>
      <BrowserRouter>
         <Routes>
             <Route path='/' element={<Home/>} />
             <Route path='/home1' element={<Register/>} />
             <Route path='/home2' element={<Login/>} />
             <Route path='/home3' element={<Login2/>} />
          </Routes>      
      </BrowserRouter>
      
    </>
  )
}

export default App
