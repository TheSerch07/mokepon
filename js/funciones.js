function iniciarJuego() {
    let botonMascota = document.getElementById("boton-mascota")
    botonMascota.addEventListener("click", seleccionarMascota)
}

function seleccionarMascota() {
    let input1 = document.getElementById("hipodoge")
    let input2 = document.getElementById("capipepo")
    let input3 = document.getElementById("ratigueya")

    if (input1.checked) {
        alert("Haz seleccionado al poderoso Hipodoge")
    } else if (input2.checked) {
        alert("Haz seleccionado al magnifico Capipepo")
    } else if (input3.checked) {
        alert("Haz seleccionado a la grandiosa Ratigueya")
    } else {
        alert("Selecciona una mascota!")
    }
}

window.addEventListener("load", iniciarJuego)