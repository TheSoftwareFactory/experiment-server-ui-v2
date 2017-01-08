import React from 'react'
/**
 * This file is purpose to serve general High order components for easy to use
 * and change in Front-end.
 * TODO Innovate better name for class. :P
 */

//Takes heading as props and creates a simple top header for page
export const Header = ({ heading }) =>{
  return(
    <header className="headerBox">
      <h3>{heading}</h3>
      </header>
  )
}

//takes heading as props and creates subheader for page.
export const SubHeader = ({ heading }) =>{
  return(
    <div className="ApplicationHeader">
      <h3>{heading}</h3>
      </div>
  )
}
//Heading and content to create one of DataBox elements
//There might be a room for improment here. 
export const DataBox = ({ heading, content }) =>{
  return(<div className="DB">
    <h3>{heading}</h3>
    <div className="Databox"> {content} </div>
  </div>)
}
