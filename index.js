const express = require("express")

const port = 4000
const app = express();

class Jugador {
    constructor(nombre, edad, id) {
        this.nombre = nombre;
        this.edad = edad;
        this.id = id;
    }
}

let jugadores = [];

app.get("/create", (req, res) => {
    const { nombre, edad } = req.query;

    const id = jugadores.length + 1;

    const jugador = new Jugador(nombre, edad, id);
    jugadores.push(jugador);

    console.log(jugadores);

    res.setHeader('Access-Control-Allow-Origin', '*')

    res.send(`Jugador ${jugador.nombre} creado con éxito!`)
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})
