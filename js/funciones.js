const seccionAtaque = document.getElementById("seleccion-ataque")
const botonReinicio = document.getElementById("reiniciar")
const botonTierra = document.getElementById("ataque-tierra")
const botonAgua = document.getElementById("ataque-agua")
const botonFuego = document.getElementById("ataque-fuego")
const botonMascota = document.getElementById("boton-mascota")
const input1 = document.getElementById("hipodoge")
const input2 = document.getElementById("capipepo")
const input3 = document.getElementById("ratigueya")
const spanMascota = document.getElementById("span-mascota")
const spanMascotaRival = document.getElementById("span-mascota-rival")
const spanVidas = document.getElementById("vidas-mascota")
const spanVidasRival = document.getElementById('vidas-mascotas-rival')
const seccionMascotas = document.getElementById("seleccion-mascota")
const mensajes = document.getElementById("resultado")
const ataqueMascota = document.getElementById("ataque-mascota")
const ataqueMascotaRival = document.getElementById("ataque-mascota-rival")
const contenedorCartas = document.getElementById("contenedor-cartas")

const min = 1
const max = 3
let mokepones = []
let mokeponesPorMostrar
let ataqueJugador
let ataqueEnemigo
let resultado
let vidasMascota = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, imagen, vidas) {
        this.nombre = nombre
        this.imagen = imagen
        this.vidas = vidas
        this.ataques = [] 
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5)
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5)
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5)

hipodoge.ataques.push(
    {name: "💧", id: "ataque-agua"},
    {name: "💧", id: "ataque-agua"},
    {name: "💧", id: "ataque-agua"},
    {name: "🔥", id: "ataque-fuego"},
    {name: "🌱", id: "ataque-tierra"}
)

capipepo.ataques.push(
    {name: "🌱", id: "ataque-tierra"},
    {name: "🌱", id: "ataque-tierra"},
    {name: "🌱", id: "ataque-tierra"},
    {name: "🔥", id: "ataque-fuego"},
    {name: "💧", id: "ataque-agua"}
)

ratigueya.ataques.push(
    {name: "🔥", id: "ataque-fuego"},
    {name: "🔥", id: "ataque-fuego"},
    {name: "🔥", id: "ataque-fuego"},
    {name: "🌱", id: "ataque-tierra"},
    {name: "💧", id: "ataque-agua"}
)

mokepones.push(hipodoge, capipepo, ratigueya)

// console.log(mokepones, "los mokepones")

function iniciarJuego() {
    console.log(mokepones, "Los mokepones")
    mokepones.forEach((mokepon) => {
        mokeponesPorMostrar = `
        <div class="card-mascotas">
            <input type="radio" name="mascota" id=${mokepon.nombre}/>
            <label class="label-mascotas" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.imagen} alt=${mokepon.nombre}>
            </label>
        </div>
        `
        contenedorCartas.innerHTML += mokeponesPorMostrar
    })
    
    botonMascota.addEventListener("click", seleccionarMascota)
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
    botonReinicio.addEventListener("click", reinicioVideojuego)
    seccionAtaque.style.display = "none"
    botonReinicio.style.display = "none"
}

function seleccionarMascota() {

    if (input1.checked) {
        spanMascota.innerHTML = "Hipodoge"
    } else if (input2.checked) {
        spanMascota.innerHTML = "Capipepo"
    } else if (input3.checked) {
        spanMascota.innerHTML = "Ratigueya"
    } else {
        alert("Selecciona una mascota!")
        return
    }

    seleccionarMascotaRival()
}

function seleccionarMascotaRival() {
    let numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min)
    
    if (numeroAleatorio === 1) {
        spanMascotaRival.innerHTML = "Hipodoge"
    } else if (numeroAleatorio === 2) {
        spanMascotaRival.innerHTML = "Capipepo"
    } else {
        spanMascotaRival.innerHTML = "Ratigueya"
    }
    
    spanVidas.innerHTML = vidasMascota
    spanVidasRival.innerHTML = vidasEnemigo
    seccionAtaque.style.display = "flex"
    seccionMascotas.style.display = "none"

}

function ataqueFuego() {
    ataqueJugador = "Fuego!"
    // alert(ataqueJugador)
    ataqueEnemigoAleatorio()
}

function ataqueAgua() {
    ataqueJugador = "Agua!"
    // alert(ataqueJugador)
    ataqueEnemigoAleatorio()
}

function ataqueTierra() {
    ataqueJugador = "Tierra!"
    // alert(ataqueJugador)
    ataqueEnemigoAleatorio() 
}

function ataqueEnemigoAleatorio() {
    let numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min)
    if (numeroAleatorio === 1) {
        ataqueEnemigo = "Fuego!"
        // alert("Que ardiente!")
    } else if (numeroAleatorio === 2) {
        // alert("Que presión!")
        ataqueEnemigo = "Agua!"
    } else {
        // alert("Que poderoso!")
        ataqueEnemigo = "Tierra!"
    }

    combate()
}

function combate() {
    
    if (ataqueJugador == ataqueEnemigo) {
        // alert("Vaya... Ha sido un empate!")
        resultado = "Vaya... Ha sido un empate!"
    } else if ((ataqueJugador == "Fuego!" && ataqueEnemigo == "Tierra!") || (ataqueJugador == "Agua!" && ataqueEnemigo == "Fuego!") || (ataqueJugador == "Tierra!" && ataqueEnemigo == "Agua!") ) {
        vidasEnemigo--
        spanVidas.innerHTML = vidasMascota
        spanVidasRival.innerHTML = vidasEnemigo
        resultado = "Que buena suerte! Haz ganado!"
    } else {
        vidasMascota--
        spanVidas.innerHTML = vidasMascota
        spanVidasRival.innerHTML = vidasEnemigo
        resultado = "Será para la próxima... Haz perdido"
    }

    crearMensaje()
    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("Genial! Haz ganado")
    } else if (vidasMascota == 0) {
        crearMensajeFinal("Que mal, Haz perdido!")
    }
}

function crearMensaje() {
    let parrafo = document.createElement("p")
    let parrafoDos = document.createElement("p")
    parrafo.innerHTML = ataqueJugador
    ataqueMascota.appendChild(parrafo)
    // parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + " el rival atacó con " + ataqueEnemigo + " " + resultado
    parrafoDos.innerHTML = ataqueEnemigo
    ataqueMascotaRival.appendChild(parrafoDos)
    mensajes.innerHTML = resultado
}

function crearMensajeFinal(mensaje) {
    mensajes.innerHTML = mensaje

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    botonReinicio.style.display = "block"
}

function reinicioVideojuego() {
    location.reload()
}

window.addEventListener("load", iniciarJuego)