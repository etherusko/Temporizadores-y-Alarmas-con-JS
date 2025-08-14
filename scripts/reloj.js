export class Reloj {

/* Estatic Scope: */
    static alarma = new Audio("src/generic-alarm-clock-86759.mp3")   //temporal
    static playingAlarm = false
    static relojMap = new Map()
    static uiObject = {
        //Hay que sobreescribir este objeto con los elementos de DOM desde index.js
        template : "HTML <template> para clonar bloques",
        container : "Contenedor de ui para los bloques",
        constructor : "eventListener a cargo de crear nuevos bloques",
        inputs : "Inputs del DOM para captura el tiempo ingressado por el usuario"
    }
    static pushUi(obj) {
        this.uiObject = obj
        this.#addGlobalListener()
        obj.constructor.addEventListener('click', () => {
            new Reloj(obj.template, this.#calcTimeFromInputs(obj.inputs))
        })
        obj.constructor.addEventListener("click", () => {
            this.alarma.play().then(() => {
                this.alarma.loop = true
                this.alarma.pause();
                this.alarma.currentTime = 0; // vuelve al inicio
            });
        }, { once: true }) // Solo la primera vez
    }
    static #addGlobalListener() {
        this.uiObject.container.addEventListener('click', e => {
            const btn_action = e.target.dataset.btn
            if (btn_action){
                /*debug: */ console.log("se pulsó boton", btn_action)
                const block = e.target.closest(".block")
                const object = this.relojMap.get(block)
                object.btnIdentifier(btn_action)
            }
        })
    }
    static #calcTimeFromInputs(inputs){
        let total = 0.0
        inputs.forEach(input => {
            const valor = parseFloat(input.value) || 0; // Si está vacío o no es número, toma 0
            const factor = parseFloat(input.dataset.factor)
            total += valor * factor * 1000 
        })
        return total
    }
    static interfaceLoop(){
        this.playingAlarm = false
        for(const reloj of this.relojMap.values()){
            reloj.countTime()
        }
        this.playingAlarm ? this.alarma.play() : this.alarma.pause()
    }
//..............................................   
    


//================== Constructor: ==================//

    constructor(template,time){
        this.time = time || 0       //tiempo ingresado en milisegundos
        this.saved_time = 0         //tiempo acumulado
        this.actual_time_mark = 0   //referencia actual
        this.delta_time = 0         //cuenta actual
        this.isRunning = false
        this.block = this.clonTemplate(template)    //Contraparte del objeto en la interfaz
        Reloj.relojMap.set(this.block, this)        //Vincular referencia UI con objeto
    }
    
    //...............Clonar template:
    clonTemplate(template) { 
        //Clonar template:
        const clone = template.content.cloneNode(true)
        const block = clone.querySelector(".block")
        
        //Agregar bloque al DOM:
        const container = document.querySelector("#display")
        container.appendChild(block)
        
        //Guardar bloque en this.block
        return block;
    }
//==================================================//

//----------------------------------------------------------------------------------------------------------//
    
//==============Comportamiento & Eventos:==================//

    btnIdentifier(data_btn = ""){ //////////////////////Temporal*************** 
        const dispatchAction = new Map([
            ["play", () => this.switchState()],
            ["reboot", () => this.resetTime()],
            ["delete", () => this.delete()]
        ])
        dispatchAction.get(data_btn)()
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
    }
    //...............Borrar:
    delete(){
        Reloj.relojMap.delete(this.block)   //Elimina el objeto
        this.block.remove()                 //Elimina el nodo del DOM
    }
//=======================================================//
    

//==================== Ciclos lógica & render ==========================//
    
    //.......Ciclo de tiempo:    
    countTime(){
        if(this.isRunning){
            if (this.time <= 0){
                Reloj.playingAlarm = true
            }
            this.delta_time = Date.now() - this.actual_time_mark
        }
    }
    //.......Ciclo de renderizado:
    displayTime(){
        this.block.querySelector(".button_play").innerText = this.isRunning ? "Pause" : "Play"
        const display = this.block.querySelector(".display-time p")
        display.innerText = this.formatTime(this.calcTime())
        }
    calcTime(){
        const total_count = this.saved_time + this.delta_time
        //const global_time = this.time + total_count     //cronómetro
        const global_time = this.time - total_count    //temporizador
        return global_time      //calculado en milisegundos
    }
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
//=====================================================================//


//========================== DEBUG =============================//
    
    static prueba(e){
        console.log("Se hizo click en el boton", e)
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