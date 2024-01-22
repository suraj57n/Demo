// src/App.js
import React from 'react';
import MyComponent from './Map';
import Createplan  from './Createplan';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import S2 from './S2'
import S3 from './S3'
import s4 from './S4'
import SK from './ka';
import Navbar from './Navbar';
import S4 from './S4';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Createplan />} />
        <Route path="/maps" element={<MyComponent   />} />
        <Route path="/s2" element={<S2/>}/>
        <Route path="/s3" element={<S3/>}/>
        <Route path="/s4" element={<S4/>}/>
        <Route path="/k" element={<SK/>}/>
    </Routes>
</BrowserRouter>
  );
}

export default App;
