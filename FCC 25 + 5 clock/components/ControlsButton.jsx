import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faArrowsRotate, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

export default function ControlsButton(props) {
    let iconOne = props.icon === 'play' ? <FontAwesomeIcon icon={faPlay} size='2xl' style={{color: "#ffa257",}} />
        : props.icon === 'pause' ? <FontAwesomeIcon icon={faPause} size='lg' style={{color: "#ffa257",}} />
        : props.icon === 'reset' ? <FontAwesomeIcon icon={faArrowsRotate} size='lg' style={{color: "#ffa257",}} />
        : props.icon === 'plus' ? <FontAwesomeIcon icon={faPlus} size='lg' style={{color: "#ffa257",}} />
        : props.icon === 'minus' ? <FontAwesomeIcon icon={faMinus} size='lg' style={{color: "#ffa257",}} />
        : '';

    return (
        <div 
            className={props.icon === 'play' ? 'controlsButton play' : 'controlsButton singleButtons'}
            onClick={props.onClick}
        >
            <h1>{props.label}</h1>
            {iconOne}
        </div>
    )
}