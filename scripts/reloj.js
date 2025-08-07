export class Reloj {
    static relojMap = new Map()
    static addGlobalListener(container) {
        container.addEventListener('click', e => {
            const btn_action = e.target.dataset.btn
            if (btn_action){
                const block = e.target.closest(".block")
                const object = this.relojMap.get(block)
                object.btnIdentifier(btn_action, e.target)
            }
        })
    }

   //...............Constructor:
   constructor(template){
       this.block = this.clonTemplate(template) //Contraparte del objeto en la interfaz
       Reloj.relojMap.set(this.block, this) //Guardar referencia del bloque en el mapa
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
    
    //Comportamiento & Eventos:

    btnIdentifier(data_btn = "", btn = null){
        switch(data_btn){
            case "play":
                this.switchState(btn);
                break;
            case "reboot":
                console.log("Reiniciando ...")
                break;
            case "delete":
                console.log("Ups. Se borró")
                break;
            default:
                console.warn("Botón no reconocido:", data_btn);
        }

    }
    
    //...............Play&PAuse:
    switchState(btn){
        console.log(btn.innerText)
        btn.innerText = btn.innerText == "Play" ? "Pause" : "Play"
    }

    //...............Reiniciar:
    //...............Borrar:
    //...............




}    
/**
 * Clase Reloj:
 * ¿Qué hace?
 * ✔ 1: Instancia objetos typo reloj <==> clona template y lo agrega al DOM
 * 2: Controla el comportamiento de los objetos tipo reloj <==> mediante eventos a través de los botones play, reiniciar y borrar
 *  2.1: Play y Pause <==> cambia el estado del reloj
 *  2.2: Reiniciar <==> reinicia el reloj a cero
 *  2.3: Borrar <==> eliminar reloj del DOM
 *  ✔ 2.4: Agregar Listener <==> delegación de eventos para los botones
 * 3: Lleva cuenta del tiempo trancurrido.
 * 4: Calcula el formato de tiempo transcurrido <==> Días, horas, minutos y segundos
 * 5: Manda una respuesta al DOM con el formato calculado para display <==> Tiempo transcurrido; pausa/play
 *  */    
    
//////////////////////////////////////////////////////////////////////
    
    /**export class Reloj {
        static #id = 0
        static #template = document.getElementById("block-template")
        constructor() {
            this.initial_time = Date.now();
            this.blockId = Reloj.#id++;
            this.clon_template = this.clonTemplate()
            document.addEventListener('tick', () => {
                this.displayTime()
            })
        }

        get tiempoTranscurrido() {
            return Math.floor((Date.now() - this.initial_time) / 1000);
        }

        //Clonar template y añadir eventos a los botones
        clonTemplate() { 
            const clone = Reloj.#template.content.cloneNode(true);
            const block = clone.querySelector(".block")
                        
            const btn_play = clone.querySelector(".button_play")
            const btn_reiniciar = clone.querySelector(".button_reiniciar")
            const btn_borrar = clone.querySelector(".button_borrar")
            
            btn_borrar.addEventListener("click", () => {
                block.remove()
            })
            btn_play.addEventListener("click", () => {
                this.switchState(block) 
            })
            btn_reiniciar.addEventListener("click", () => {
                this.reboot(block) 
            })
            return block
        }

        //Play/pause
        switchState(){
            console.log("Play/Pause")
        }
        //Reiniciar
        reboot() {
            this.displayTime()
        }

        //Display
        displayTime(){
            const display = this.clon_template.querySelector(".display-time p")
            display.innerText = this.tiempoTranscurrido + " segundos transcurridos";
            //console.log(this.clon_template.querySelector(".display-time"))
        }

    }
*/