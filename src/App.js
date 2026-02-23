import React,{useState} from 'react'
import Navbar from './components/Navbar'
import Newscomponent from './components/News'
import {BrowserRouter as Router,Route, Routes,Link } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";


const  App = ()=>{
  const pageSize=15;
  const [progress, setProgress] = useState(0);
  
    return (
      <div>
        <Router>
            <Navbar></Navbar>
            <LoadingBar
              color="#f11946"
              height={3}
              progress={progress}
      
            />
            <Routes>
               <Route path='/' element={<Newscomponent setProgress={setProgress} component pageSize={pageSize} country="us" category="general"/>}/>
               <Route path='/business' element={<Newscomponent setProgress={setProgress} component pageSize={pageSize} country="us" category="business"/>}/>
               <Route path='/entertainment' element={<Newscomponent setProgress={setProgress} component pageSize={pageSize} country="us" category="entertainment"/>}/>
               <Route path='/general' element={<Newscomponent setProgress={setProgress} component pageSize={pageSize} country="us" category="general"/>}/>
               <Route path='/health' element={<Newscomponent setProgress={setProgress} component pageSize={pageSize} country="us" category="health"/>}/>
               <Route path='/science' element={<Newscomponent setProgress={setProgress} component pageSize={pageSize} country="us" category="science"/>}/>
               <Route path='/sports' element={<Newscomponent setProgress={setProgress} component pageSize={pageSize} country="us" category="sports"/>}/>
               <Route path='/technology' element={<Newscomponent setProgress={setProgress} component pageSize={pageSize} country="us" category="technology"/>}/>
            </Routes>
        </Router>
       
      </div>
    )
}

export default App
