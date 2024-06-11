import React, { useState, useEffect } from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import "./App.css";

import Solve from './Pages/Solve';
import Navbar from './Pages/navbar';

function App() {
  return (
     <>
        <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path = "/" element = {<Solve/>}/>
        </Routes>
      </BrowserRouter>
     </>
  )
}

export default App;