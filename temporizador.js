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
    return seconds*1000;
}
function crearContador(miliseconds,timeMark){
    let displayElement=crearElementos();
    setInterval(function(){
        let tiempoRestante = timeMark-new Date()+miliseconds;
        displayElement.innerText = calcularDisplay(tiempoRestante);
        console.log(tiempoRestante);
    },1000);
}
function crearElementos(){
    let block = crearElemento('div',['class','block'],contenedor,"");
    block.setAttribute('id',blockId);
    let displayTime = crearElemento('div',['class','display-time'],block,"");
    let displayButtons = crearElemento('div',['class','display-buttons'],block,"");
    let cuentaRegresiva = crearElemento('p',[],displayTime,"Problemas aca");
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
function calcularDisplay(tiempo){
	let dias = Math.floor(Math.abs(tiempo/1000/3600/24));
	let horas = Math.floor(Math.abs(tiempo/1000/3600) % 24);
	let minutos = Math.floor(Math.abs(tiempo/1000/60) % 60);
	let segundos = Math.floor(Math.abs(tiempo/1000) % 60);
    let signo = tiempo >= 0 ? "" : "-"
	return signo+dias+" Días	"+signo+horas+" h : "+signo+minutos+" min : "+signo+segundos+" sec";
}