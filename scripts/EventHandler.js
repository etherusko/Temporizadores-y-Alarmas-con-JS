export class EventHandler{
    static observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const hijo = entry.target
            const padre = hijo.closest(".block")
            this.sizeChangeEvent(padre)
        }
    })

    static sizeChangeEvent(padre){
        //Verificar si la clase colum-dir está activa en padre (.block)
        const isOnColum = padre.classList.contains("column-dir")
        
        //Si está activa eliminarla
        if(isOnColum) padre.classList.remove("column-dir")
        
        //Verificar scroll con flex-dir: row
        const needsColumLayout = padre.clientWidth < padre.scrollWidth
        
        //Agregar o quitar la clase en función de si hay scroll (needsColumLayout)
        padre.classList.toggle('column-dir',needsColumLayout)
    }
}