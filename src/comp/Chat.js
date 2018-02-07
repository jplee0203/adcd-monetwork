import React, { Component } from 'react';
import './Chat.css';
import mySocket from 'socket.io-client';

const styles = {
    transition: 'all 1s ease-out'
};

class Chat extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            myname:"",
            mode:0,
            allnames:[],
            allmsgs:[],
            mymsg:[],
            showUser:true,

        }
        
        this.joinChat = this.joinChat.bind(this);
        this.joinChatKey = this.joinChatKey.bind(this);
        this.handleName= this.handleName.bind(this);
        this.handleMyMsg= this.handleMyMsg.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.sendMsgKey = this.sendMsgKey.bind(this);
        this.showPanel = this.showPanel.bind(this);
        this.changeColor= this.changeColor.bind(this);
         
        }
    
    
changeColor(){
    // change header color 
    
        if(!document.getElementById("showUser")){
        return false;
    }
        var rgb = 10;
        var r = 0;
        var g = 0;
        var b = 0;

        rgb = Math.round(Math.random()*255);
        r = Math.round(Math.random()*255);
        g = Math.round(Math.random()*255);
        b = Math.round(Math.random()*255);
        document.getElementById("showUser").style.backgroundColor = "rgb("+r+","+g+","+b+")"; 
        document.getElementById("showUser").style.transition = "background-color 3s";



       
    
    
}

 componentWillUnmount(){
     clearInterval(this.changeBg);
 }






 showPanel() {
     if(this.state.showUser == true){
        this.setState({
        showUser:false
    });  
        document.getElementById("panel").style.right=0;
        document.getElementById("panel").style.transition = "all 1s"; 
        document.getElementById("chattingBox").style.width="80%";
        document.getElementById("chattingBox").style.transition = "all 1s";  
     } else {
        this.setState({
        showUser:true
        });  
        document.getElementById("panel").style.right="-20%";
        document.getElementById("panel").style.transition = "all 1s"; 
        document.getElementById("chattingBox").style.width="100%";
        document.getElementById("chattingBox").style.transition = "all 1s"; 
         
     }
    
    
    } 
    
 showMsgBox() {
     if(this.state.showMsg == true){
        this.setState({
        showMsg:false
    });  
        
     } else {
         this.setState({
        showMsg:true
    });  
         
         
     }
    
    
    }     
       
componentDidMount(){  
 this.inputFocus.focus();
}

sendMsg(){
     if(this.state.mymsg != ""){    
        var msg = this.state.myname+": " + this.state.mymsg;
        this.socket.emit("sendmsg", msg);
      }     
}    
 
    
joinChatKey(e){
    if(e && e.keyCode == 13){  
      this.joinChat()
        
        
    }
}    
    
sendMsgKey(e){
    if(e && e.keyCode == 13){  
      this.sendMsg()  
    }
}     
    
 
    
     
joinChat(){
      if(this.state.myname != ""){
          document.getElementById("container").style.backgroundImage = "url('http://jplee.ca/wp-content/uploads/2017/06/bg_2.png')";
          document.getElementById("container").style.backgroundSize = "93%"
        this.setState({
            mode:1,
        })

        this.socket = mySocket("http://localhost:10001");
        this.socket.emit("uname", this.state.myname);
        this.socket.on("names",(data)=>{
            this.setState({
            allnames:data
            });
            this.socket.on("msgs", (data)=>{
             this.setState({
               allmsgs:data
             })

                })
        });
         this.changeBg = setInterval(this.changeColor, 3000); 
  }
}
    
    handleName(evt){
        this.setState({
           myname:evt.target.value
         }) }  
    handleMyMsg(evt){
        this.setState({
           mymsg:evt.target.value
        }) }   
    
  render() {
    
        var comp = null;
        var loginPage = null;
        var userList = null;
      
    if(this.state.mode === 0){ 
        loginPage = (
        <div className="loginBox">         
            <div className="loginBox_inside">
                <input className="loginInp" type="text" placeholder="name" onChange={this.handleName} onKeyUp={this.joinChatKey} ref={(titleInput) => { this.inputFocus = titleInput; }}/>
                <button className="loginBut" onClick={this.joinChat}>Join</button>
            </div>
        </div>        
        )
      } else if(this.state.mode === 1){
          
        var allmsgs = this.state.allmsgs.map((obj, i)=>{
          return(
            <div key={i}>
               {obj}
            </div>
          )
        })
   
        comp = ( 
            <div className="chattingBox" id="chattingBox">
                <div className="chattingBox_display"> 
                  <div className="chattingMsg">
                  {allmsgs} 
                  </div>  
                </div>    
                <div className="chattingBox_sending">
                 <div className="chattingBox_sendingMsg">
                   <input className="chattingMsgInp" type="text" placeholder="Enter Your Message" onChange={this.handleMyMsg} onKeyUp={this.sendMsgKey} ref={(msgInput) => { this.newInput = msgInput; }}/>
                   <button className="chattingMsgBut" onClick={this.sendMsg}>Send</button>
                 </div>
                </div>
            </div>
        ); 
             
        var allnames = this.state.allnames.map((obj, i)=>{
              return(
                  <div key={i}>   
                   {obj}
                  </div>
              )
        })
    
        userList = (
            <div className="userListPanel" id="panel">
              <div className="panelList_username">
                 <p className="panelList_text">People who are online</p> 
              </div>
              <div className="allusersDisplay">   
               {allnames}
              </div>

              <div id="showUser" className="showUser" onClick={this.showPanel}>
              </div>
            </div>  
         ) 
          
      } 
      
      
      
  
  
    return (
      
      <div className="container" id="container">
        {loginPage}
        {comp}
        {userList} 
       </div>
    );
  }
}

export default Chat;