
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
    if(this.state.breaks === 60){
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
    if(this.state.session === 60){
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
    if(document.getElementById('start_stop').disabled !== true){
      this.s = setInterval(this.counter, 1000)
      document.getElementById('start_stop').disabled=true;
      document.getElementById('session-decrement').disabled=true;
      document.getElementById('session-increment').disabled=true;
      document.getElementById('break-increment').disabled=true;
      document.getElementById('break-decrement').disabled=true;
    }
    
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
    if(this.state.seconds === 0){
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
    if(this.state.sessionBreak === "Session"){
      if((this.state.session === 1) || (this.state.seconds === 0 && this.state.minutes === 1)){
        this.setState(state =>({alarmColor: { color: "#FF0000" },}))
      }
    } //red alarmt text
    
    if(this.state.seconds === 0 && this.state.minutes === 0){
      if(this.state.breaker === 5){
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
    
    if(this.state.breaks === 0){
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
    
    if(this.state.minutes === 0){
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

        <div id="counter-display">
          <div id="timer-label" style={this.state.alarmColor}>{this.state.sessionBreak}</div>
          <div id="time-left" style={this.state.alarmColor}>
            <audio preload="auto" ref={(audio) => {this.audioBeep = audio;}} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" id="beep"/>
            {this.clockRender()}
          </div>
          
        </div>

        <div>
            <button id="start_stop" onClick={this.handleStart}>
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/></svg>
            </button>

            <button id="stop" onClick={this.handleStop}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/></svg>
            </button>                       
        </div>  

           
        <div id="bottom-elements">
          <div class="reset">
            <button id="reset" onClick={this.handleReset}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-left-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.904 2.803a.5.5 0 1 0 .707-.707L6.707 6h2.768a.5.5 0 1 0 0-1H5.5a.5.5 0 0 0-.5.5v3.975a.5.5 0 0 0 1 0V6.707l4.096 4.096z"/></svg>
            </button>
            <p><strong>Reset</strong></p>
          </div>

          <div id="container">
            <div class="text" id="break-label">
              <p id="displayed"><strong>Break Length</strong></p>
              <button id="break-decrement" onClick={this.Decrement}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16"><path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/></svg>
              </button>
              <p id="break-length">{breakLength}</p>
              <button id="break-increment" onClick={this.Increment}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16"><path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/></svg>
              </button>              
            </div>

            <div class="text" id="session-label">
              <p id="displayed"><strong>Session Length</strong></p>
              <button id="session-decrement" onClick={this.handleDecrement}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16"><path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/></svg>
              </button>
              <p id="session-length">{sessionLength}</p>
              <button id="session-increment" onClick={this.handleIncrement}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16"><path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/></svg>
              </button>
            </div>
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

