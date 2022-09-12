const contenedor = document.getElementById("display");
const fuenteAudio = 'https://sonidosmp3.net/wp-content/uploads/2020/10/jungle.mp3';
let blockId = 0;
let inetervals = []; //[[Interval,boolean,boolean,time]]

/**
 * Botón Play/Pause  *******************************************************
 */
function btnPlayOnClick(e){
    let thisButton = e.children[1].children[0];
    thisButton.innerText = thisButton.innerText == "Play" ? "Pause" : "Play";
    console.log("Se ha pulsado el botón Play");
    inetervals[+e.id-1][1] = inetervals[+e.id-1][1] == false ? true : false;
}
/**
 * Botón Reiniciar  *******************************************************
 */
function btnReiniciarOnClick(e){
    console.log("Se ha pulsado el botón Reiniciar");
    inetervals[+e.id-1][2] = true;
}
/**
 * Botón Borrar     *******************************************************
 */
function btnBorrarOnClick(e){
    contenedor.removeChild(e);
    clearInterval(inetervals[+e.id-1][0]);    
    console.log("Se ha pulsado el botón Borrar",e,e.id);
}
/**
 * Botón Crear Nuevo *******************************************************
 */ 
function btnCrearNuevoOnClick(){
    blockId+=1;
    let segundos = leerInputs(); 
    crearContador(segundos);
    console.log("Se ha pulsado el botón Crear Nuevo");
}
function leerInputs(){
    let dias = document.getElementById("inputDays").value*3600*24;
    let horas = document.getElementById("inputHours").value*3600;
    let minutos = document.getElementById("inputMinuts").value*60;
    let segundos = document.getElementById("inputSeconds").value*1;
    let tiempo = dias+horas+minutos+segundos;
    document.getElementById("inputDays").value = "";
    document.getElementById("inputHours").value = "";
    document.getElementById("inputMinuts").value = "";
    document.getElementById("inputSeconds").value = "";
    return tiempo;
}
function crearContador(segundos){
    let m = calcularMensaje(segundos);
    let elementsBlock=crearElementos(m);
    let audio = elementsBlock.children[1].children[3];
    let ineterval = setInterval(function(){
        
        if(inetervals[+elementsBlock.id-1][1]){
        segundos-=1;}
        if(inetervals[+elementsBlock.id-1][2]){
            segundos=inetervals[+elementsBlock.id-1][3];
            inetervals[+elementsBlock.id-1][2] = false;
        }
        console.log(segundos); // Depuracion
        if(segundos <= 0){
            audio.play();
        }
        elementsBlock.children[0].children[0].innerText = calcularMensaje(segundos);
    },1000);
    inetervals.push([ineterval,true,false,segundos]);
}
function crearElementos(m){
    let block = crearElemento('div',['class','block'],contenedor,"");
    block.setAttribute('id',blockId);
    let displayTime = crearElemento('div',['class','display-time'],block,"");
    let displayButtons = crearElemento('div',['class','display-buttons'],block,"");
    let cuentaRegresiva = crearElemento('p',[],displayTime,m);
    let btnPlay = crearElemento('button',['class', 'display-btn'],displayButtons,"Pause");
    btnPlay.setAttribute('id','btnPlay'+blockId)
    btnPlay.setAttribute('onclick',`btnPlayOnClick(document.getElementById(${blockId}))`);
    let btnReiniciar = crearElemento('button',['class', 'display-btn'],displayButtons,"Reiniciar");
    btnReiniciar.setAttribute('onclick',`btnReiniciarOnClick(document.getElementById(${blockId}))`);
    let btnBorrar = crearElemento('button',['class', 'display-btn'],displayButtons,"Borrar");
    btnBorrar.setAttribute('onclick',`btnBorrarOnClick(document.getElementById(${blockId}))`);
    let audio =crearElemento('audio',['src',fuenteAudio],displayButtons,"");
    audio.setAttribute('loop','true');
    return block;
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
	let dias = calcularDisplay(tiempo/3600/24,signo);
	let horas = calcularDisplay((tiempo/3600)%24,signo);
	let minutos = calcularDisplay((tiempo/60)%60,signo);
    let segundos = calcularDisplay((tiempo%60),signo);
	return dias+" Días	"+horas+" h : "+minutos+" min : "+segundos+" sec"; 
}
function calcularDisplay(t,signo){
    let tiempo = ('0'+ Math.floor(Math.abs(t))).slice(-2);
    let m = tiempo>=1 ? signo+tiempo : tiempo;
    return m;
}