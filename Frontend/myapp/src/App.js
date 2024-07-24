import React, { useState, useEffect } from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import "./App.css";

import Solve from './Pages/Solve';
import Navbar from './Pages/navbar';
import Problems from './Pages/Problems';

function App() {
  return (
     <>
        <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path = "/solve" element = {<Solve/>}/>
          <Route path = "/problems" element = {<Problems/>}/>
        </Routes>
      </BrowserRouter>
     </>
  )
}

export default App;