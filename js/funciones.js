const seccionAtaque = document.getElementById("seleccion-ataque")
const botonReinicio = document.getElementById("reiniciar")
const botonMascota = document.getElementById("boton-mascota")
const spanMascota = document.getElementById("span-mascota")
const spanMascotaRival = document.getElementById("span-mascota-rival")
const spanVidas = document.getElementById("vidas-mascota")
const spanVidasRival = document.getElementById('vidas-mascotas-rival')
const seccionMascotas = document.getElementById("seleccion-mascota")
const mensajes = document.getElementById("resultado")
const ataqueMascota = document.getElementById("ataque-mascota")
const ataqueMascotaRival = document.getElementById("ataque-mascota-rival")
const contenedorCartas = document.getElementById("contenedor-cartas")
const contenedorAtaques = document.getElementById("contenedor-botones-ataque")

const min = 0
const max = 2

let botones = []
let botonTierra 
let botonAgua 
let botonFuego
let mascotaJugador 
let input1 = document.getElementById("hipodoge")
let input2 = document.getElementById("capipepo")
let input3 = document.getElementById("ratigueya")
let mokepones = []
let mokeponesPorMostrar
let ataqueJugador = []
let ataqueEnemigo
let resultado
let ataquesMokepon
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
            <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="label-mascotas" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.imagen} alt=${mokepon.nombre}>
            </label>
        </div>
        `
        contenedorCartas.innerHTML += mokeponesPorMostrar

        input1 = document.getElementById("Hipodoge")
        input2 = document.getElementById("Capipepo")
        input3 = document.getElementById("Ratigueya")
    })
    
    botonMascota.addEventListener("click", seleccionarMascota)
    botonReinicio.addEventListener("click", reinicioVideojuego)
    seccionAtaque.style.display = "none"
    botonReinicio.style.display = "none"
}

function seleccionarMascota() {
    
    if (input1.checked) {
        spanMascota.innerHTML = input1.id
        mascotaJugador = input1.id
    } else if (input2.checked) {
        spanMascota.innerHTML = input2.id
        mascotaJugador = input2.id
    } else if (input3.checked) {
        spanMascota.innerHTML = input3.id
        mascotaJugador = input3.id
    } else {
        alert("Selecciona una mascota!")
        return
    }
    
    extraerAtaque(mascotaJugador)
    seleccionarMascotaRival()
}

function extraerAtaque(mascotaJugador) {
    let ataques 
    for (let i = 0 ; i < mokepones.length ; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    // console.log(ataques, "ataquesssss")
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque" >
        ${ataque.name}
        </button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon;
    })
    
    botonTierra = document.getElementById("ataque-tierra")
    botonAgua = document.getElementById("ataque-agua")
    botonFuego = document.getElementById("ataque-fuego")

    // botonFuego.addEventListener("click", ataqueFuego)
    // botonAgua.addEventListener("click", ataqueAgua)
    // botonTierra.addEventListener("click", ataqueTierra)
    botones = document.querySelectorAll(".boton-ataque")
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            console.log(e, "El targetttt")
            if (e.target.innerText == "🔥") {
                ataqueJugador.push("Fuego!")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
            } else if (e.target.innerText == "💧") {
                ataqueJugador.push("Agua!")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
            } else {
                ataqueJugador.push("Tierra!")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
            }
        })
    })
}

function seleccionarMascotaRival() {
    let numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min)
    
    console.log(numeroAleatorio, "aleatorio")
    spanMascotaRival.innerHTML = mokepones[numeroAleatorio].nombre
    
    spanVidas.innerHTML = vidasMascota
    spanVidasRival.innerHTML = vidasEnemigo
    seccionAtaque.style.display = "flex"
    seccionMascotas.style.display = "none"
    secuenciaAtaque()
}

// function ataqueFuego() {
//     ataqueJugador = "Fuego!"
//     // alert(ataqueJugador)
//     ataqueEnemigoAleatorio()
// }

// function ataqueAgua() {
//     ataqueJugador = "Agua!"
//     // alert(ataqueJugador)
//     ataqueEnemigoAleatorio()
// }

// function ataqueTierra() {
//     ataqueJugador = "Tierra!"
//     // alert(ataqueJugador)
//     ataqueEnemigoAleatorio() 
// }

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