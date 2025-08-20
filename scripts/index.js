import { Reloj } from './reloj.js'

//Guardar elementos del DOM en objeto:
const DOM_ObjectConnection = {
    template : document.getElementById("block-template"),
    container : document.querySelector("#display"),
    constructor : document.querySelector(".constructor-button .ui-btn"),
    inputs : document.querySelectorAll('.constructor-inputs input')
}
Reloj.init(DOM_ObjectConnection)