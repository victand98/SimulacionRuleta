// Funcion para obtener un resultado randómico en el intervalo [min, max]
const getRandomResult = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Funcion para obtener el promedio en un arreglo de números
const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;