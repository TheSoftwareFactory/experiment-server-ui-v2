import React, { Component } from 'react'
import { openModal, ModalClass } from './generals/Modal.jsx'
export default class Users extends Component{

  render(){
    let teksti = "aa"
    const inputs = [{type: "text", ref:"uusiAteena"},{type: "radio", ref:"uusiRooma"}]
    const actions = [()=>console.log(arguments), ()=>console.log("toka")]
    const uusi = (name, type) =>{
      console.log(name,type);
    }
    return(<div>
      <button onClick={()=>openModal("uusiAteena")}>TISSIT</button>
      <ModalClass
        modalId="uusiAteena"
        content={
          <div>
            <input type="text" ref="name"></input>
            <select ref="type">
              <option value="boolean">Volvo</option>
              <option value="string">Sab</option>
              <option value="Integer">Mercedes</option>
              <option value="Float">Audi</option>
            </select>
            <button onClick={()=>uusi(this.refs.name.value,this.refs.type.value)}>PAINA TÄSTÄ </button>
          </div>
        }
        ></ModalClass>
    </div>)
  }
}
