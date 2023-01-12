const min = 1
const max = 3
let ataqueJugador
let ataqueEnemigo
let resultado
let vidasMascota = 3
let vidasEnemigo = 3

function iniciarJuego() {
    let botonMascota = document.getElementById("boton-mascota")
    botonMascota.addEventListener("click", seleccionarMascota)
    let botonFuego = document.getElementById("ataque-fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("ataque-agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("ataque-tierra")
    botonTierra.addEventListener("click", ataqueTierra)
}

function seleccionarMascota() {
    let input1 = document.getElementById("hipodoge")
    let input2 = document.getElementById("capipepo")
    let input3 = document.getElementById("ratigueya")
    let spanMascota = document.getElementById("span-mascota")

    if (input1.checked) {
        spanMascota.innerHTML = "Hipodoge"
    } else if (input2.checked) {
        spanMascota.innerHTML = "Capipepo"
    } else if (input3.checked) {
        spanMascota.innerHTML = "Ratigueya"
    } else {
        alert("Selecciona una mascota!")
    }

    seleccionarMascotaRival()
}

function seleccionarMascotaRival() {
    let numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min)
    let spanMascotaRival = document.getElementById("span-mascota-rival")
    let spanVidas = document.getElementById("vidas-mascota")
    let spanVidasRival = document.getElementById('vidas-mascotas-rival')

    if (numeroAleatorio === 1) {
        spanMascotaRival.innerHTML = "Hipodoge"
    } else if (numeroAleatorio === 2) {
        spanMascotaRival.innerHTML = "Capipepo"
    } else {
        spanMascotaRival.innerHTML = "Ratigueya"
    }

    spanVidas.innerHTML = vidasMascota
    spanVidasRival.innerHTML = vidasEnemigo

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
    let spanVidas = document.getElementById("vidas-mascota")
    let spanVidasRival = document.getElementById('vidas-mascotas-rival')
    
    if (ataqueJugador == ataqueEnemigo) {
        // alert("Vaya... Ha sido un empate!")
        resultado = "Vaya... Ha sido un empate!"
    } else if ((ataqueJugador == "Fuego!" && ataqueEnemigo == "Tierra!") || (ataqueJugador == "Agua!" && ataqueEnemigo == "Fuego!") || (ataqueJugador == "Tierra!" && ataqueEnemigo == "Agua!") ) {
        // victorias = victorias + 1
        // alert("Que buena suerte! Haz ganado!")
        vidasEnemigo--
        spanVidas.innerHTML = vidasMascota
        spanVidasRival.innerHTML = vidasEnemigo
        resultado = "Que buena suerte! Haz ganado!"
    } else {
        // derrotas = derrotas + 1
        // alert("Será para la próxima... Haz perdido")
        vidasMascota--
        spanVidas.innerHTML = vidasMascota
        spanVidasRival.innerHTML = vidasEnemigo
        resultado = "Será para la próxima... Haz perdido"
    }

    crearMensaje()
}

function crearMensaje() {
    let mensajes = document.getElementById("mensajes")
    let parrafo = document.createElement("p")
    parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + " el rival atacó con " + ataqueEnemigo + " " + resultado
    mensajes.appendChild(parrafo)
}

window.addEventListener("load", iniciarJuego)