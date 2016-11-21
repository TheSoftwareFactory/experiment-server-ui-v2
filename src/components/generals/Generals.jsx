import React from 'react'
/**
 * This file is purpose to serve general High order components for easy to use
 * and change in Front-end.
 * TODO Innovate better name for class. :P
 */

export const Header = ({heading}) =>{
  return(
    <header className="headerBox">
      <h3>{heading}</h3>
      </header>
  )
}
export const SubHeader = ({heading}) =>{
  return(
    <div className="ApplicationHeader">
      <h3>{heading}</h3>
      </div>
  )
}
export const DataBox = ({heading, content}) =>{
  return(<div>
    <h3>{heading}</h3>
    <div className="Applications"> {content} </div>
  </div>)
}
