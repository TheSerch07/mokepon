const min = 1
const max = 3
let ataqueJugador
let ataqueEnemigo

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

    if (numeroAleatorio === 1) {
        spanMascotaRival.innerHTML = "Hipodoge"
    } else if (numeroAleatorio === 2) {
        spanMascotaRival.innerHTML = "Capipepo"
    } else {
        spanMascotaRival.innerHTML = "Ratigueya"
    }
}

function ataqueFuego() {
    ataqueJugador = "Que ardiente!"
    alert(ataqueJugador)
    ataqueEnemigoAleatorio()
}

function ataqueAgua() {
    ataqueJugador = "Que presión!"
    alert(ataqueJugador)
    ataqueEnemigoAleatorio()
}

function ataqueTierra() {
    ataqueJugador = "Que poderoso!"
    alert(ataqueJugador)
    ataqueEnemigoAleatorio()
}

function ataqueEnemigoAleatorio() {
    let numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min)
    if (numeroAleatorio === 1) {
        alert("Que ardiente!")
    } else if (numeroAleatorio === 2) {
        alert("Que presión!")
    } else {
        alert("Que poderoso!")
    }
}

window.addEventListener("load", iniciarJuego)