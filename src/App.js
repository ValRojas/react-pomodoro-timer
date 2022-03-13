import React from 'react';
import './App.css';

class SessionLength extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      session: 25,
      breaks: 5,
      minutes: 25,
      seconds: 0,
      breaker: 0,
      alarmColor: { color: "#FFFFFF" },
      sessionBreak: "Session"
    }
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.Increment = this.Increment.bind(this)
    this.Decrement = this.Decrement.bind(this)
    this.clockRender = this.clockRender.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.counter = this.counter.bind(this)
  }

   //breaks
  Increment(){
    if(this.state.breaks == 60){
      this.setState (state => ({
        breaks: 60
     }))
    }else{
      this.setState (state => ({
        breaks: state.breaks + 1
      }))
    }    
  }
  Decrement(){
    if(this.state.breaks <= 1){
      this.setState (state => ({
        breaks: 1
      }))
    }else{
      this.setState (state => ({
        breaks: state.breaks - 1
      }))
    }
  }

  //sessions
  handleIncrement(){
    if(this.state.session == 60){
      this.setState (state => ({
        session: 60,
        minutes: 60
     }))
    }else{
      this.setState (state => ({
        session: state.session + 1,
        minutes: state.minutes + 1
      }))
    }
  }
  handleDecrement(){
    if(this.state.session <= 1){
      this.setState (state => ({
        session: 1,
        minutes: 1
      }))
    }else{
      this.setState (state => ({
        session: state.session - 1,
        minutes: state.minutes - 1
      }))
    }
  }
  
  //handlers
  handleStart(){
    this.s = setInterval(this.counter, 1000)
    document.getElementById('start_stop').disabled=true;
    document.getElementById('session-decrement').disabled=true;
    document.getElementById('session-increment').disabled=true;
    document.getElementById('break-increment').disabled=true;
    document.getElementById('break-decrement').disabled=true;
  }
  handleStop(){
    clearInterval(this.s);
    document.getElementById('start_stop').disabled=false;
  }
  handleReset(){
    clearInterval(this.s);
    this.setState(state=>({
      session: 25,
      breaks: 5,
      minutes: 25,
      seconds: 0,
      breaker: 0,
      alarmColor: { color: "#FFFFFF" },
      sessionBreak: "Session"
    }))
    document.getElementById('start_stop').disabled=false;
    document.getElementById('session-decrement').disabled=false;
    document.getElementById('session-increment').disabled=false;
    document.getElementById('break-increment').disabled=false;
    document.getElementById('break-decrement').disabled=false;
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }   
  
  //timer
  counter(){
    if(this.state.seconds == 0){
      this.setState(state =>({
      seconds: 59,
      minutes: state.minutes - 1,
      breaker: this.state.breaker + 1,
      }))
    }else{
      this.setState(state =>({
      seconds: state.seconds - 1,
      }))
    } //contador
    if(this.state.sessionBreak == "Session"){
      if(this.state.session == 1 || this.state.seconds == 0 && this.state.minutes == 1){
        this.setState(state =>({alarmColor: { color: "#FF0000" },}))
      }
    } //red alarmt text
    
    if(this.state.seconds == 0 && this.state.minutes == 0){
      if(this.state.breaker == 5){
        this.setState(state =>({
          minutes: this.state.session,
          seconds: 0,
          breaker: 0,
          sessionBreak: "Session",
          alarmColor: { color: "#FFFFFF" },
        }))
      }else{
        this.setState(state =>({
          breaks: state.breaks - 1,
          minutes: 5,
          seconds: 0,
          breaker: 0,
          sessionBreak: "Break",
          alarmColor: { color: "#FFFFFF" },
        }))
      }
    } //break vs session
    
    if(this.state.breaks == 0){
      this.setState(state =>({
          sessionBreak: "Finished :D",
          minutes: 0,
          seconds: 0,
        }))
      this.audioBeep.play();
      clearInterval(this.s);
    } //end
  }
  clockRender(){
    let min = this.state.minutes <= 0 ? this.state.minutes = 0: 
    this.state.minutes <10 && this.state.minutes > 0? "0" + this.state.minutes:
    this.state.minutes
    
    let sec = this.state.seconds < 10? "0" + this.state.seconds: this.state.seconds;
    
    if(this.state.minutes == 0){
      min = "0" + this.state.minutes
    }
    
    return min + ":" + sec;
  }
  render(){    
    let breakLength = this.state.breaks <= 0? this.state.breaks = 0 :
    this.state.breaks > 60? this.state.breaks = 60:
    this.state.breaks
    let sessionLength = this.state.session <= 1? this.state.session = 1 : this.state.session > 60? this.state.session = 60: this.state.session;
    
    return(
      <div class="elements">
        <div id="container">
          <div class="text" id="break-label">
            <p id="displayed"><strong>Break Length</strong></p>
            <div id="button-cont">
              <button id="break-decrement" onClick={this.Decrement}>-</button>
              <p id="break-length">{breakLength}</p>
              <button id="break-increment" onClick={this.Increment}>+</button>
            </div>
          </div>
          <div class="text" id="session-label">
            <p id="displayed"><strong>Session Length</strong></p>
            <div id="button-cont">
              <button id="session-decrement" onClick={this.handleDecrement}>-</button>
              <p id="session-length">{sessionLength}</p>
              <button id="session-increment" onClick={this.handleIncrement}>+</button>
            </div> 
          </div>
        </div>
        
        <div id="counter-display">
          <div id="timer-label" style={this.state.alarmColor}>{this.state.sessionBreak}</div>
          <div id="time-left" style={this.state.alarmColor}>
            <audio preload="auto" ref={(audio) => {this.audioBeep = audio;}} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" id="beep"/>
            {this.clockRender()}
          </div>
          
          <div>
            <button id="start_stop" style={{fontSize: 18}} onClick={this.handleStart}>►</button>
            <button id="start_stop" style={{fontSize: 18}} onClick={this.handleStop}><strong>||</strong></button>
            <button id="reset" style={{fontSize: 19}} onClick={this.handleReset}><strong>⟳</strong></button>
          </div>
          
        </div>
      </div>
    )
  }
}


class App extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <SessionLength/>
        
      </div>
    )
  }
}

export default App;

