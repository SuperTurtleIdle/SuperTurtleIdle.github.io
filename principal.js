//muere eslint
/* eslint-env es6 */
/* eslint-disable */


var jugador = {
    "monedas": {
        cantidad: 0,
        porSegundo: 0,
        porClick: 500,
        mejoras: 1,
    },
    "recursos": {
        cantidad: 0,
        porSegundo: 0,
        mejoras: 1,
    },
    "alimento": {
        cantidad: 0,
        porSegundo: 0,
        mejoras: 1,
    },
    "energia": {
        cantidad: 0,
        porSegundo: 0,
        mejoras: 1,
    },
    "almacenamiento": {
        cantidad: 5000,
        mejoras: 1
    },
};

const growRate = 1.07;

var edificios = {
    //monedas
    "Hard Currency": {
        cantidad: 0,
        precioActualAlimento: 100,
        precioBaseAlimento: 100,
        idBoton: "mEdificio1B",
        textoCantidad: "mEdificio1T",
        textoPrecio: "mEdificio1PT",
        textoProduccion: "mEdificio1P",
        textoPorcentaje: "mEdificio1TP",
        produccionMonedasBase: 5,
        mejoras: 1
    },
    "Communal Life": {
        cantidad: 0,
        precioActualRecursos: 1100,
        precioBaseRecursos: 1100,
        idBoton: "mEdificio2B",
        textoCantidad: "mEdificio2T",
        textoPrecio: "mEdificio2PT",
        textoProduccion: "mEdificio2P",
        textoPorcentaje: "mEdificio2TP",
        produccionMonedasBase: 20,
        mejoras: 1
    },
    "Handicraft": {
        cantidad: 0,
        precioActualEnergia: 50,
        precioBaseEnergia: 50,
        idBoton: "mEdificio3B",
        textoCantidad: "mEdificio3T",
        textoPrecio: "mEdificio3PT",
        textoProduccion: "mEdificio3P",
        textoPorcentaje: "mEdificio3TP",
        produccionMonedasBase: 15600,
        mejoras: 1
    },
    "Turtle Beliefs": {
        cantidad: 0,
        precioActualAlimento: 50,
        precioBaseAlimento: 50,
        idBoton: "mEdificio4B",
        textoCantidad: "mEdificio4T",
        textoPrecio: "mEdificio4PT",
        textoProduccion: "mEdificio4P",
        textoPorcentaje: "mEdificio4TP",
        produccionMonedasBase: 15600,
        mejoras: 1
    },
    "Empire Zealotry": {
        cantidad: 0,
        precioActualRecursos: 1100,
        precioBaseRecursos: 1100,
        idBoton: "mEdificio5B",
        textoCantidad: "mEdificio5T",
        textoPrecio: "mEdificio5PT",
        textoProduccion: "mEdificio5P",
        textoPorcentaje: "mEdificio5TP",
        produccionMonedasBase: 20,
        mejoras: 1
    },
    "Money Printer": {
        cantidad: 0,
        precioActualEnergia: 50,
        precioBaseEnergia: 50,
        idBoton: "mEdificio3B",
        textoCantidad: "mEdificio6T",
        textoPrecio: "mEdificio6PT",
        textoProduccion: "mEdificio6P",
        textoPorcentaje: "mEdificio6TP",
        produccionMonedasBase: 15600,
        mejoras: 1
    },
    "TurtleLand": {
        cantidad: 0,
        precioActualAlimento: 100,
        precioBaseAlimento: 100,
        idBoton: "mEdificio1B",
        textoCantidad: "mEdificio7T",
        textoPrecio: "mEdificio7PT",
        textoProduccion: "mEdificio7P",
        textoPorcentaje: "mEdificio7TP",
        produccionMonedasBase: 5,
        mejoras: 1
    }, //recursos
    "Wood Chopping": {
        cantidad: 0,
        precioActualMonedas: 1500,
        precioBaseMonedas: 1500,
        idBoton: "rEdificio1B",
        textoCantidad: "rEdificio1T",
        textoPrecio: "rEdificio1PT",
        textoProduccion: "rEdificio1P",
        textoPorcentaje: "rEdificio1TP",
        produccionRecursosBase: 1,
        mejoras: 1
    },
    "Stone Mining": {
        cantidad: 0,
        precioActualMonedas: 225700,
        precioBaseMonedas: 225700,
        idBoton: "rEdificio2B",
        textoCantidad: "rEdificio2T",
        textoPrecio: "rEdificio2PT",
        textoProduccion: "rEdificio2P",
        textoPorcentaje: "rEdificio2TP",
        produccionRecursosBase: 50,
        mejoras: 1
    },
    "Tree Harvest": {
        cantidad: 0,
        precioActualMonedas: 225700,
        precioBaseMonedas: 225700,
        idBoton: "rEdificio2B",
        textoCantidad: "rEdificio3T",
        textoPrecio: "rEdificio3PT",
        textoProduccion: "rEdificio3P",
        textoPorcentaje: "rEdificio3TP",
        produccionRecursosBase: 50,
        mejoras: 1
    },
    "Automatisation": {
        cantidad: 0,
        precioActualMonedas: 225700,
        precioBaseMonedas: 225700,
        idBoton: "rEdificio2B",
        textoCantidad: "rEdificio4T",
        textoPrecio: "rEdificio4PT",
        textoProduccion: "rEdificio4P",
        textoPorcentaje: "rEdificio4TP",
        produccionRecursosBase: 50,
        mejoras: 1
    },
    "Asteroid Crusher": {
        cantidad: 0,
        precioActualMonedas: 225700,
        precioBaseMonedas: 225700,
        idBoton: "rEdificio2B",
        textoCantidad: "rEdificio5T",
        textoPrecio: "rEdificio5PT",
        textoProduccion: "rEdificio5P",
        textoPorcentaje: "rEdificio5TP",
        produccionRecursosBase: 50,
        mejoras: 1
    },
    "World Partition": {
        cantidad: 0,
        precioActualMonedas: 225700,
        precioBaseMonedas: 225700,
        idBoton: "rEdificio2B",
        textoCantidad: "rEdificio6T",
        textoPrecio: "rEdificio6PT",
        textoProduccion: "rEdificio6P",
        textoPorcentaje: "rEdificio6TP",
        produccionRecursosBase: 50,
        mejoras: 1
    }, //alimento
    "Bow Hunting": {
        cantidad: 0,
        precioActualMonedas: 20,
        precioBaseMonedas: 20,
        idBoton: "cEdificio1B",
        textoCantidad: "cEdificio1T",
        textoPrecio: "cEdificio1PT",
        textoProduccion: "cEdificio1P",
        textoPorcentaje: "cEdificio1TP",
        produccionAlimentoBase: 1,
        mejoras: 1
    },
    "Croissant Trap": {
        cantidad: 0,
        precioActualMonedas: 55000,
        precioBaseMonedas: 55000,
        idBoton: "cEdificio2B",
        textoCantidad: "cEdificio2T",
        textoPrecio: "cEdificio2PT",
        textoProduccion: "cEdificio2P",
        textoPorcentaje: "cEdificio2TP",
        produccionAlimentoBase: 1,
        mejoras: 1
    },
    "Agriculture": {
        cantidad: 0,
        precioActualMonedas: 55000,
        precioBaseMonedas: 55000,
        idBoton: "cEdificio3B",
        textoCantidad: "cEdificio3T",
        textoPrecio: "cEdificio3PT",
        textoProduccion: "cEdificio3P",
        textoPorcentaje: "cEdificio3TP",
        produccionAlimentoBase: 1,
        mejoras: 1
    },
    "Turtle Grandma": {
        cantidad: 0,
        precioActualMonedas: 55000,
        precioBaseMonedas: 55000,
        idBoton: "cEdificio4B",
        textoCantidad: "cEdificio4T",
        textoPrecio: "cEdificio4PT",
        textoProduccion: "cEdificio4P",
        textoPorcentaje: "cEdificio4TP",
        produccionAlimentoBase: 1,
        mejoras: 1
    },
    "Husbandry": {
        cantidad: 0,
        precioActualMonedas: 55000,
        precioBaseMonedas: 55000,
        idBoton: "cEdificio5B",
        textoCantidad: "cEdificio5T",
        textoPrecio: "cEdificio5PT",
        textoProduccion: "cEdificio5P",
        textoPorcentaje: "cEdificio5TP",
        produccionAlimentoBase: 1,
        mejoras: 1
    },
    "Avocadium": {
        cantidad: 0,
        precioActualMonedas: 55000,
        precioBaseMonedas: 55000,
        idBoton: "cEdificio6B",
        textoCantidad: "cEdificio6T",
        textoPrecio: "cEdificio6PT",
        textoProduccion: "cEdificio6P",
        textoPorcentaje: "cEdificio6TP",
        produccionAlimentoBase: 1,
        mejoras: 1
    }, //energia
    "Coffee": {
        cantidad: 0,
        precioActualMonedas: 85900,
        precioBaseMonedas: 85900,
        idBoton: "eEdificio1B",
        textoCantidad: "eEdificio1T",
        textoPrecio: "eEdificio1PT",
        textoProduccion: "eEdificio1P",
        textoPorcentaje: "eEdificio1TP",
        produccionEnergiaBase: 1,
        mejoras: 1
    },
    "Kite Generator": {
        cantidad: 0,
        precioActualMonedas: 770500,
        precioBaseMonedas: 770500,
        idBoton: "eEdificio2B",
        textoCantidad: "eEdificio2T",
        textoPrecio: "eEdificio2PT",
        textoProduccion: "eEdificio2P",
        textoPorcentaje: "eEdificio2TP",
        produccionEnergiaBase: 50,
        mejoras: 1
    },
    "Potato Battery": {
        cantidad: 0,
        precioActualMonedas: 770500,
        precioBaseMonedas: 770500,
        idBoton: "eEdificio3B",
        textoCantidad: "eEdificio3T",
        textoPrecio: "eEdificio3PT",
        textoProduccion: "eEdificio3P",
        textoPorcentaje: "eEdificio3TP",
        produccionEnergiaBase: 50,
        mejoras: 1
    },
    "Canned Lightning": {
        cantidad: 0,
        precioActualMonedas: 770500,
        precioBaseMonedas: 770500,
        idBoton: "eEdificio4B",
        textoCantidad: "eEdificio4T",
        textoPrecio: "eEdificio4PT",
        textoProduccion: "eEdificio4P",
        textoPorcentaje: "eEdificio4TP",
        produccionEnergiaBase: 50,
        mejoras: 1
    },
    "Carbon Burning": {
        cantidad: 0,
        precioActualMonedas: 770500,
        precioBaseMonedas: 770500,
        idBoton: "eEdificio5B",
        textoCantidad: "eEdificio5T",
        textoPrecio: "eEdificio5PT",
        textoProduccion: "eEdificio5P",
        textoPorcentaje: "eEdificio5TP",
        produccionEnergiaBase: 50,
        mejoras: 1
    },
    "Turtle Generator": {
        cantidad: 0,
        precioActualMonedas: 770500,
        precioBaseMonedas: 770500,
        idBoton: "eEdificio6B",
        textoCantidad: "eEdificio6T",
        textoPrecio: "eEdificio6PT",
        textoProduccion: "eEdificio6P",
        textoPorcentaje: "eEdificio6TP",
        produccionEnergiaBase: 50,
        mejoras: 1
    }, //almacenamiento
    "Big Ol' Cave": {
        cantidad: 0,
        precioActualMonedas: 12200,
        precioBaseMonedas: 12200,
        idBoton: "aEdificio1B",
        textoCantidad: "aEdificio1T",
        textoPrecio: "aEdificio1PT",
        textoProduccion: "aEdificio1P",
        plusAlmacenamientoBase: 1000,
        mejoras: 1
    },
    "Clay Pottery": {
        cantidad: 0,
        precioActualMonedas: 375900,
        precioBaseMonedas: 375900,
        idBoton: "aEdificio2B",
        textoCantidad: "aEdificio2T",
        textoPrecio: "aEdificio2PT",
        textoProduccion: "aEdificio2P",
        plusAlmacenamientoBase: 25000,
        mejoras: 1
    },
    "Straw Basket": {
        cantidad: 0,
        precioActualMonedas: 375900,
        precioBaseMonedas: 375900,
        idBoton: "aEdificio3B",
        textoCantidad: "aEdificio3T",
        textoPrecio: "aEdificio3PT",
        textoProduccion: "aEdificio3P",
        plusAlmacenamientoBase: 25000,
        mejoras: 1
    },
    "Warehouse": {
        cantidad: 0,
        precioActualMonedas: 375900,
        precioBaseMonedas: 375900,
        idBoton: "aEdificio4B",
        textoCantidad: "aEdificio4T",
        textoPrecio: "aEdificio4PT",
        textoProduccion: "aEdificio4P",
        plusAlmacenamientoBase: 25000,
        mejoras: 1
    },
    "Floppy Disk": {
        cantidad: 0,
        precioActualMonedas: 375900,
        precioBaseMonedas: 375900,
        idBoton: "aEdificio5B",
        textoCantidad: "aEdificio5T",
        textoPrecio: "aEdificio5PT",
        textoProduccion: "aEdificio5P",
        plusAlmacenamientoBase: 25000,
        mejoras: 1
    },
    "Variable": {
        cantidad: 0,
        precioActualMonedas: 375900,
        precioBaseMonedas: 375900,
        idBoton: "aEdificio6B",
        textoCantidad: "aEdificio6T",
        textoPrecio: "aEdificio6PT",
        textoProduccion: "aEdificio6P",
        plusAlmacenamientoBase: 25000,
        mejoras: 1
    },
};

var mejoras = {
    //click
    "Extra Petting Hand": {
        nombre: "Extra Petting Hand",
        imagen: '<img src = "img/src/mejoras/click/1PettingHand.png">',
        precio: 1200,
        descripcion: 'Increases the Turtle Coin reward of clicking by +10.\n"We are definitely going to need more hands."',
        etiqueta: "Common Upgrade",
        ID: 1,
        efecto: 'jugador.monedas.porClick += 10',
        visible: 0,
        comprado: 0

    },
    "Turtle Tucker": {
        nombre: "Turtle Tucker",
        imagen: '<img src = "img/src/mejoras/click/2TurtleTucker.png">',
        precio: 3300,
        descripcion: 'Increases the Turtle Coin reward of clicking by +20.',
        etiqueta: "Common Upgrade",
        ID: 2,
        efecto: 'jugador.monedas.porClick += 20',
        visible: 0,
        comprado: 0

    },
};

var estadisticas = {
    tiempoJugado: 0,
    startedSince: 0,
    cantidadEdificiosTotal: 0,
    cantidadMejorasTotal: 0,
    clickCount: 0,
    totalSegundos: 0,
};


//-----------al cargarse la pagina-----------
document.addEventListener('DOMContentLoaded', function () {
    for (let edificio in edificios) {
        actualizarContadoresEdificios(edificio);
        acutalizarRecursosSegundo(edificio);
        actualizarPorcentajeRecursos(edificio);
    }
    actualizarContadores();
});



//------------Al hacer click a la tortuga---------------

let clickCooldown = false;


//actualiza todos los contadores que tengan la key "cantidad" en jugador
function actualizarContadores() {
    function actualizarContador(elementId, cantidad) {
        var contador = document.getElementById(elementId);
        if (contador) {
            // Convertir cantidad a número antes de usar el método toFixed()
            cantidad = parseFloat(cantidad); // O parseInt(cantidad, 10) si quieres un número entero.
            contador.textContent = cantidad >= 9999999 ?
                cantidad.toExponential(3) : cantidad.toFixed(0);
        }
    }

    actualizarContador("contadorMonedas", jugador.monedas.cantidad);
    actualizarContador("contadorRecursos", jugador.recursos.cantidad);
    actualizarContador("contadorAlimento", jugador.alimento.cantidad);
    actualizarContador("contadorEnergia", jugador.energia.cantidad);
    actualizarContador("contadorAlmacenamiento", jugador.almacenamiento.cantidad);
    actualizarContador("contadorAlmacenamiento2", jugador.almacenamiento.cantidad);
    actualizarContador("contadorAlmacenamiento3", jugador.almacenamiento.cantidad);
    actualizarContador


}

document.getElementById("tortugaClick").onclick = function () {
    if (!clickCooldown) {

        //Randomiza la img de la tortuga
        estadisticas.clickCount++;
        if (estadisticas.clickCount % 6 === 0) {
            const randomImageIndex = Math.floor(Math.random() * 11) + 1;
            const imagePath = "img/src/tortugasdefault/img" + randomImageIndex + ".png";
            document.getElementById("tortugaClick").src = imagePath
        }

        //modifica monedas tortuga
        jugador.monedas.cantidad += jugador.monedas.porClick * jugador.monedas.mejoras;

        //actualiza el contador de monedas
        actualizarContadores();

        //animacion del contador de monedas
        let animText = document.getElementById("contadorMonedas")
        animText.style.padding = "1%"
        animText.style.fontSize = "1.2vw"
        animText.style.transition = "0.05s"
        setTimeout(function () {
            animText.style.fontSize = "0.98vw"
            animText.style.padding = "0%";
        }, 100);

        //animacion de la tortuga
        let animTortuga = document.getElementById("tortugaClick")
        animTortuga.style.padding = "8%"
        animTortuga.style.transition = "0.07s ease-out"
        setTimeout(function () {
            animTortuga.style.padding = "0%";
        }, 100);


        //crear div texto + animacion de texto
        if (opciones.opcionClickV === 0) {

            var textoClick1 = document.createElement('div');
            textoClick1.className = 'textoClick';
            textoClick1.style.left = (event.clientX + (window.scrollX || window.pageXOffset) - 10) + 'px';
            textoClick1.style.top = (event.clientY + (window.scrollY || window.pageYOffset) - 40) + 'px';

            jugador.monedas.porClick > 9999999 ? textoClick1.innerHTML = '<p>+' + (jugador.monedas.porClick * jugador.monedas.mejoras).toExponential(3) + '</p><img src="img/icon/tCoin.png">' : textoClick1.innerHTML = '<p>+' + (jugador.monedas.porClick * jugador.monedas.mejoras).toFixed(0) + '</p><img src="img/icon/tCoin.png">';

        }

        document.body.appendChild(textoClick1);

        setTimeout(function () {
            textoClick1.remove();
        }, 490);



        //animacion de cursor grab
        this.style.cursor = "grabbing";
        setTimeout(function () {
            this.style.cursor = "grab";
        }.bind(this), 100);

        clickCooldown = true;
        setTimeout(function () {
            clickCooldown = false;
        }, 120);









    }
};

//playtime counter
function sumarSegundo() {


    function actualizarContador() {
        estadisticas.totalSegundos++;

        const horas = Math.floor(estadisticas.totalSegundos / 3600);
        const minutos = Math.floor((estadisticas.totalSegundos % 3600) / 60);
        const segundos = estadisticas.totalSegundos % 60;

        const mostrarHoras = horas.toString().padStart(2, '0');
        const mostrarMinutos = minutos.toString().padStart(2, '0');
        const mostrarSegundos = segundos.toString().padStart(2, '0');

        document.getElementById("estadisticaPlaytime").textContent = `${mostrarHoras}h ${mostrarMinutos}m ${mostrarSegundos}s`;
    }

    setInterval(actualizarContador, 1000);
}

sumarSegundo();

//-----------------------Cada 1s------------------------

setInterval(unSegundo, 1000);

function unSegundo() {


    //actualiza los contadores por segundo

    //recursos
    jugador.recursos.porSegundo > 9999999 ? document.getElementById("contadorRecursosSegundo").textContent = "(+" + jugador.recursos.porSegundo.toExponential(3) + " s)" : document.getElementById("contadorRecursosSegundo").textContent = "(+" + jugador.recursos.porSegundo.toFixed(0) + " s)";

    //alimento
    jugador.alimento.porSegundo > 9999999 ? document.getElementById("contadorAlimentoSegundo").textContent = "(+" + jugador.alimento.porSegundo.toExponential(3) + " s)" : document.getElementById("contadorAlimentoSegundo").textContent = "(+" + jugador.alimento.porSegundo.toFixed(0) + " s)";

    //energia
    jugador.energia.porSegundo > 9999999 ? document.getElementById("contadorEnergiaSegundo").textContent = "(+" + jugador.energia.porSegundo.toExponential(3) + " s)" : document.getElementById("contadorEnergiaSegundo").textContent = "(+" + jugador.energia.porSegundo.toFixed(0) + " s)";

    //almacen

    jugador.almacenamiento.cantidad > 9999999 ? document.getElementById("contadorAlmacenamiento").textContent = jugador.almacenamiento.cantida.toExponential(3) : document.getElementById("contadorAlmacenamiento").textContent = jugador.almacenamiento.cantidad.toFixed(0);



    //actualiza los contadores
    actualizarContadores();

    //cap de recursos
    if (jugador.recursos.cantidad >= jugador.almacenamiento.cantidad) {
        jugador.recursos.cantidad = jugador.almacenamiento.cantidad;
        document.getElementById("contadorRecursos").style.color = "coral";
    } else {
        document.getElementById("contadorRecursos").style.color = "white";
    }

    //actualiza los recursos WIP!!!!!!
    jugador.monedas.cantidad += jugador.monedas.porSegundo * jugador.monedas.mejoras;
    jugador.recursos.cantidad += jugador.recursos.porSegundo * jugador.recursos.mejoras;
    jugador.alimento.cantidad += jugador.alimento.porSegundo * jugador.alimento.mejoras;
    jugador.energia.cantidad += jugador.energia.porSegundo * jugador.energia.mejoras;



    //actualizacion de estadisticas

    sumarCantidadEdificios(edificios);
    estadisticas.cantidadEdificiosTotal = sumarCantidadEdificios(edificios);

    sumarCantidadMejoras(mejoras);
    estadisticas.cantidadMejorasTotal = sumarCantidadMejoras(mejoras);

    document.getElementById("estadisticaClicks").textContent = estadisticas.clickCount;
    document.getElementById("estadisticaEdificiosTotal").textContent = estadisticas.cantidadEdificiosTotal;
    document.getElementById("estadisticaMejorasTotal").textContent = estadisticas.cantidadMejorasTotal;








}


//-------Pestañas de edificios--------------

//este codigo solia ocupar 450 linias de codigo lo dejo aqui marcado por si alguna vez me siento inutil

function cambiarPanel(panelName, buttonName) {
    var panel = document.getElementById(panelName);
    var button = document.getElementById(buttonName);

    if (panel.style.display === "none") {
        var panels = ["panelBanco", "panelComida", "panelRecursos", "panelEnergia", "panelAlmacenamiento"];
        var buttons = ["botonCategoriaBanco", "botonCategoriaAlimento", "botonCategoriaRecursos", "botonCategoriaEnergia", "botonCategoriaAlmacenamiento"];

        for (var i = 0; i < buttons.length; i++) {
            var btnName = buttons[i];
            var btn = document.getElementById(btnName);
            btn.style.background = btnName === buttonName ? "#4f4054" : "#31313D";
        }

        for (var j = 0; j < panels.length; j++) {
            var pnlName = panels[j];
            var pnl = document.getElementById(pnlName);
            if (pnlName !== panelName && pnl.style.display !== "none") {
                pnl.style.animation = "desvanecerPanel 0.4s";
                setTimeout(function (pnl) {
                    pnl.style.display = "none";
                }, 100, pnl);
            }
        }

        setTimeout(function () {
            panel.style.animation = "aparecerPanel 0.2s ease";
            panel.style.display = "flex";
        }, 200);
    }
}

document.getElementById("botonCategoriaBanco").addEventListener("click", function () {
    cambiarPanel("panelBanco", "botonCategoriaBanco");
});

document.getElementById("botonCategoriaAlimento").addEventListener("click", function () {
    cambiarPanel("panelComida", "botonCategoriaAlimento");
});

document.getElementById("botonCategoriaRecursos").addEventListener("click", function () {
    cambiarPanel("panelRecursos", "botonCategoriaRecursos");
});

document.getElementById("botonCategoriaEnergia").addEventListener("click", function () {
    cambiarPanel("panelEnergia", "botonCategoriaEnergia");
});

document.getElementById("botonCategoriaAlmacenamiento").addEventListener("click", function () {
    cambiarPanel("panelAlmacenamiento", "botonCategoriaAlmacenamiento");
});


//--------------Funcionalidad teclas por defecto------------------

//deshabilita la funcion del click derecho
/*
window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

//deshabilita shortcuts (deshabilitado para testing)

 window.addEventListener("keydown", function (e) {
    e.preventDefault();
}); */

//--------------------comprar edificios--------codigo sarnoso como te odio------------
multiplicadorCompra = 1;

let animationActive = false;

//si gpt me ayudara esto no pasaria
//dios santo arregla esto
const animacionCompraEdificio = 'if(!animationActive){animationActive=true;var element=this;setTimeout(function(){element.style.animation="none";animationActive=false},200);void element.offsetWidth;element.style.animation="buyAnimation 0.2s"}';

const animacionNoCompraEdificio = 'if(!animationActive){animationActive=true;var element=this;setTimeout(function(){element.style.animation="none";animationActive=false},200);void element.offsetWidth;element.style.animation="noBuyAnimation 0.2s"}';

const animacionBuyUpgrade = 'if(!animationActive){animationActive=true;var element=this;setTimeout(function(){element.style.animation="none";animationActive=false},200);void element.offsetWidth;element.style.animation="buyUpgradeAnimation 0.1s"}';

// si alguien te pregunta esta es la formula
// edificios[edificio].precioActualMonedas = edificios[edificio].precioBaseMonedas * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate);

//prometo reemplazar los elseif por switch algun dia

//esto maneja los recursos/s, la actualizacion de el (+x/s) y el porcentaje de produccion
function actualizarTextoRecursos(edificio) {

    if ('produccionRecursosBase' in edificios[edificio]) {

        produccionBase = edificios[edificio].produccionRecursosBase;
        jugador.recursos.porSegundo += produccionBase * edificios[edificio].mejoras * multiplicadorCompra;
        acutalizarRecursosSegundo(edificio);
        document.getElementById("contadorRecursosSegundo").style.fontSize = "1vw";
        setTimeout(function () {
            document.getElementById("contadorRecursosSegundo").style.fontSize = "0.8vw";
        }, 50);

    } else if ('produccionMonedasBase' in edificios[edificio]) {

        produccionBase = edificios[edificio].produccionMonedasBase;
        jugador.monedas.porSegundo += produccionBase * edificios[edificio].mejoras * multiplicadorCompra;
        acutalizarRecursosSegundo(edificio);



    } else if ('produccionAlimentoBase' in edificios[edificio]) {

        produccionBase = edificios[edificio].produccionAlimentoBase;
        jugador.alimento.porSegundo += produccionBase * edificios[edificio].mejoras * multiplicadorCompra;
        acutalizarRecursosSegundo(edificio);
        document.getElementById("contadorAlimentoSegundo").style.fontSize = "1vw";
        setTimeout(function () {
            document.getElementById("contadorAlimentoSegundo").style.fontSize = "0.8vw";
        }, 50);

    } else if ('produccionEnergiaBase' in edificios[edificio]) {

        produccionBase = edificios[edificio].produccionEnergiaBase;
        jugador.energia.porSegundo += produccionBase * edificios[edificio].mejoras * multiplicadorCompra;
        acutalizarRecursosSegundo(edificio);
        document.getElementById("contadorEnergiaSegundo").style.fontSize = "1vw";
        setTimeout(function () {
            document.getElementById("contadorEnergiaSegundo").style.fontSize = "0.8vw";
        }, 50);

    } else if ('plusAlmacenamientoBase' in edificios[edificio]) {

        produccionBase = edificios[edificio].plusAlmacenamientoBase;
        jugador.almacenamiento.cantidad += produccionBase * edificios[edificio].mejoras * multiplicadorCompra;
        acutalizarRecursosSegundo(edificio);
        document.getElementById("contadorAlmacenamiento").style.fontSize = "1vw";
        document.getElementById("contadorAlmacenamiento2").style.fontSize = "1vw";
        document.getElementById("contadorAlmacenamiento3").style.fontSize = "1vw";
        setTimeout(function () {
            document.getElementById("contadorAlmacenamiento").style.fontSize = "0.8vw";
            document.getElementById("contadorAlmacenamiento2").style.fontSize = "0.8vw";
            document.getElementById("contadorAlmacenamiento3").style.fontSize = "0.8vw";

        }, 50);

    }

    document.getElementById(edificios[edificio].textoProduccion).textContent = '+' + produccionBase * edificios[edificio].mejoras;

};

//esta es la funcion que se llama arriba que actualiza el porcentaje de produccion
function actualizarPorcentajeRecursos(edificio) {
    if ('produccionMonedasBase' in edificios[edificio]) {
        document.getElementById(edificios[edificio].textoPorcentaje).textContent = ((edificios[edificio].produccionMonedasBase * edificios[edificio].mejoras * edificios[edificio].cantidad) / jugador.monedas.porSegundo * 100).toFixed(2) + " %";
    } else if ('produccionRecursosBase' in edificios[edificio]) {
        document.getElementById(edificios[edificio].textoPorcentaje).textContent = ((edificios[edificio].produccionRecursosBase * edificios[edificio].mejoras * edificios[edificio].cantidad) / jugador.recursos.porSegundo * 100).toFixed(2) + " %";
    } else if ('produccionAlimentoBase' in edificios[edificio]) {
        document.getElementById(edificios[edificio].textoPorcentaje).textContent = ((edificios[edificio].produccionAlimentoBase * edificios[edificio].mejoras * edificios[edificio].cantidad) / jugador.alimento.porSegundo * 100).toFixed(2) + " %";
    } else if ('produccionEnergiaBase' in edificios[edificio]) {
        document.getElementById(edificios[edificio].textoPorcentaje).textContent = ((edificios[edificio].produccionEnergiaBase * edificios[edificio].mejoras * edificios[edificio].cantidad) / jugador.energia.porSegundo * 100).toFixed(2) + " %";
    }

}

//esto se llama arriba tambien y hace que se actialice al hacer click en vez de por segundo (que tambien)
function acutalizarRecursosSegundo(edificio) {
    if ('produccionMonedasBase' in edificios[edificio]) {
        jugador.monedas.porSegundo > 9999999 ? document.getElementById("contadorMonedasSegundo").textContent = "(+" + jugador.monedas.porSegundo.toExponential(3) + " s)" : document.getElementById("contadorMonedasSegundo").textContent = jugador.monedas.porSegundo.toFixed(0) + " /s";
    } else if ('produccionRecursosBase' in edificios[edificio]) {
        jugador.recursos.porSegundo > 9999999 ? document.getElementById("contadorRecursosSegundo").textContent = "(+" + jugador.recursos.porSegundo.toExponential(3) + " s)" : document.getElementById("contadorRecursosSegundo").textContent = "(+" + jugador.recursos.porSegundo.toFixed(0) + " s)";
    } else if ('produccionAlimentoBase' in edificios[edificio]) {
        jugador.alimento.porSegundo > 9999999 ? document.getElementById("contadorAlimentoSegundo").textContent = "(+" + jugador.alimento.porSegundo.toExponential(3) + " s)" : document.getElementById("contadorAlimentoSegundo").textContent = "(+" + jugador.alimento.porSegundo.toFixed(0) + " s)";
    } else if ('produccionEnergiaBase' in edificios[edificio]) {
        jugador.energia.porSegundo > 9999999 ? document.getElementById("contadorRecursosSegundo").textContent = "(+" + jugador.energia.porSegundo.toExponential(3) + " s)" : document.getElementById("contadorEnergiaSegundo").textContent = "(+" + jugador.energia.porSegundo.toFixed(0) + " s)";
    } else if ('plusAlmacenamientoBase' in edificios[edificio]) {
        jugador.almacenamiento.cantidad > 9999999 ? document.getElementById("contadorAlmacenamiento").textContent = jugador.almacenamiento.cantidad.toExponential(3) : document.getElementById("contadorAlmacenamiento").textContent = jugador.almacenamiento.cantidad.toFixed(0);
    }
}

function ComprarEdificios(event) {
    for (let edificio in edificios) {
        document.getElementById(edificios[edificio].idBoton).addEventListener("click", function (event) {

            // esto es necesario para la funcion actualizarTextoRecursos
            var produccionBase = 0;
            //

            if ('precioActualMonedas' in edificios[edificio]) {
                //ni idea de por que esto funciona pero lo hace
                if (jugador.monedas.cantidad >= edificios[edificio].precioBaseMonedas * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate)) {

                    jugador.monedas.cantidad -= edificios[edificio].precioActualMonedas;
                    edificios[edificio].cantidad += multiplicadorCompra;
                    actualizarContadoresEdificios(edificio)
                    edificios[edificio].precioActualMonedas = edificios[edificio].precioBaseMonedas * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate);
                    document.getElementById(edificios[edificio].textoCantidad).textContent = edificios[edificio].cantidad;
                    actualizarContadores();
                    actualizarTextoRecursos(edificio);
                    for (let edificio in edificios) {
                        actualizarPorcentajeRecursos(edificio)
                    };
                    eval(animacionCompraEdificio);
                } else {
                    eval(animacionNoCompraEdificio)
                }
            } else if ('precioActualRecursos' in edificios[edificio]) {
                if (jugador.recursos.cantidad >= edificios[edificio].precioBaseRecursos * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate)) {

                    jugador.recursos.cantidad -= edificios[edificio].precioActualRecursos;
                    edificios[edificio].cantidad += multiplicadorCompra;
                    actualizarContadoresEdificios(edificio)
                    edificios[edificio].precioActualRecursos = edificios[edificio].precioBaseRecursos * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate);
                    document.getElementById(edificios[edificio].textoCantidad).textContent = edificios[edificio].cantidad;
                    actualizarContadores();
                    actualizarTextoRecursos(edificio);
                    for (let edificio in edificios) {
                        actualizarPorcentajeRecursos(edificio)
                    };
                    eval(animacionCompraEdificio);
                } else {
                    eval(animacionNoCompraEdificio)
                }
            } else if ('precioActualAlimento' in edificios[edificio]) {
                if (jugador.alimento.cantidad >= edificios[edificio].precioBaseAlimento * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate)) {

                    jugador.alimento.cantidad -= edificios[edificio].precioActualAlimento;
                    edificios[edificio].cantidad += multiplicadorCompra;
                    actualizarContadoresEdificios(edificio)
                    edificios[edificio].precioActualAlimento = edificios[edificio].precioBaseAlimento * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate);
                    document.getElementById(edificios[edificio].textoCantidad).textContent = edificios[edificio].cantidad;
                    actualizarContadores();
                    actualizarTextoRecursos(edificio);
                    for (let edificio in edificios) {
                        actualizarPorcentajeRecursos(edificio)
                    };
                    eval(animacionCompraEdificio);
                } else {
                    eval(animacionNoCompraEdificio)
                }
            } else if ('precioActualEnergia' in edificios[edificio]) {
                if (jugador.energia.cantidad >= edificios[edificio].precioBaseEnergia * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate)) {

                    jugador.energia.cantidad -= edificios[edificio].precioActualEnergia;
                    edificios[edificio].cantidad += multiplicadorCompra;
                    actualizarContadoresEdificios(edificio)
                    edificios[edificio].precioActualEnergia = edificios[edificio].precioBaseEnergia * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate);
                    document.getElementById(edificios[edificio].textoCantidad).textContent = edificios[edificio].cantidad;
                    actualizarContadores();
                    actualizarTextoRecursos(edificio);
                    for (let edificio in edificios) {
                        actualizarPorcentajeRecursos(edificio)
                    };
                    eval(animacionCompraEdificio);
                } else {
                    eval(animacionNoCompraEdificio)
                }
            }
        });
    }
}


ComprarEdificios();


//-------------Selectores de cantidado-----------------

// Función para actualizar los precios de los edificios con el nuevo multiplicador

function cambiarMultiplicador(valor) {
    multiplicadorCompra = valor;

    const fondosBoton = ["#23232D", "#23232D", "#23232D", "#23232D"];
    const index = [1, 10, 100, 1000].indexOf(multiplicadorCompra);
    fondosBoton[index] = "#FD5151";

    [1, 10, 100, 1000].forEach(function (valor, i) {
        document.getElementById("cantidadComprador" + valor + "B").style.background = fondosBoton[i];
    });

}

function actualizarContadoresEdificios(edificio) {


    if ('precioActualMonedas' in edificios[edificio]) {
        edificios[edificio].precioActualMonedas = edificios[edificio].precioBaseMonedas * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate);
        edificios[edificio].precioActualMonedas > 9999999 ? document.getElementById(edificios[edificio].textoPrecio).textContent = edificios[edificio].precioActualMonedas.toExponential(3) :
            document.getElementById(edificios[edificio].textoPrecio).textContent = edificios[edificio].precioActualMonedas.toFixed(0);
    } else if ('precioActualRecursos' in edificios[edificio]) {
        edificios[edificio].precioActualRecursos = edificios[edificio].precioBaseRecursos * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate);
        edificios[edificio].precioActualRecursos > 9999999 ? document.getElementById(edificios[edificio].textoPrecio).textContent = edificios[edificio].precioActualRecursos.toExponential(3) :
            document.getElementById(edificios[edificio].textoPrecio).textContent = edificios[edificio].precioActualRecursos.toFixed(0);
    } else if ('precioActualAlimento' in edificios[edificio]) {
        edificios[edificio].precioActualAlimento = edificios[edificio].precioBaseAlimento * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate);
        edificios[edificio].precioActualAlimento > 9999999 ? document.getElementById(edificios[edificio].textoPrecio).textContent = edificios[edificio].precioActualAlimento.toExponential(3) :
            document.getElementById(edificios[edificio].textoPrecio).textContent = edificios[edificio].precioActualAlimento.toFixed(0);
    } else if ('precioActualEnergia' in edificios[edificio]) {
        edificios[edificio].precioActualEnergia = edificios[edificio].precioBaseEnergia * (Math.pow(growRate, edificios[edificio].cantidad) - Math.pow(growRate, edificios[edificio].cantidad + multiplicadorCompra)) / (1 - growRate);
        edificios[edificio].precioActualEnergia > 9999999 ? document.getElementById(edificios[edificio].textoPrecio).textContent = edificios[edificio].precioActualEnergia.toExponential(3) :
            document.getElementById(edificios[edificio].textoPrecio).textContent = edificios[edificio].precioActualEnergia.toFixed(0);
    }

}



document.getElementById("cantidadComprador1B").addEventListener("click", function () {
    cambiarMultiplicador(1);
    for (let edificio in edificios) {
        actualizarContadoresEdificios(edificio);
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "Shift" || event.key === "Control" || event.key === "Alt") {
        cambiarMultiplicador(1);
        for (let edificio in edificios) {
            actualizarContadoresEdificios(edificio);
        }
    }
});

document.getElementById("cantidadComprador10B").addEventListener("click", function () {
    cambiarMultiplicador(10);
    for (let edificio in edificios) {
        actualizarContadoresEdificios(edificio);
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Shift") {
        cambiarMultiplicador(10);
        for (let edificio in edificios) {
            actualizarContadoresEdificios(edificio);
        }
    }
});

document.getElementById("cantidadComprador100B").addEventListener("click", function () {
    cambiarMultiplicador(100);
    for (let edificio in edificios) {
        actualizarContadoresEdificios(edificio);
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Control") {
        cambiarMultiplicador(100);
        for (let edificio in edificios) {
            actualizarContadoresEdificios(edificio);
        }
    }
});

document.getElementById("cantidadComprador1000B").addEventListener("click", function () {
    cambiarMultiplicador(1000);
    for (let edificio in edificios) {
        actualizarContadoresEdificios(edificio);
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Alt") {
        cambiarMultiplicador(1000);
        for (let edificio in edificios) {
            actualizarContadoresEdificios(edificio);
        }
    }
});

//------------------mejoras--------------------
//categorias

document.getElementById("contrerUnicas").addEventListener("click", function () {

    if (document.getElementById("panelMUnicas").clientHeight > 0) {
        document.getElementById("panelMUnicas").style.maxHeight = "0";
        document.getElementById("panelMUnicas").style.padding = "0";
    } else {

        document.getElementById("panelMUnicas").style.maxHeight = "100%";
        document.getElementById("panelMUnicas").style.padding = "2%";
    }
});
document.getElementById("contrerComunes").addEventListener("click", function () {

    if (document.getElementById("panelMComunes").clientHeight > 0) {
        document.getElementById("panelMComunes").style.maxHeight = "0";
        document.getElementById("panelMComunes").style.padding = "0";
    } else {

        document.getElementById("panelMComunes").style.maxHeight = "100%";
        document.getElementById("panelMComunes").style.padding = "2%";
    }
});



//aparicion y compra de mejoras
setInterval(crearMejoras, 1000);

function crearMejoras() {
    for (let mejora in mejoras) {
        // cuando el jugador esté al 60% o más del precio total
        if (jugador.monedas.cantidad >= (mejoras[mejora].precio * 0.7) && mejoras[mejora].visible === 0) {
            mejoras[mejora].visible = 1;

            // creacion del div
            const divMejora = document.createElement('div');
            divMejora.id = "mejora" + mejoras[mejora].ID;
            divMejora.className = 'mejoraComunSlot';
            divMejora.innerHTML = mejoras[mejora].imagen;
            divMejora.style.opacity = '0';
            divMejora.style.filter = 'brightness(0.2)';

            if (mejoras[mejora].etiqueta === "Common Upgrade") {
                document.getElementById('panelMComunes').appendChild(divMejora);
            }

            setTimeout(function () {
                divMejora.style.opacity = '1';
            }, 100);

            tooltipMejoras(event);
            comprarMejoras();

        } else {
            // si la mejora ya es visible y monedas = precio, ajustar el brillo nuevamente
            if (document.getElementById("mejora" + mejoras[mejora].ID)) {
                document.getElementById("mejora" + mejoras[mejora].ID).style.filter = 'brightness(' + (jugador.monedas.cantidad >= mejoras[mejora].precio ? '1' : '0.2') + ')';
            }
        }
    }
};

//--------------------tooltips---------------------
//mejoras

function tooltipMejoras(event) {
    for (let mejora in mejoras) {
        let elemento = document.getElementById("mejora" + mejoras[mejora].ID);
        if (elemento) {
            //cuando el raton entra
            elemento.addEventListener('mouseenter', function (event) {


                document.getElementById('tooltipMejora').style.display = "flex";

                const coin = '<img src="img/icon/tCoin.png">';

                document.getElementById("mejoraNombre").textContent = mejoras[mejora].nombre;
                document.getElementById("mejoraPrecio").innerHTML = mejoras[mejora].precio + " " + coin;
                document.getElementById("mejoraTag").textContent = mejoras[mejora].etiqueta;
                document.getElementById("mejoraDescripcion").textContent = mejoras[mejora].descripcion;

                const movingDiv = document.getElementById('tooltipMejora');
                const referenceDiv = document.getElementById("mejora" + mejoras[mejora].ID);

                const referenceRect = referenceDiv.getBoundingClientRect();

                // Obtener las coordenadas (left y top) del div de referencia
                const referenceLeft = referenceRect.left + 30;
                const referenceTop = referenceRect.top - 0;

                // Calcular las nuevas coordenadas para el div que se va a mover
                const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
                const newTop = referenceTop - movingDiv.offsetHeight;

                // Establecer las nuevas coordenadas como estilos del div que se va a mover
                movingDiv.style.left = newLeft + 'px';
                movingDiv.style.top = newTop + 'px';

                if (jugador.monedas.cantidad >= mejoras[mejora].precio) {
                    document.getElementById('mejoraPrecio').style.color = "#7EFF69";
                } else {
                    document.getElementById('mejoraPrecio').style.color = "coral";
                };




            });
            //cuando el raton sale
            elemento.addEventListener('mouseleave', function (event) {

                document.getElementById('tooltipMejora').style.display = "none";

                console.log('El ratón NO está encima del elemento con ID' + mejoras[mejora].ID);
                // Aquí puedes realizar las acciones que desees cuando el ratón esté encima del elemento.

            });


        }
    }
};

tooltipMejoras(event);

function comprarMejoras() {
    for (let mejora in mejoras) {
        let elemento = document.getElementById("mejora" + mejoras[mejora].ID);
        if (elemento) {
            elemento.addEventListener('click', function () {

                if (jugador.monedas.cantidad >= mejoras[mejora].precio && mejoras[mejora].comprado === 0) {


                    jugador.monedas.cantidad -= mejoras[mejora].precio;
                    actualizarContadores();
                    crearMejoras();
                    eval(animacionBuyUpgrade);





                    setTimeout(function () {

                        document.getElementById("mejora" + mejoras[mejora].ID).style.display = "none";
                        eval(mejoras[mejora].efecto);



                    }, 110);

                    mejoras[mejora].comprado = 1;


                } else {

                    eval(animacionNoCompraEdificio);

                }


            })
        }
    }
};

//------------------------OPCIONES----------

var opciones = {
    opcionClickV: 0,
};

document.getElementById("botonOpciones").addEventListener("click", function (event) {
    var opciones = document.getElementById("opciones");
    opciones.style.display = "flex";
    var body = document.getElementById("body");
    body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    body.style.filter = "blur(5px) brightness(0.5)";
    event.stopPropagation(); // Detenemos la propagación del clic para evitar que se cierre inmediatamente debido al evento click en el body.
});

document.getElementById("body").addEventListener("click", function () {
    var opciones = document.getElementById("opciones");
    opciones.style.display = "none";
    var body = document.getElementById("body");
    body.style.backgroundColor = "transparent";
    body.style.filter = "blur(0) brightness(1)";
});



function opcionClick() {
    if (opciones.opcionClickV === 0) {
        opciones.opcionClickV = 1;
        document.getElementById("opcionClickB").textContent = "OFF";
    } else {
        opciones.opcionClickV = 0;
        document.getElementById("opcionClickB").textContent = "ON";

    }

}

//--------------------ESTADISTICAS--------





window.addEventListener('load', function () {
    // Cuando se carga la página, se ejecuta esta función
    var fechaActual = new Date(); // Obtiene la fecha y hora actual
    var fechaTexto = document.getElementById('estadisticaStartDate'); // Obtiene el elemento del párrafo por su ID

    // Formatea la fecha en el formato que desees (por ejemplo, "dd/mm/yyyy hh:mm:ss")
    var fechaFormateada = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;

    // Agrega la fecha formateada al párrafo
    fechaTexto.textContent = fechaFormateada;
});

function sumarCantidadEdificios(edificios) {
    let totalCantidad = 0;

    for (const nombreEdificio in edificios) {
        if (edificios.hasOwnProperty(nombreEdificio)) {
            totalCantidad += edificios[nombreEdificio].cantidad;
        }
    }

    return totalCantidad;
}

function sumarCantidadMejoras(mejoras) {
    let totalCantidad = 0;

    for (const nombreMejoras in mejoras) {
        if (mejoras.hasOwnProperty(nombreMejoras)) {
            totalCantidad += mejoras[nombreMejoras].comprado;
        }
    }

    return totalCantidad;
}


document.getElementById("botonEstadisticas").addEventListener("click", function (event) {
    var opciones = document.getElementById("estadisticas");
    opciones.style.display = "flex";
    var body = document.getElementById("body");
    body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    body.style.filter = "blur(5px) brightness(0.5)";
    event.stopPropagation(); // Detenemos la propagación del clic para evitar que se cierre inmediatamente debido al evento click en el body.
});

document.getElementById("body").addEventListener("click", function () {
    var opciones = document.getElementById("estadisticas");
    opciones.style.display = "none";
    var body = document.getElementById("body");
    body.style.backgroundColor = "transparent";
    body.style.filter = "blur(0) brightness(1)";
});

//traduccion de google

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

//-------------changelog-----------

document.getElementById("botonChangelog").addEventListener("click", function (event) {
    var opciones = document.getElementById("changelog");
    opciones.style.display = "flex";
    var body = document.getElementById("body");
    body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    body.style.filter = "blur(5px) brightness(0.5)";
    event.stopPropagation(); // Detenemos la propagación del clic para evitar que se cierre inmediatamente debido al evento click en el body.
});

document.getElementById("body").addEventListener("click", function () {
    var opciones = document.getElementById("changelog");
    opciones.style.display = "none";
    var body = document.getElementById("body");
    body.style.backgroundColor = "transparent";
    body.style.filter = "blur(0) brightness(1)";
});

//---------------guardado--------------

//autoguardado

function animacionAutosave() {
    const panelAutosave = document.getElementById("panelAutosave");
    panelAutosave.style.animation = "none";
    void panelAutosave.offsetWidth;
    panelAutosave.style.animation = "gameSaved 2s";
    guardarDatos();
}

setInterval(animacionAutosave, 5000);

//guardado

const arrayDatos = [edificios, mejoras, jugador, estadisticas, opciones];

function guardarDatos() {
    const datosJSON = JSON.stringify(arrayDatos);
    localStorage.setItem('savedata', datosJSON);
}


function cargarDatos() {
    const datosGuardados = localStorage.getItem('savedata');
    if (datosGuardados) {
        const objetosRecuperados = JSON.parse(datosGuardados);

        // Update the existing objects with the loaded data
        Object.assign(jugador, objetosRecuperados.jugador);
        Object.assign(edificios, objetosRecuperados.edificios);
        Object.assign(mejoras, objetosRecuperados.mejoras);
        Object.assign(estadisticas, objetosRecuperados.estadisticas);

    }
}

document.addEventListener('DOMContentLoaded', cargarDatos);

function borrarDatos() {
    localStorage.removeItem('savedata');
}
