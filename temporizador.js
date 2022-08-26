const contenedor = document.getElementById("display");
let blockId = 0;
function btnPlayOnClick(e){
    let thisButton = e.children[1].children[0];
    thisButton.innerText = thisButton.innerText == "Play" ? "Pause" : "Play";
    console.log("Se ha pulsado el botón Play");
}
function btnReiniciarOnClick(){
    console.log("Se ha pulsado el botón Reiniciar");
}

/**
 * Botón Borrar
 */
function btnBorrarOnClick(e){
    contenedor.removeChild(e);
    clearInterval(e.id);    
    console.log("Se ha pulsado el botón Borrar");
}
/**
 * Botón Crear Nuevo
 */ 
function btnCrearNuevoOnClick(){
    blockId+=1;
    let miliseconds = leerInputs();
    let timeMark = new Date();
    crearContador(miliseconds,timeMark);
    console.log("Se ha pulsado el botón Crear Nuevo");
}
function leerInputs(){
    let dias = document.getElementById("inputDays").value*3600*24;
    let horas = document.getElementById("inputHours").value*3600;
    let minutos = document.getElementById("inputMinuts").value*60;
    let segundos = document.getElementById("inputSeconds").value*1;
    let seconds = dias+horas+minutos+segundos;
    document.getElementById("inputDays").value = "";
    document.getElementById("inputHours").value = "";
    document.getElementById("inputMinuts").value = "";
    document.getElementById("inputSeconds").value = "";
    return seconds*1000;
}
function crearContador(miliseconds,timeMark){
    let m = calcularMensaje(timeMark-new Date()+miliseconds);
    let displayElement=crearElementos(m);
    setInterval(function(){
        let tiempoRestante = timeMark-new Date()+miliseconds;
        displayElement.innerText = calcularMensaje(tiempoRestante);
        console.log(tiempoRestante);
    },1000);
}
function crearElementos(m){
    let block = crearElemento('div',['class','block'],contenedor,"");
    block.setAttribute('id',blockId);
    let displayTime = crearElemento('div',['class','display-time'],block,"");
    let displayButtons = crearElemento('div',['class','display-buttons'],block,"");
    let cuentaRegresiva = crearElemento('p',[],displayTime,m);
    let btnPlay = crearElemento('button',['class', 'display-btn'],displayButtons,"Play");
    btnPlay.setAttribute('id','btnPlay'+blockId)
    btnPlay.setAttribute('onclick',`btnPlayOnClick(document.getElementById(${blockId}))`);
    let btnReiniciar = crearElemento('button',['class', 'display-btn'],displayButtons,"Reiniciar");
    btnReiniciar.setAttribute('onclick','btnReiniciarOnClick()');
    let btnBorrar = crearElemento('button',['class', 'display-btn'],displayButtons,"Borrar");
    btnBorrar.setAttribute('onclick',`btnBorrarOnClick(document.getElementById(${blockId}))`);
    return cuentaRegresiva;
}
function crearElemento(etiqueta,[atributo,valor],padre,texto){
    let element = document.createElement(etiqueta);
    element.setAttribute(atributo,valor);
    element.innerText = texto;
    padre.appendChild(element);
    return element;
}
function calcularMensaje(tiempo){
    let signo = tiempo > -1 ? "" : "-";
	let dias = calcularDisplay(tiempo/1000/3600/24,signo);
	let horas = calcularDisplay((tiempo/1000/3600)%24,signo);
	let minutos = calcularDisplay((tiempo/1000/60)%60,signo);
    let segundos = calcularDisplay(tiempo/1000%60,signo);
	return dias+" Días	"+horas+" h : "+minutos+" min : "+segundos+" sec"; 
}
function calcularDisplay(t,signo){
    let tiempo = ('0'+Math.round(Math.abs(t))).slice(-2);
    let m = tiempo>=1 ? signo+tiempo : tiempo;
    return m;
}