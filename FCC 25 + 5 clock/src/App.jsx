import React, { useEffect, useState } from 'react';
import './App.css';
import Session from '../components/Session'
import ControlsButton from '../components/ControlsButton'

export default function App() {
  const [seshTimerSeconds, setSeshTimerSeconds] = useState('00');
  const [seshTimerMinutes, setSeshTimerMinutes] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [pauseSwitch, setPauseSwitch] = useState(true);
  const [breakSwitch, setBreakSwitch] = useState(false);
  const [rewindSwitch, setRewindSwitch] = useState(false);

  useEffect(() => {
    let timerInterval = setInterval(() => {
      if (pauseSwitch === false) {
        if (rewindSwitch === true) {
          clearInterval(timerInterval);
          setRewindSwitch(false);
        } else if (seshTimerSeconds > 0) {
          if (seshTimerSeconds <= 10) {
            setSeshTimerSeconds('0' + (seshTimerSeconds - 1))
          } else {
            setSeshTimerSeconds(seshTimerSeconds - 1);
          }
        } else if (seshTimerSeconds == 0 && seshTimerMinutes > 0) {
          setSeshTimerSeconds(59);
          if (seshTimerMinutes <= 10) {
            setSeshTimerMinutes('0' + (seshTimerMinutes - 1))
          } else {
            setSeshTimerMinutes(seshTimerMinutes - 1)
          }          
        } else if (breakSwitch === true) {
          setBreakSwitch(false);
          if (sessionLength < 10) {
            setSeshTimerMinutes('0' + sessionLength)
          } else {
            setSeshTimerMinutes(sessionLength)
          }
          setSeshTimerSeconds(59)
        } else if (breakSwitch === false) {
          setBreakSwitch(true);
          if (breakLength < 10) {
            setSeshTimerMinutes('0' + breakLength);
          } else {
            setSeshTimerMinutes(breakLength);
          }
          
          setSeshTimerSeconds(59)
        } 
      } else if (pauseSwitch === true) {
        clearInterval(timerInterval)
      }
    }, 1000);
    return () => {clearInterval(timerInterval)}
  });

  function rewindTrigger() {
    setSeshTimerSeconds('00')
    setPauseSwitch(true);
    setBreakSwitch(false);
    if (sessionLength <= 10) {
      setSeshTimerMinutes('0' + sessionLength)
    } else {
      setSeshTimerMinutes(sessionLength)
    }
  };
  
  function adjustBreakLength(op) {
    if (pauseSwitch === true) {
      if (op === 'plus') {
        setBreakLength(breakLength + 1)
        if (breakSwitch === true) {
          if (breakLength <= 8) {
            setSeshTimerMinutes('0' + (breakLength + 1))
          } else {
            setSeshTimerMinutes(breakLength + 1);
          };
        }
        if (breakLength >= 60) {
          setBreakLength(60);
          setSeshTimerMinutes(60)
        }
        setSeshTimerSeconds('00')
      } else if (op === 'minus') {
        setBreakLength(breakLength - 1)
        if (breakSwitch === true) {
          if (breakLength <= 10) {
            setSeshTimerMinutes('0' + (breakLength - 1))
          } else {
            setSeshTimerMinutes(breakLength - 1);
          };
        }
        if (breakLength <= 1) {
          setBreakLength(1);
          setSeshTimerMinutes('01')
        }
        setSeshTimerSeconds('00')
      }
    }
  };

  function adjustSessionLength(op) {
    if (pauseSwitch === true) { 
      if (op === 'plus') {
        setSessionLength(sessionLength + 1)
        if (sessionLength >= 60) {
          setSessionLength(60)
        } else if (sessionLength <= 10) {
          setSeshTimerMinutes('0' + (sessionLength + 1))
        } else {
          setSeshTimerMinutes(sessionLength + 1)
        }
        setSeshTimerSeconds('00');
      } else if (op === 'minus') {
        setSessionLength(sessionLength - 1)
        if (sessionLength <= 1) {
          setSessionLength(1);
          setSeshTimerMinutes('01')
        } else if (sessionLength <= 10 && sessionLength != 1) {
          setSeshTimerMinutes('0' + (sessionLength - 1))
        } else {
          setSeshTimerMinutes(sessionLength - 1)
        }
        setSeshTimerSeconds('00');
      }
    }
  };

  return (
    <div>
      <div className='wrapper'>
        <div className='sub-wrapper'>
          <h1>Break Length</h1>
          <div className='dials-wrapper'>           
            <ControlsButton icon='plus' onClick={() => adjustBreakLength('plus')} />
            <h1 className='counter timer-on-break'>{breakLength}</h1>
            <ControlsButton icon='minus' onClick={() => adjustBreakLength('minus')} />
          </div>
        </div>
        <div className='sub-wrapper'>
          <h1>Session Length</h1>
          <div className='dials-wrapper'>  
            <ControlsButton icon='plus' onClick={() => adjustSessionLength('plus')} />
            <h1 className='counter'>{sessionLength}</h1>
            <ControlsButton icon='minus' onClick={() => adjustSessionLength('minus')} />
          </div>
        </div>
      </div>
      <Session 
        displayedTime={seshTimerMinutes + ":" + seshTimerSeconds}
        pauseSwitch={pauseSwitch}
        breakSwitch={breakSwitch} 
      />
        <a href='https://github.com/atziri97/focus-timer'><img src='./public/github-mark-white.svg' /></a>
      <div className='buttons-wrapper' >
        <ControlsButton icon='pause' onClick={() => setPauseSwitch(!pauseSwitch)} />
        <ControlsButton icon='play' onClick={() => setPauseSwitch(false)}/>
        <ControlsButton icon='reset' onClick={() => {setRewindSwitch(true); rewindTrigger()}}/>
      </div>

    </div>
  )
}

