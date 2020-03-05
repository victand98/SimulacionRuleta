$().ready(function () {
    $("#form").submit(e => {
        e.preventDefault();
        var juego1 = parseInt($('#juego1').val());
        var juego2 = parseInt($('#juego2').val());
        var juego3 = parseInt($('#juego3').val());
        var juego4 = parseInt($('#juego4').val());
        var repeticiones = parseInt($('#repeticiones').val());

        var resultado1 = obtenerResultado(repeticiones,
            () => juego1 === 1 ? apuestaRojoNegro(rojas) : apuestaRojoNegro(negras));
        console.log('\n1. Apuesta al Rojo o Negro\n', resultado1);

        var resultado2 = obtenerResultado(repeticiones, () => apuestaUnNumero(juego2));
        console.log('2. Apuesta un Número\n', resultado2);

        var resultado3 = obtenerResultado(repeticiones,
            () => juego3 === 1 ? apuestaMartingala(rojas) : apuestaMartingala(negras));
        console.log('3. Apuesta de Martingala\n', resultado3);

        var resultado4 = obtenerResultado(repeticiones,
            () => juego4 === 1 ? apuestaLabouchere(rojas) : apuestaLabouchere(negras));
        console.log('4. Apuesta de Labouchere\n', resultado4);
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
function apuestaLabouchere(conjunto) {
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