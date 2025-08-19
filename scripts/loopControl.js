export class LoopControl{
 
    static eventManager  = new EventTarget()    

    static startLoops(){
        setInterval( () => {
            this.eventManager.dispatchEvent(new CustomEvent('interval-loop-cicle',
                {detail:{},
                }
            ))
        },100)
        requestAnimationFrame(this.updateFrame.bind(this))
    }

    static updateFrame(){
        this.eventManager.dispatchEvent(new CustomEvent('animation-loop-cicle',{detail:{},}))
        requestAnimationFrame(this.updateFrame.bind(this))
    }
}