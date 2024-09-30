const express = require('express')
const app = express()
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const { infoLenguajes } = require('./src/lenguajesFrontBack');
let miJson = JSON.stringify(infoLenguajes);

//console.log(infoLenguajes.frontend[1])

console.log(typeof infoLenguajes)
console.log(typeof miJson)
//console.log(miJson)

//console.log(infoLenguajes)


//GET que accede a la raiz
app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo! Bienvenido al server con express!</h1>')
})

app.get('/api', (req, res) => {
    console.log("entrando a api")
    res.send('<h1> ENTRANDO EN /API</h1>')
})

app.get('/api/lenguajes/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify(infoLenguajes));
})

app.get('/api/lenguajes/frontend', (req, res) => {
    //res.send(infoLenguajes.frontend);
    res.send(JSON.stringify(infoLenguajes.frontend));
})

app.get('/api/lenguajes/frontend/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje.toLocaleLowerCase();
    console.log(` el lenguaje que recibe por parametro es: ${lenguaje}`)
    const filtrado = infoLenguajes.frontend.filter(
        //(lenguajes) => { lenguajes.nombre === lenguaje }
        lenguajes => lenguajes.nombre.toLocaleLowerCase() === lenguaje
    )

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el curso con lenguaje: ${lenguaje}`)
    }

    res.status(200).send(filtrado);

})



// Ruta para obtener los lenguajes de backend
app.get('/api/lenguajes/backend', (req, res) => {
    res.json(infoLenguajes.backend);
});


// Endpoint para filtrar lenguajes de backend por nombre
app.get('/api/lenguajes/backend/:lenguaje', (req, res) => {
    const lenguajeBuscado = req.params.lenguaje.toLowerCase();
    console.log(`El lenguaje que recibe por parámetro es: ${lenguajeBuscado}`);
    
    // Filtrar lenguajes de backend
    const filtrado = infoLenguajes.backend.filter(lenguaje => 
        lenguaje.nombre.toLowerCase() === lenguajeBuscado
    );

    // Manejar el caso en que no se encuentra el lenguaje
    if (filtrado.length === 0) {
        return res.status(404).send(`No se encontró el lenguaje de backend: ${lenguajeBuscado}`);
    }

    // Devolver los lenguajes filtrados
    res.status(200).json(filtrado);
});

//Filtrar lenguajes de BackEnd por turno
app.get('/api/lenguajes/backend/:turno', (req, res) => {
    const turnoBuscado = req.params.turno.toLowerCase(); 
    console.log(`El turno que recibe por parámetro es: ${turnoBuscado}`);

    const filtrado = infoLenguajes.backend.filter(lenguaje => 
        lenguaje.turno.toLowerCase() === turnoBuscado
    );

    if (filtrado.length === 0) {
        return res.status(404).send(`No se encontró ningún lenguaje de backend con el turno: ${turnoBuscado}`);
    }

    res.status(200).json(filtrado);
});


// Endpoint para filtrar lenguajes de frontend por turno
app.get('/api/lenguajes/frontend/:turno', (req, res) => {
    const turnoBuscado = req.params.turno.toLowerCase(); 
    console.log(`El turno que recibe por parámetro es: ${turnoBuscado}`);
    
    const filtrado = infoLenguajes.frontend.filter(lenguaje => 
        lenguaje.turno.toLowerCase() === turnoBuscado
    );

    if (filtrado.length === 0) {
        return res.status(404).send(`No se encontró ningún lenguaje de frontend con el turno: ${turnoBuscado}`);
    }

    res.status(200).json(filtrado);
});



// Endpoint para filtrar lenguajes de Backend por turno
app.get('/api/lenguajes/backend/:cantidadAlumnos', (req, res) => {
    const cantidadAlumnosBuscado = parseInt(req.params.cantidadAlumnos); // Convertir a número
    console.log(`La cantidad de alumnos que recibe por parámetro es: ${cantidadAlumnosBuscado}`);
    
    const filtrado = infoLenguajes.backend.filter(lenguaje => 
        lenguaje.cantidadAlumnos === cantidadAlumnosBuscado 
    );

    if (filtrado.length === 0) {
        return res.status(404).send(`No se encontró ningún lenguaje de backend con cantidad de alumnos: ${cantidadAlumnosBuscado}`);
    }

    res.status(200).json(filtrado);
});

app.get('/api/lenguajes/:cantidadAlumnos', (req, res) => {
    const cantidadAlumnosBuscado = parseInt(req.params.cantidadAlumnos); // Convertir a número
    console.log(`La cantidad de alumnos buscada es: ${cantidadAlumnosBuscado}`);
    
    const frontendFiltrado = infoLenguajes.frontend.filter(lenguaje => 
        lenguaje.cantidadAlumnos >= cantidadAlumnosBuscado 
    );

    const backendFiltrado = infoLenguajes.backend.filter(lenguaje => 
        lenguaje.cantidadAlumnos >= cantidadAlumnosBuscado 
    );

    const todosLosLenguajes = [...frontendFiltrado, ...backendFiltrado];

    if (todosLosLenguajes.length === 0) {
        return res.status(404).send(`No se encontró ningún lenguaje con cantidad de alumnos mayor o igual a: ${cantidadAlumnosBuscado}`);
    }

    res.status(200).json(todosLosLenguajes);
});



app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});
