$().ready(function () {
    $("#form").submit(e => {
        e.preventDefault();
        // Recogiendo Datos del formulario
        var juego1 = parseInt($('#juego1').val());
        var juego2 = parseInt($('#juego2').val());
        var juego3 = parseInt($('#juego3').val());
        var juego4 = parseInt($('#juego4').val());
        var juego4_lista = $('#juego4_lista').val().map(x => parseInt(x));
        var repeticiones = parseInt($('#repeticiones').val());

        // Juego a
        var resultado1 = obtenerResultado(repeticiones,
            () => juego1 === 1 ? apuestaRojoNegro(rojas) : apuestaRojoNegro(negras));
        // console.log('\n1. Apuesta al Rojo o Negro\n', resultado1);
        // Criterios de comparación
        var crt1Res1 = gananciasEsperadas(resultado1);
        var crt2Res1 = proporcionGanar(resultado1);
        var crt3Res1 = tiempoEsperado(resultado1);
        var crt4Res1 = maxPerdida(resultado1);
        var crt5Res1 = maxGanancia(resultado1);
        // Mostrando Resultado
        var elemento1 = $('#resultado1');
        mostrarResultado(elemento1, repeticiones, crt1Res1, crt2Res1, crt3Res1, crt4Res1, crt5Res1);


        // Juego b
        var resultado2 = obtenerResultado(repeticiones, () => apuestaUnNumero(juego2));
        // console.log('2. Apuesta un Número\n', resultado2);
        // Criterios de comparación
        var crt1Res2 = gananciasEsperadas(resultado2);
        var crt2Res2 = proporcionGanar(resultado2);
        var crt3Res2 = tiempoEsperado(resultado2);
        var crt4Res2 = maxPerdida(resultado2);
        var crt5Res2 = maxGanancia(resultado2);
        // Mostrando Resultado
        var elemento2 = $('#resultado2');
        mostrarResultado(elemento2, repeticiones, crt1Res2, crt2Res2, crt3Res2, crt4Res2, crt5Res2);

        // Juego c
        var resultado3 = obtenerResultado(repeticiones,
            () => juego3 === 1 ? apuestaMartingala(rojas) : apuestaMartingala(negras));
        // console.log('3. Apuesta de Martingala\n', resultado3);
        // Criterios de comparación
        var crt1Res3 = gananciasEsperadas(resultado3);
        var crt2Res3 = proporcionGanar(resultado3);
        var crt3Res3 = tiempoEsperado(resultado3);
        var crt4Res3 = maxPerdida(resultado3);
        var crt5Res3 = maxGanancia(resultado3);
        // Mostrando Resultado
        var elemento3 = $('#resultado3');
        mostrarResultado(elemento3, repeticiones, crt1Res3, crt2Res3, crt3Res3, crt4Res3, crt5Res3);

        // Juego d
        var resultado4 = obtenerResultado(repeticiones,
            () => juego4 === 1 ? apuestaLabouchere(rojas, juego4_lista) : apuestaLabouchere(negras, juego4_lista));
        // console.log('4. Apuesta de Labouchere\n', resultado4);
        // Criterios de comparación
        var crt1Res4 = gananciasEsperadas(resultado4);
        var crt2Res4 = proporcionGanar(resultado4);
        var crt3Res4 = tiempoEsperado(resultado4);
        var crt4Res4 = maxPerdida(resultado4);
        var crt5Res4 = maxGanancia(resultado4);
        // Mostrando Resultado
        var elemento4 = $('#resultado4');
        mostrarResultado(elemento4, repeticiones, crt1Res4, crt2Res4, crt3Res4, crt4Res4, crt5Res4);
    });
});

/*
Declarando constantes globales que contienen
las casillas de la ruleta
*/
const rojas = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const negras = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

/*
    Sistemas de Juego
    Formas de Apuesta
*/

// 1. Apuesta al Rojo
function apuestaRojoNegro(conjunto) {
    // Código aquí
    var ganancia = 0;
    var resultado = getRandomResult(0, 37);
    if (conjunto.indexOf(resultado) < 0) ganancia--;
    else ganancia++;
    return { ganancia: ganancia, nroApuestas: 1 }
}

// 2. Apuesta por un número
function apuestaUnNumero(numero) {
    // Código aquí
    var ganancia = 0;
    var resultado = getRandomResult(0, 37);
    if (resultado != numero) ganancia--;
    else ganancia = 35;
    return { ganancia: ganancia, nroApuestas: 1 }
}

// 3. Apuesta mediante el sistema de Martingala
function apuestaMartingala(conjunto) {
    // Código aquí
    var apuesta = 1;
    var ganancia = 0;
    var nroApuestas = 0;
    for (nroApuestas; apuesta <= 100; nroApuestas++) {
        var resultado = getRandomResult(0, 37);
        if (conjunto.indexOf(resultado) < 0) {
            ganancia -= apuesta;
            apuesta *= 2;
        } else {
            ganancia += apuesta;
            apuesta = 1;
        }
        if (ganancia >= 10) break;
    }
    return { ganancia: ganancia, nroApuestas: nroApuestas }
}

// 4. Apuesta mediante el sistema de Labouchere
function apuestaLabouchere(conjunto, lista) {
    // Código aquí

    return { ganancia: 0, nroApuestas: 0 }
}


/*
    Obteniendo los resultados de la ejecución
    de los distintos tipos de juego
*/

function obtenerResultado(repeticiones, func) {
    var result = [];
    for (let i = 0; i < repeticiones; i++)
        result.push(func());
    return result;
}

/*
    Criterios de comparación
*/

// Las ganancias esperadas por juego
function gananciasEsperadas(resultado) {
    return average(resultado.map(x => x.ganancia > 0 ? x.ganancia : 0));
}

// La proporción de juegos que ganas
function proporcionGanar(resultado) {
    return resultado.filter(x => x.ganancia > 0).length;
}

// El tiempo de juego esperado por juego
function tiempoEsperado(resultado) {
    return average(resultado.map(x => x.nroApuestas));
}

// La cantidad máxima que puedes perder
function maxPerdida(resultado) {
    return Math.min(...resultado.map(x => x.ganancia));
}

// La cantidad máxima que puedes ganar
function maxGanancia(resultado) {
    return Math.max(...resultado.map(x => x.ganancia));
}

/*
    Mostrando los resultados de los criterios de comparación
*/
function mostrarResultado(elemento, repeticiones, crt1, crt2, crt3, crt4, crt5) {
    var html = `<small><b>${repeticiones} ${(repeticiones > 1) ? `repeticiones` : `repetición`}</b></small><br>`;
    html += `<span>Ganancia Esperada: </span><b>$ ${redondear(crt1, 2)}</b><br>`;
    html += `<span>Proporcion de juegos Ganados: </span><b>${crt2} de ${repeticiones}</b><br>`;
    html += `<span>Tiempo de juego Esperado: </span><b>${crt3} ${(crt3 > 1) ? `apuestas` : `apuesta`}</b><br>`;
    html += `<span>Cantidad máxima que se puede perder: </span><b>$ ${redondear(crt4, 2)}</b><br>`;
    html += `<span>Cantidad máxima que se puede ganar: </span><b>$ ${redondear(crt5, 2)}</b>`;
    elemento.html(html);
}