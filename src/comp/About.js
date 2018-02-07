import React, { Component } from 'react';
import './About.css'

class About extends Component {
  constructor(props){
    super(props);
          this.homePage = this.homePage.bind(this);
  }

    
    homePage(){
        this.props.changePage(1);
        this.props.panelButton();
    }

  render() {
    return (
      
      <div>
        <p><span className="alex">Alex</span> is an aspiring UI/UX Designer with a focus on delivering <br/>
        simple and delightful user experiences<br/>
        utilizing principles of user-centered content with the usability design.</p>
        <div className="us"></div>
        <button className="goBack" onClick={this.homePage}>Go Back</button>

        
        <p><span className="ben">Ben</span> is an expert Front-end User with a focus on consuming digital content everyday<br/>
        He likes simple and easy UI<br/>
        Ben likes baozi</p>
      </div>
        
    );
  }
}

export default About;
