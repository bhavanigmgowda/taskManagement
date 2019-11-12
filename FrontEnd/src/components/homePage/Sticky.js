import React, { Component } from 'react';


export const stickyCri = (item) => {

    return (
        <p id="drag1" draggable="true" className="prCri" >
            < textarea id="d2" className="textarea" value={item.subject} rows="5" readOnly></textarea>
            <i class="fas fa-arrow-up arrow" style={{ color: "red" }}></i>   </p>)
}

export const stickyHigh = (item) => {

    return (
        <p id="drag1" draggable="true" className="prHigh" >
            < textarea id="d2" className="textarea" value={item.subject} rows="5" readOnly></textarea>
            <i class="fas fa-arrow-up arrow" style={{ color: "red" }}></i>   </p>)
}
export const stickyMedium = (item) => {
    return (
        <p div id="drag2" draggable="true" className="prInit" >
            < textarea id="d2" className="textarea" value={item.subject} rows="5" readOnly></textarea>
            <i class="fas fa-arrow-up arrow" style={{ color: "rgb(232, 241, 144)" }}></i>
        </p>
    )
}

export const stickyLow = (item) => {
    return (
        <p div id="drag2" draggable="true" className="prLow" >
            < textarea id="d2" className="textarea" value={item.subject} rows="5" readOnly></textarea>
            <i class="fas fa-arrow-up arrow" style={{ color: "rgb(232, 241, 144)" }}></i>
        </p>
    )
}