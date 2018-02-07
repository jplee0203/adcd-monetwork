import React, { Component } from 'react';
import './App.css';
import Chat from './comp/Chat';
import About from './comp/About';

class App extends Component {
    
      constructor(props){
         super(props);
          this.state = {
            changePages:1,
            panelButton: true
          
        }

         this.changePage = this.changePage.bind(this);
         this.aboutPage = this.aboutPage.bind(this);
         this.panelButton = this.panelButton.bind(this);
     }
    
changePage(bool){
        //changes the state for changePages
        var arg = bool;
        this.setState({changePages:arg})
    }
aboutPage(){
    this.setState({changePages:2});
    
    this.panelButton();
}
    

panelButton(){
    if(this.setState.panelButton == true){
        this.setState({panelButton:false})
        
    }
    
    else(
         this.setState({panelButton:true})
    )
}
    

  render() {
   
      var pageDisplay = null;
        if(this.state.changePages == 1){
              pageDisplay = (
              <Chat panelButton={this.state.panelButton}/>
              )
        }else if(this.state.changePages == 2){
             pageDisplay = (
              <About changePage={this.changePage} panelButton={this.panelButton}/>
              ) 
        }
      
    return (
      <div className="App">
       <div className="App-title">
          <h1 >Welcome to Alex and Ben's Landing Page</h1>
         </div>
     <div className="App-display">
                 {pageDisplay}
        <button className="about" onClick={this.aboutPage}>ABOUT</button>
      </div>
  
      </div>
   
    );
  }
  

}


 //test
export default App;
