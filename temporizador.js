const contenedor = document.getElementById("display");
let blockId = 0;

function btnPlayOnClick(){
    console.log("Se ha pulsado el botón Play");
}
function btnReiniciarOnClick(){
    console.log("Se ha pulsado el botón Reiniciar");
}
function btnBorrarOnClick(e){
    contenedor.removeChild(e);
    console.log("Se ha pulsado el botón Borrar");
}

/**
 * Botón Crear Nuevo
 */ 
function btnCrearNuevoOnClick(){
    blockId+=1;
    crearContador();
    console.log("Se ha pulsado el botón Crear Nuevo");
}
function crearContador(){
    let block = crearElementos('div',['class','block'],contenedor,"");
    block.setAttribute('id',blockId);
    let displayTime = crearElementos('div',['class','display-time'],block,"");
    let displayButtons = crearElementos('div',['class','display-buttons'],block,"");
    let cuentaRegresiva = crearElementos('p',[],displayTime,"Un buen pedazo de texto");
    let btnPlay = crearElementos('button',['class', 'display-btn'],displayButtons,"Play");
    btnPlay.setAttribute('onclick','btnPlayOnClick()');
    let btnReiniciar = crearElementos('button',['class', 'display-btn'],displayButtons,"Reiniciar");
    btnReiniciar.setAttribute('onclick','btnReiniciarOnClick()');
    let btnBorrar = crearElementos('button',['class', 'display-btn'],displayButtons,"Borrar");
    btnBorrar.setAttribute('onclick',`btnBorrarOnClick(document.getElementById(${blockId}))`); 
}
function crearElementos(etiqueta,[atributo,valor],padre,texto){
    let element =document.createElement(etiqueta);
    element.setAttribute(atributo,valor);
    element.innerText = texto;
    padre.appendChild(element);
    return element;
}