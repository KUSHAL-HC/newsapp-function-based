import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Newscomponent from './components/News'
import {BrowserRouter as Router,Route, Routes,Link } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";



export class App extends Component {
  pageSize=15;
  state={
    progress:0
  }
  setProgress =(progress) =>{
      this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
            <Navbar></Navbar>
            <LoadingBar
              color="#f11946"
              height={3}
              progress={this.state.progress}
      
            />
            <Routes>
               <Route path='/' element={<Newscomponent setProgress={this.setProgress} component pageSize={this.pageSize} country="us" category="general"/>}/>
               <Route path='/business' element={<Newscomponent setProgress={this.setProgress} component pageSize={this.pageSize} country="us" category="business"/>}/>
               <Route path='/entertainment' element={<Newscomponent setProgress={this.setProgress} component pageSize={this.pageSize} country="us" category="entertainment"/>}/>
               <Route path='/general' element={<Newscomponent setProgress={this.setProgress} component pageSize={this.pageSize} country="us" category="general"/>}/>
               <Route path='/health' element={<Newscomponent setProgress={this.setProgress} component pageSize={this.pageSize} country="us" category="health"/>}/>
               <Route path='/science' element={<Newscomponent setProgress={this.setProgress} component pageSize={this.pageSize} country="us" category="science"/>}/>
               <Route path='/sports' element={<Newscomponent setProgress={this.setProgress} component pageSize={this.pageSize} country="us" category="sports"/>}/>
               <Route path='/technology' element={<Newscomponent setProgress={this.setProgress} component pageSize={this.pageSize} country="us" category="technology"/>}/>
            </Routes>
        </Router>
       
      </div>
    )
  }
}

export default App
