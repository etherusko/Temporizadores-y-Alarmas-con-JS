import { LoopControl } from './loopControl.js'
import { Reloj } from './reloj.js'

//Guardar elementos del DOM en objeto:
const domObjectConnection = {
    template : document.getElementById("block-template"),
    container : document.querySelector("#display"),
    constructor : document.querySelector(".constructor-button .ui-btn"),
    inputs : document.querySelectorAll('.constructor-inputs input')
}
Reloj.init(domObjectConnection)
document.addEventListener('click-on-constructor-button', () => new Reloj())
//Reloj.startLoops()

