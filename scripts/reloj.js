import { EventHandler } from "./EventHandler.js";
import { LoopControl } from "./loopControl.js";

export class Reloj {

//================== Estatic Scope: ==================//
    //Variables Estáticas:
    static alarma = new Audio("src/generic-alarm-clock-86759.mp3")   //temporal
    static relojMap = new Map()
    static uiObject = {
        //Hay que sobreescribir este objeto con los elementos de DOM desde index.js
        template : "HTML <template> para clonar bloques",
        container : "Contenedor de ui para los bloques",
        constructor : "eventListener a cargo de crear nuevos bloques",
        inputs : "Inputs del DOM para captura el tiempo ingressado por el usuario"
    }

    //Funciones Estáticas:    
 //.....Inicia en index.js | Se ejecuta 1 vez
    static init(obj){
        this.#pushUi(obj)
        this.#initLoopListeners()
        this.#initGlobalListeners()
    }

    static #pushUi(obj){    
        this.uiObject = obj
        EventHandler.uiConection(obj)
        LoopControl.startLoops()
    }

    static #initLoopListeners(){
        //........................Ciclo SetInterval (Cuenta de tiempo)
        LoopControl.eventManager.addEventListener('interval-loop-cicle', e => {
            let alarmOn = false
            this.relojMap.values().forEach(reloj => alarmOn = reloj.countTime() || alarmOn)
            alarmOn ? this.alarma.play() : this.alarma.pause()
        })

        //........................Ciclo rAF (refresh ui)
        LoopControl.eventManager.addEventListener('animation-loop-cicle', e => {
            this.relojMap.values().forEach(timer => timer.displayTime())
        })
    }
        //.... ==> Aqui se instancia new Reloj() dentro de un listener:
    static #initGlobalListeners(){
        //EventHandler.observer.observe(  )
        document.addEventListener('click-on-constructor-button', () => {
            const reloj = new Reloj()
            EventHandler.observer.observe(reloj.block)
            EventHandler.observer.observe(reloj.block.querySelector(".display-time"))
            EventHandler.observer.observe(reloj.block.querySelector(".display-buttons"))
            this.uiObject.inputs.forEach(input => input.value = null); //Se restean valores de los imputs
        })
        this.uiObject.container.addEventListener('click-on-timer-button', e => {  
            const block = e.target    
            const btnAction = e.detail.btnAction
            this.relojMap.get(block).btnIdentifier(btnAction) 
        })
    }

 //.....Inicia con cada new Reloj() | se ejecuta 1 vez por reloj
    static #clonTemplate(instancia = new Reloj()) { 
        //Clonar template:
        const block = this.uiObject.template.content.cloneNode(true).querySelector(".block")
        
        //Agregar bloque al DOM:
        this.uiObject.container.appendChild(block)
        
        //Guardar bloque en this.block
        Reloj.relojMap.set(block, instancia)        //Vincular referencia UI con instancia
        return block;
    }

    static #calcTimeFromInputs(){
        let total = 0.0
        this.uiObject.inputs.forEach(input => {
            const valor = parseFloat(input.value) || 0; // Si está vacío o no es número, toma 0
            const factor = parseFloat(input.dataset.factor)
            total += valor * factor * 1000 
        })
        return total
    }

//================== Constructor: ==================//

    constructor(){
        this.block = Reloj.#clonTemplate(this) || undefined   //Contraparte del objeto en la interfaz del DOM
        this.time = Reloj.#calcTimeFromInputs() || 0       //tiempo ingresado en milisegundos
        this.saved_time = 0         //tiempo acumulado
        this.actual_time_mark = 0   //referencia actual
        this.delta_time = 0         //cuenta actual
        this.calculated_time = this.time
        this.isRunning = false
    }

//==============Comportamiento & Eventos:==================//

    //...............Escucha de botones & selección de método
    btnIdentifier(btn_action = ""){
        const dispatchAction = new Map([
            ["play", () => this.switchState()],
            ["reboot", () => this.resetTime()],
            ["delete", () => this.delete()]
        ])
        dispatchAction.get(btn_action)()
    }    
    //...............Play&PAuse:
    switchState(){
        this.isRunning = !this.isRunning
        if (this.isRunning){
            this.actual_time_mark = Date.now()
        }else{
            this.saved_time += this.delta_time
            this.delta_time = 0
        }
    }
    //...............Reiniciar:  
    resetTime(){
        this.saved_time = 0
        this.delta_time = 0
        this.actual_time_mark = Date.now()
        this.isRunning = false
        this.calcTime()
    }
    //...............Borrar:
    delete(){
        Reloj.relojMap.delete(this.block)   //Elimina el objeto
        this.block.remove()                 //Elimina el nodo del DOM
    }
    

//==================== Ciclos de lógica & render ==========================//
    
    //.......Ciclo de tiempo:    
    countTime(){
        if(this.isRunning){
            this.calcTime()
            this.delta_time = Date.now() - this.actual_time_mark
            if (this.calculated_time <= 0){
                console.log("menor que 0 detect")
                return true
            }
        }
        return undefined
    }
    calcTime(){
        const total_count = this.saved_time + this.delta_time
        this.calculated_time = this.time - total_count
        //const global_time = this.time + total_count     //cronómetro
        //const global_time = this.time - total_count    //temporizador
    }

    //.......Ciclo de renderizado:
    displayTime(){
        this.block.querySelector(".button_play .btn-span-name").innerText = this.isRunning ? "Pause" : "Play" //¿Es necesario calcularlo aqui?
        const display = this.block.querySelector(".display-time p")
        display.innerText = this.formatTime(this.calculated_time)
    }
    //.......calculado de tiempo transcurrido en milisegundos
    formatTime(time){
        const total_sec = time/1000
        const days =    Math.trunc(total_sec/86400)
        const hours =   Math.trunc((total_sec / 3600) % 24)      
        const minuts =  Math.trunc((total_sec / 60) % 60)     
        const seconds = total_sec % 60        
        return `|| D: ${days} || H: ${(hours)} || m: ${(minuts)} || s: ${seconds.toFixed(2)} ||`
        //1D = 86400 s
        //1H = 3600 s
        //1m = 60 s
        //1s = 1000 ms
    }

//========================== DEBUG =============================//
    
    static prueba(){
        console.log("Esto es una prueba", this)
    }
//===============================================================//

}    
/**
 * Clase Reloj:
 * ¿Qué hace?
 * ✔ 1: Instancia objetos typo reloj <==> clona template y lo agrega al DOM
 * ✔ 2: Controla el comportamiento de los objetos tipo reloj <==> mediante eventos a través de los botones play, reiniciar y borrar
 * ✔ 2.1: Play y Pause <==> cambia el estado del reloj
 * ✔ 2.2: Reiniciar <==> reinicia el reloj a cero
 * ✔ 2.3: Borrar <==> eliminar reloj del DOM
 * ✔ 2.4: Agregar Listener <==> delegación de eventos para los botones
 * ✔ 3: Lleva cuenta del tiempo trancurrido.
 * ✔ 4: Calcula el formato de tiempo transcurrido <==> Días, horas, minutos y segundos
 * ✔ 5: Manda una respuesta al DOM con el formato calculado para display <==> Tiempo transcurrido; pausa/play
 * ✔ 6: Activar alarma si tiempo <= 0
 * 7: Agregar opcion para cronómetro o temporizador
 * 8: Guardar datos en localStorage
 *  */    