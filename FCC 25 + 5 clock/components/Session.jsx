import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'

export default function Session(props) {

    return (
        <div className='session-wrap'>
            <h2 className={props.pauseSwitch === true && props.breakSwitch === true ? 'timer-paused' 
                : props.breakSwitch === true ? 'timer-on-break'
                : 'timer-active hidden'
            }>
                Break Time</h2>
            <h1 
                className={props.pauseSwitch === true ? 'timer-paused' 
                : props.breakSwitch === true ? 'timer-on-break'
                : 'timer-active'
            }>
                {props.displayedTime}</h1>
            <FontAwesomeIcon className={props.pauseSwitch ? 'pause-icon' : 'pause-icon hidden' } icon={faPause} size='2xl' style={{color: "#ffa257",}} />       
        </div>
    )
}