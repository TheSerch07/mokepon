const express = require("express");
const cors = require("cors");

const port = 4000;
const app = express();

app.use(express.json());
app.use(cors());

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

    res.send(`Jugador ${jugador.nombre} creado con éxito!`)
})

app.post("/mokepon/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, edad } = req.body;


})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})