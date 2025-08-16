export class LoopControl{

    static observWatches = []
    
    static startLoops(interval = new Function()){
        setInterval(interval,100)
        requestAnimationFrame(this.updateTime.bind(this))
    }

    static updateTime(){
        this.observWatches.values().forEach(e => e.displayTime())
        requestAnimationFrame(this.updateTime.bind(this))
    }
}