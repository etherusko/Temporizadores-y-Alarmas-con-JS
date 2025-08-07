const contenedor = document.getElementById("display");
const fuenteAudio = 'https://sonidosmp3.net/wp-content/uploads/2020/10/jungle.mp3';
const inputs = Array.from(document.getElementsByClassName("constructor-inputs")[0].children);

/*Botón Play/Pause*/
function btnPlayOnClick(block){
    const btn = block.querySelector(".button_play")
    btn.innerText = btn.innerText == "Play" ? "Pause" : "Play";
    console.log("Se ha pulsado el botón Play",block);
}

/*Botón Reiniciar*/
function btnReiniciarOnClick(block){
    console.log("Se ha pulsado el botón Reiniciar");
}

/*<<<----Boton de interface para crear elementos---->>>*/
/**
 * Botón Crear Nuevo:
 * AL Hacer Click en el botón Crear-Nuevo se activa la función btnCrearNuevoOnClick()
 * leerInputs() capturan los inputs del documento HTML y calcula la cantidad de segundos
 * crearContador() clona template y crea un nuevo contador con los segundos calculados
 */ 

function leerInputs(inputs){
    let tiempo = 0;
    inputs.forEach(element => {
        tiempo += (element.value * element.getAttribute('factor'));
        element.value = "";
    });
    return tiempo;
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
    let mesage = tiempo>=1 ? signo+tiempo : tiempo;
    return mesage;
}