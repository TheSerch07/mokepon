const min = 1
const max = 3

function iniciarJuego() {
    let botonMascota = document.getElementById("boton-mascota")
    botonMascota.addEventListener("click", seleccionarMascota)
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

window.addEventListener("load", iniciarJuego)