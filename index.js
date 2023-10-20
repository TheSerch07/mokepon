const express = require("express");
const cors = require("cors");

const port = 4000;
const app = express();

app.use(express.json());
app.use(cors());

class Jugador {
    constructor(nombre, id) {
        this.nombre = nombre;
        this.id = id;
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon;
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

let jugadores = [];

app.get("/create", (req, res) => {
    const id = jugadores.length + 1;
    
    res.send(id.toString());
})

app.post("/mokepon/:id/:nombre", (req, res) => {
    const { id } = req.params;
    const { nombre } = req.params;
    const { mokepon } = req.body;
    
    const mokeponNuevo = new Mokepon(mokepon);
    const jugador = new Jugador(nombre, id);
    jugador.asignarMokepon(mokeponNuevo);
    jugadores.push(jugador);
    console.log(jugadores);
    res.end();
})

app.post("/mokepon/:id/position", (req, res) => {

    
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})