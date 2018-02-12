import React, { Component } from 'react';
import './Maze.css';
import mySocket from "socket.io-client";

class Maze extends Component {
    constructor(props){
        super(props);
        this.state={
            myImg: require("./img/img1.png"),
            myImg2: require("./img/img2.png"),
            myImg3: require("./img/img3.png"),
            allUsers:[],
            myId: null,
            countUser:0        }
        
        this.handleImage = this.handleImage.bind(this);
        this.mouseHoverWin = this.mouseHoverWin.bind(this);
        this.mouseHoverEnd = this.mouseHoverEnd.bind(this);
        this.hoverStart = this.hoverStart.bind(this);
        this.hoverInfo2 = this.hoverInfo2.bind(this);
        this.hoverInfo1 = this.hoverInfo1.bind(this);
    }
    /* Start */
    mouseHoverEnd(){
   
       document.getElementById("App").removeChild(document.getElementById("display"));
      alert('Try Again');
        this.refs["u"+this.state.myId].src = this.state.myImg3; 
        this.props.menuDisplay(true);
    }
    /* End */
    mouseHoverWin(){
   
     alert('You WIN!');
           this.props.menuDisplay(true);
    
    }
    
 componentWillUnmount(){ 
 }
    
    hoverInfo1(){
        document.getElementById("selections_p").innerHTML = "The Chinese Lunar Exploration Program, also known as the Chang'e program after the Chinese moon goddess Chang'e, is an ongoing series of robotic Moon missions by the China National Space Administration (CNSA).";
    }
    hoverInfo2(){
        document.getElementById("selections_p").innerHTML = "Sputnik is a major new media brand with modern multimedia centers in dozens of countries. Sputnik is uniquely positioned as a provider of alternative news content and as a radio broadcaster.";
        
    }
    
    componentDidMount(){
        this.socket = mySocket("https://lab05socket.herokuapp.com/");
        
        this.socket.on("userjoined", (data)=>{
            this.setState({
                allUsers: data
            }); 
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myId: data
            });
        });
        
        this.socket.on("newmove", (data)=>{
            this.refs["u"+data.id].style.left = data.x+"px"; 
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
        });
        
        this.refs.theDisplay.addEventListener("mousemove", (ev)=>{
            if(this.state.myId === null){
                //FAIL
                return false;
            }
            
            this.refs["u"+this.state.myId].style.left = ev.pageX+"px";
            this.refs["u"+this.state.myId].style.top = ev.pageY+"px";
            
            
            this.socket.emit("mymove", {
                x: ev.pageX,
                y: ev.pageY,
                id: this.state.myId,
                src: this.refs["u"+this.state.myId].src
            });
        });       
    }
    
    handleImage(evt){
        this.refs["u"+this.state.myId].src = evt.target.src;  
       document.getElementById("selections_p").style.display="none";
        document.getElementById("selections_h").style.display="none"; 
        document.getElementById("img1").style.display="none"; 
        document.getElementById("img2").style.display="none";
        document.getElementById("hoverStart").style.display = "block";
    
//          document.getElementById("App").removeChild(document.getElementById("controls"));  
        
//            this.state.countUser++;
//        if(this.state.countUser === this.state.allUsers.length){
//        }
//         console.log(this.state.countUser);
//            console.log("arr: "this.state.allUsers.length);
//            
    }
    
    hoverStart(){
    
    document.getElementById("controls").style.display="none"; 
        
        
        
    }
    

    
    render() {
   
        var allimgs = this.state.allUsers.map((obj, i)=>{
            return(
                <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={50} key={i} />   
            );
        });
        
        return (
<div className="mazeApp" id="App">
       
    <div ref="theDisplay" id="display">

       <div className="gameDisplay" id="gameDisplay">

            <div onMouseOver={this.mouseHoverEnd} id="divBody"></div>
            <div id="div1" className="maze"></div>
            <div id="div2" className="maze"></div>
            <div id="div3" className="maze"></div>
            <div id="div4" className="maze"></div>
            <div id="div5" className="maze"></div>
            <div id="div6" className="maze"></div>
            <div id="div7" className="maze"></div>
            <div id="div8" className="maze"></div>
            <div id="div9" className="maze"></div>
            <div id="div10" className="maze"></div>
            <div id="div11" className="maze"></div>
            <div id="div12" className="maze"></div>
            <div id="div13" className="maze"></div>
            <div id="div14" className="maze"></div>
            <div id="div15" className="maze"></div>
            <div id="div16" className="maze"></div>
            <div id="div17" className="maze"></div>
            <div id="div18" className="maze"></div>
            <div id="div18" className="maze"></div>
            <div id="div19" className="maze"></div>
            <div id="div20" className="maze"></div>
            <div id="div21" className="maze"></div>
            <div id="div22" className="maze"></div>
            <div id="div23" className="maze"></div>
            <div id="div24" className="maze"></div>
            <div id="div25" className="maze"></div>
            <div id="div26" className="maze"></div>
            <div id="div27" className="maze"></div>
            <div id="div28" className="maze"></div>
            <div id="div29" className="maze"></div>
            <div id="div30" className="maze"></div>
            <div id="divEnd" onMouseOver={this.mouseHoverWin} className="maze"></div>

            <div id="controls">
               

                <div className="selections" id="selections">

                   <div className="selections_img" id="selections_img">
                        <h1 className="selections_h" id="selections_h">Choose your Space Shuttle</h1>    
                        <img src={this.state.myImg} onMouseOver={this.hoverInfo1} className="img1" id="img1" height={100} onClick={this.handleImage} />
                        <img src={this.state.myImg2} onMouseOver={this.hoverInfo2} className="img2" id="img2" height={130} onClick={this.handleImage} />
                        <p className="selections_p" id="selections_p"> </p>
                        <div className="hoverStart" id="hoverStart" onMouseOver={this.hoverStart}><p className="hoverP">Hover here to get READY</p></div>

                   </div>          
               </div>
            </div>
        </div>
    {allimgs}
    </div>
          
</div>
        );
    }
}

export default Maze;
