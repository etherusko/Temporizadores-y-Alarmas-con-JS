export class EventHandler{

    static uiConection(uiObject){
        this.#addGlobalListener(uiObject.container)
        this.#defineConstructorEvent(uiObject)
    }

    /**Evento: Cambio de dimensiones en <block><hijos></block> */
    static observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const hijo = entry.target
            const padre = hijo.closest(".block")
            this.#sizeChangeEvent(padre)
        }
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
                const event = new CustomEvent('click-on-timer-button',{
                    detail: {
                        activeButton: button,
                        blockReference: block,
                    }});
                block.dispatchEvent(event)         
            } 
        })
    }

    /**Evento: Activación del constructor */
    static #defineConstructorEvent(uiObject){
        uiObject.constructor.addEventListener('click', () => {
            const event = new CustomEvent('click-on-constructor-button',{detail:{}})
            console.log("Se creo un evento click constructo")
            document.dispatchEvent(event) //listener en index.js
            uiObject.inputs.forEach(input => input.value = null);
        })
    }
}