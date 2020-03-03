$().ready(function () {
    $("#form").submit(e => {
        e.preventDefault();

        var apuesta1 = apuestaAlRojo();
        console.log('1. Apuesta al Rojo\n', apuesta1);

        var apuesta2 = apuestaUnNumero();
        console.log('2. Apuesta un Número\n', apuesta2);

        var apuesta3 = apuestaMartingala();
        console.log('3. Apuesta de Martingala\n', apuesta3);

        var apuesta4 = apuestaLabouchere();
        console.log('4. Apuesta de Labouchere\n', apuesta4);
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
function apuestaAlRojo() {
    // Código aquí
    
    return { ganancia: 0, nroApuestas: 0 }
}

// 2. Apuesta por un número
function apuestaUnNumero() {
    // Código aquí

    return { ganancia: 0, nroApuestas: 0 }
}

// 3. Apuesta mediante el sistema de Martingala
function apuestaMartingala() {
    // Código aquí

    return { ganancia: 0, nroApuestas: 0 }
}

// 4. Apuesta mediante el sistema de Labouchere
function apuestaLabouchere() {
    // Codigo aquí

    return { ganancia: 0, nroApuestas: 0 }
}