import { Reloj } from './reloj.js'

//Guardar elementos del DOM en objeto:
const domObjectConnection = {
    template : document.getElementById("block-template"),
    container : document.querySelector("#display"),
    constructor : document.querySelector(".constructor-button .ui-btn"),
    inputs : document.querySelectorAll('.constructor-inputs input')
}
Reloj.pushUi(domObjectConnection)

//Time count loop:
setInterval(() => {
    Reloj.interfaceLoop()
},100)


//Render Loop:
function renderLoop() {
    for(const timer of Reloj.relojMap.values()){
        timer.displayTime()
    }
    Reloj.resizeDetection = false
    requestAnimationFrame(renderLoop)
}

requestAnimationFrame(renderLoop);