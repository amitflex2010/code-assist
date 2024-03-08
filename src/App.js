import logo from './logo.svg';
import React from 'react'
import './App.css';
import Headers from './HeaderSection/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import BuildCode from './HomeRouter/Routeings';
import HelpmeCodes from './HomeRouter/HelpmeCode';
import ModifyCode from './HomeRouter/ModifyCode';
import TranslateCode from './HomeRouter/TranslateCode';
import HelpCode from './HomeRouter/HelpCode';
import Routeing from './HomeRouter/Routeings';
import Buildingcode from './HomeRouter/BuildCode';


function App() {
  return (
    <div className="App">
    <header className='headingsection'>
     <Headers/>
     </header> 
    <div className='Contentsection'>
    
     <BrowserRouter>
     <Routeing/>
      <Routes>
      <Route exact path='/' element={<Buildingcode/>}/>
       <Route path='/Build' element={<Buildingcode/>}/> 
       <Route path='/Help' element={<HelpmeCodes/>} />
       <Route path='/Modify' element={<ModifyCode/>} />
       <Route path='/testcode' element={<HelpCode/>} />
       <Route path='/translate' element={<TranslateCode/>} />
       <Route path='/Claim' element={<Buildingcode/>}/>
       <Route path='/Eligibility' element={<Buildingcode/>}/>
       <Route path='/Providers' element={<Buildingcode/>}/>
       <Route path='/Other' element={<Buildingcode/>}/>

      </Routes>
     </BrowserRouter>

     
     </div>
     

     
    </div>
  );
}

export default App;
