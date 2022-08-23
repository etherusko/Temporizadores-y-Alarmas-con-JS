const contenedor = document.getElementById("display");

function btnPlayOnClick(){
    console.log("Se ha pulsado el botón Play");
}
function btnReiniciarOnClick(){
    console.log("Se ha pulsado el botón Reiniciar");
}
function btnBorrarOnClick(){
    console.log("Se ha pulsado el botón Borrar");
}
function btnCrearNuevoOnClick(){
    let block = document.createElement('div');
    let displayTime = document.createElement('div');
    let cuentaRegresiva = document.createElement('p'); 
    block.setAttribute('class','block') 
    displayTime.setAttribute('class', 'display-time');
    cuentaRegresiva.innerText="Un texto simpaticon";

    displayTime.appendChild(cuentaRegresiva);
    block.appendChild(displayTime);
    contenedor.appendChild(block);

    console.log("Se ha pulsado el botón Crear Nuevo");
}

