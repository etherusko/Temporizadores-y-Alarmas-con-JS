import { Reloj } from './reloj.js'

//Elementos del DOM:
const constructor = document.querySelector(".constructor-button")
const boton_constructor = constructor.querySelector(".ui-btn")
const timersContainer = document.querySelector("#display")
const template = document.getElementById("block-template")

boton_constructor.addEventListener('click', () => instanciarReloj() )
Reloj.addGlobalListener(timersContainer)
//Template:


function instanciarReloj(){
    const reloj = new Reloj(template)
   // console.log(Reloj.relojMap[reloj.block])
    
}

