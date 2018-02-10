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
            size:0
           
        }
        
        this.joinChat = this.joinChat.bind(this);
        this.joinChatKey = this.joinChatKey.bind(this);
        this.handleName= this.handleName.bind(this);
        this.handleMyMsg= this.handleMyMsg.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.sendMsgKey = this.sendMsgKey.bind(this);
        this.showPanel = this.showPanel.bind(this);
        this.changeColor= this.changeColor.bind(this);
       this.changeSize= this.changeSize.bind(this);
        }
 changeSize() {  
     this.state.size++;
     var displaySize = document.getElementById("chattingBox");
      var sizeSet = document.getElementById("chattingMsgSet");
     if(this.state.size === 1){
        displaySize.style.height="40%"; 
     } else if (this.state.size === 2){
        displaySize.style.height="60%"; 
     } else if (this.state.size === 3){
        displaySize.style.height="80%"; 
     } else if (this.state.size === 4){
        displaySize.style.height="100%"; 
        sizeSet.innerHTML = "-"
     } else if (this.state.size === 5){
        displaySize.style.height="20%"; 
        this.state.size = 0;
        sizeSet.innerHTML = "+"
         
     } 
      console.log(this.state.size)
 
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

componentDidUpdate(){
  document.getElementById("chattingMsg").scrollTop = document.getElementById("chattingMsg").scrollHeight;
  this.newInput.focus(); 
 }




 showPanel() {
     if(this.state.showUser == true){
        this.setState({
        showUser:false
    });  
        document.getElementById("panel").style.right=0;
        document.getElementById("panel").style.transition = "right 1s"; 
        document.getElementById("chattingBox").style.width="80%";
        document.getElementById("chattingBox").style.transition = "width 1s";  
     } else {
        this.setState({
        showUser:true
        });  
        document.getElementById("panel").style.right="-20%";
        document.getElementById("panel").style.transition = "right 1s"; 
        document.getElementById("chattingBox").style.width="100%";
        document.getElementById("chattingBox").style.transition = "width 1s"; 
         
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
        document.getElementById("chattingMsgInp").value=""; 
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
         
          this.props.menuDisplay(true);
          document.getElementById("chattingBox").style.display="block";
          
          document.getElementById("container").style.backgroundImage = "url('http://jplee.ca/wp-content/uploads/2017/06/bg_2.png')";
          document.getElementById("container").style.backgroundSize = "93%"
        this.setState({
            mode:1,
        })

        this.socket = mySocket("https://adcd-monetwork-socket.herokuapp.com/");
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
        <div className="speech-box">  
              <div className="speech-img">
            </div> 
            <div key={i} className="speech-bubble">
               {obj}
            </div>
        </div>
          )
        })
           
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
        
            <div className="chattingBox" id="chattingBox">
                <div className="chattingBox_display"> 
                  <div className="chattingMsg" id="chattingMsg">
                  {allmsgs} 
                  </div>  
                </div>    
                <div className="chattingBox_sending">
                 <div className="chattingBox_sendingMsg">
                   <input className="chattingMsgInp" id="chattingMsgInp" type="text" placeholder="Enter Your Message" onChange={this.handleMyMsg} onKeyUp={this.sendMsgKey} ref={(msgInput) => { this.newInput = msgInput; }}/>
                   <button className="chattingMsgBut" onClick={this.sendMsg}>Send</button>
                   <button className="chattingMsgSet" id="chattingMsgSet" onClick={this.changeSize}>+</button>
                 </div>
                </div>
            </div>

        {userList} 
       </div>
    );
  }
}

export default Chat;