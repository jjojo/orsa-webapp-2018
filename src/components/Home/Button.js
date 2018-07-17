import React, { Component } from 'react'
import './homeStyle.css'


var Button = (props) => {
        return (
            <button
                className={'homeButton'}
                onClick={props.handleClick}>{props.label}</button>
        );
    }


export default Button;