export class EventHandler{

    static uiConection(uiObject){
        this.#addGlobalListener(uiObject.container)
        this.#defineConstructorEvent(uiObject)
    }

    /**Evento: Detectar cambio de  dimenciones en el DOM */
    static observer = new ResizeObserver((entries) => {
        entries.forEach(entry => this.#sizeChangeEvent(entry.target.closest(".block")))
    })

    static #sizeChangeEvent(padre){
        //Verificar si la clase colum-dir está activa en padre (.block)
        const isOnColum = padre.classList.contains("column-dir")
        
        //Si está activa eliminarla
        if(isOnColum) padre.classList.remove("column-dir")
        
        //Verificar scroll con flex-dir: row
        const needsColumLayout = padre.clientWidth < padre.scrollWidth
        
        //Agregar o quitar la clase en función de si hay scroll (needsColumLayout)
        padre.classList.toggle('column-dir',needsColumLayout)
    }

    /**Evento: Click sobre botones de los objeto temporizador de ui */
    static #addGlobalListener(globalListener) {              //globalListener == Reloj_instance: this.uiObject.container
        globalListener.addEventListener('click', e => {    
            const button = e.target.closest("button")
            if(button){
                const block = button.closest(".block")
                block.dispatchEvent(new CustomEvent('click-on-timer-button',{
                    bubbles: true,
                    detail: {
                        activeButton: button,
                        btnAction : button.dataset.btn
                    }
                }))         
            } 
        })
    }

    /**Evento: Activación del constructor */
    static #defineConstructorEvent(uiObject){
        uiObject.constructor.addEventListener('click', () => document.dispatchEvent(new CustomEvent('click-on-constructor-button',{detail:{}})))

        const inputsContainer = document.querySelector("#timerInputs")
        const inputRadioArray = document.querySelectorAll('input[name="timerType"]')

        inputRadioArray.forEach(radio => radio.addEventListener('change', (e) => {
            //Disparar Evento______
            document.dispatchEvent(new CustomEvent('constructor-mode',{detail:{mode: e.target.value}}))
            e.target.value === 'stopwatch' 
                ?   inputsContainer.classList.add('hidden')  
                :   inputsContainer.classList.remove('hidden')
        }))
    }
}