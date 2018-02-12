import React, { Component } from 'react';
import './App.css';
import Chat from './comp/Chat';
import About from './comp/About';
import Maze from './comp/Maze';

class App extends Component {
    
      constructor(props){
         super(props);
          this.state = {
            changePages:1,
          
            menuDisplays: false
        }

         this.changePage = this.changePage.bind(this);
         this.aboutPage = this.aboutPage.bind(this);
        
         this.menuDisplay = this.menuDisplay.bind(this);
         this.chatPage = this.chatPage.bind(this);
         this.homePage = this.homePage.bind(this);
         this.mazePage = this.mazePage.bind(this);
     }
    
changePage(bool){
    
        var arg = bool;
        this.setState({changePages:arg})
    }
    
menuDisplay(bool){
        var arg = bool;
        this.setState({menuDisplays:arg})
    }  

    

    
homePage(){
    this.setState({changePages:1});
      this.setState({menuDisplays:0});
     this.setState({ modes:0});
}    
chatPage(){
    this.setState({changePages:1});
  
}  
aboutPage(){
    this.setState({changePages:3});
}
mazePage(){
    this.setState({changePages:4});
//     this.setState({menuDisplays:0});
}

  render() {
      
       var menuShow = null;
      
      if(this.state.menuDisplays === true){ 
        menuShow = ( 
         <div className="App-menu">
               <div className="App-menuButs">

                <button className="Menu-But" onClick={this.chatPage}>CHAT</button>
                <button className="Menu-But" onClick={this.aboutPage}>ABOUT</button>    
                <button className="Menu-But" onClick={this.mazePage}>GAME</button>    
         </div>
             </div>
             ) 
         } 
      
      var pageDisplay = null;
        if(this.state.changePages == 1){
              pageDisplay = (
              <Chat 
                    menuDisplay={this.menuDisplay}
                 />
              )
        }else if(this.state.changePages == 3){
             pageDisplay = (
              <About changePage={this.changePage}/>
              ) 
        }else if(this.state.changePages == 4){
            pageDisplay= (
            <Maze changePage={this.changePage}
                 menuDisplay={this.menuDisplay}/>
                )
        }
      
    return (
      <div className="App">
       <div className="App-title">
          <h1 >Welcome to Alex and Ben's Landing Page</h1>
         </div>
         {menuShow}
     <div className="App-display">
                 {pageDisplay}
    
      </div>
  
      </div>
   
    );
  }
  

}


 //test
export default App;
