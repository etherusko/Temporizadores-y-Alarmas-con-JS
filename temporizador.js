const contenedor = document.getElementById("display");
const fuenteAudio = 'https://sonidosmp3.net/wp-content/uploads/2020/10/jungle.mp3';
const inputs = Array.from(document.getElementsByClassName("constructor-inputs")[0].children);
let blockId = 0;
let inetervals = []; //[[Interval,boolean,boolean,time]]

/*<<<----Botones individuales para cada contador---->>>*/
/*
 * intervals = [n,4]
 * La lógica de las funciones 'onClick' se apoya de las variables almasenadas en el array intervals:
 * [i,0] contiene el intervalo asignado al contador con id=i+1 (de esta manera cada contador es manejado por un intervalo
 * de manera independiente)
 * [i,1] y [i,2] son booleanos que permiten la funcionalidad de los botones de "play" y "reiniciar"
 * [i,3] almasena el tiempo original de cada contador (importante para poder reiniciar)
 * 
 * El funcionamiento de los botónes se realiza mediante funciones 'onClick' asignadas en el
 * método crearElementos() y definidas para cada tipo de botón a continuación:
 * El elemento (e) que se pasa como parámetro es el propio bloque creado en ese mismo método, y
 * es el elemento html que contiene al contador incluyendo botones y display
 * (a cada bloque se le asigna un id tras su creación utilizando la variable BlockId)
 */

/*Botón Play/Pause*/
/**
 * El botón play/pause detiene y reanuda la cuenta regresiva
 */
function btnPlayOnClick(e){
    let thisButton = e.children[1].children[0];
    thisButton.innerText = thisButton.innerText == "Play" ? "Pause" : "Play";
    console.log("Se ha pulsado el botón Play",e);
    inetervals[+e.id-1][1] = inetervals[+e.id-1][1] == false ? true : false;
}

/*Botón Reiniciar*/
/**
 * El botón reiniciar devuelve la cuenta regresiva a su tiempo original
 */
function btnReiniciarOnClick(e){
    console.log("Se ha pulsado el botón Reiniciar");
    inetervals[+e.id-1][2] = true;
}
/*Botón Borrar*/
/**
 * El botón borrar elimina el elemento html y el intervalo que gestiona el funcionamiento
 * de un contador.
 */
function btnBorrarOnClick(e){
    contenedor.removeChild(e);
    clearInterval(inetervals[+e.id-1][0]);    
    console.log("Se ha pulsado el botón Borrar",e,e.id);
}

/*<<<----Boton de interface para crear elementos---->>>*/
/**
 * Botón Crear Nuevo:
 * AL Hacer Click en el botón Crear-Nuevo se activa la función btnCrearNuevoOnClick()
 * leerInputs() capturan los inputs del documento HTML y calcula la cantidad de segundos
 * crearContador() se encarga de construir un temporizador y todos los elementos que lo componen
 * blockId cuantifica e identifica los temporizadores construidos.
 */ 
function btnCrearNuevoOnClick(){
    let tiempo = leerInputs(inputs);
    blockId+=1;
    crearContador(tiempo);
    console.log("Se ha pulsado el botón Crear Nuevo");
}
function leerInputs(inputs){
    /**COMENT
     * Esta función lee los valores de los elementos input del documento html y los multiplica por su atributo 'factor'
     * convirtiendo así días,horas,minutos a segundos.
     * 
     * Recíbe como argumento un array con los elementos input
     * 
     * Suma todas las cantidades en la variable "tiempo" y resetea los valores.
     * 
     * Regresa la cantidad de segundos calculados.
     */
    let tiempo = 0;
    inputs.forEach(element => {
        tiempo += (element.value * element.getAttribute('factor'));
        element.value = "";
    });
    return tiempo;
}
function crearContador(segundos){
    let tiempo = segundos;
    let elementsBlock=crearElementos(tiempo);
    let audio = elementsBlock.children[1].children[3];
    let ineterval = setInterval(function(){
        //Cuenta regresiva de segundos
        if(inetervals[+elementsBlock.id-1][1]){
        segundos-=1;}
        //Reinicio a la suma oríginal del conteo de segundos (Botón reiniciar)
        if(inetervals[+elementsBlock.id-1][2]){
            segundos=inetervals[+elementsBlock.id-1][3];
            inetervals[+elementsBlock.id-1][2] = false;
        }
        console.log(segundos); // Depuracion
        //Activación de alarma al llegar a 0 la cuenta regresiva
        if(segundos <= 0){
            audio.play();
        }
        // Display en frontend de la cuenta regresiva
        elementsBlock.children[0].children[0].innerText = calcularMensaje(segundos);
    },1000);
    /**
     * Parametrizacipn inicial de los intervalos generados
     * Cada temporisador tiene asociado su propia función intervalo
     * Así mismo quedan ordenados en una matriz, para poder hubicarlos y operarlos o cesarlos
     */
    inetervals.push([ineterval,true,false,tiempo]);
}
function crearElementos(t){
    /**
     * Se generan uno a uno todos los elementos html que conforman un temporizador en el frontend
     * Para eso se crea la función crearElemento() que recibe todos los parámetros necesarios para
     * crear los elementos, escribirles una clase, asignarles un elemento padre y escribir el innerText.
     * 
     * Algunos elementos como los botones requieren atributos extra que se agregan de forma independiente
     * con el métofo setAttribute() es así como se asignan las funciones de evento 'onclick'
     * 
     * A su vez las funciones de evento 'onclick' pasan como argumento el elemento padre de todo el bloque
     * que conforma el temporizador. De esta forma tenemos un fácil acceso a todos los elementos creados dentro
     * del scope de las funciones 'onclick'
     */
    let block = crearElemento('div',['class','block'],contenedor,"");
    block.setAttribute('id',blockId);
    let displayTime = crearElemento('div',['class','display-time'],block,"");
    let displayButtons = crearElemento('div',['class','display-buttons'],block,"");
    let cuentaRegresiva = crearElemento('p',[],displayTime,calcularMensaje(t));
    let btnPlay = crearElemento('button',['class', 'display-btn'],displayButtons,"Pause");
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
    let mesage = tiempo>=1 ? signo+tiempo : tiempo;
    return mesage;
}