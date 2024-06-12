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
const sectionVerMapa = document.getElementById("ver-mapa")
const nombreJugador = document.getElementById("nombre")
const mapa = document.getElementById("mapa")
const anchoMaximoMapa = 980

console.dir(nombreJugador, "nombreJugador")

const min = 0
const max = 2

let jugadorId = null
let botones = []
let botonTierra 
let botonAgua 
let botonFuego
let mascotaJugador 
let mascotaJugadorObjeto 
let indexJugador
let indexEnemigo
let input1 = document.getElementById("hipodoge")
let input2 = document.getElementById("capipepo")
let input3 = document.getElementById("ratigueya")
let mokepones = []
let ataqueMokeponesEnemigo
let mokeponesPorMostrar
let ataqueJugador = []
let ataqueEnemigo = []
let resultado
let ataquesMokepon
let victorias = 0
let derrotas = 0
let vidasMascota = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
let alturaBuscada
let anchoDelMapa = window.innerWidth - 20 
mapaBackground.src = "./assets/mokemap.png"

if (anchoDelMapa > anchoMaximoMapa) { 
    anchoDelMapa = anchoMaximoMapa - 20
}

alturaBuscada = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaBuscada

class Mokepon {
    constructor(nombre, imagen, vidas, mapaFoto) {
        this.nombre = nombre
        this.imagen = imagen
        this.vidas = vidas
        this.ataques = [] 
        this.mapaFoto = new Image()
        this.mapaFoto.src = mapaFoto
        this.ancho = 100
        this.alto = 100
        this.x = Math.floor(Math.random() * (mapa.width - this.ancho - 0 + 1) + 0)
        this.y = Math.floor(Math.random() * (mapa.height - this.alto - 0 + 1) + 0)
        this.velocidadY = 0
        this.velocidadX = 0
    }

    pintar() {
        lienzo.drawImage(
            this.mapaFoto, 
            this.x, 
            this.y, 
            this.ancho, 
            this.alto
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png")
let hipodogeEnemigo = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png")
let capipepoEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png")
let ratigueyaEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png")

hipodoge.ataques.push(
    {name: "💧", id: "ataque-agua"},
    {name: "💧", id: "ataque-agua"},
    {name: "💧", id: "ataque-agua"},
    {name: "🔥", id: "ataque-fuego"},
    {name: "🌱", id: "ataque-tierra"}
)

hipodogeEnemigo.ataques.push(
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

capipepoEnemigo.ataques.push(
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

ratigueyaEnemigo.ataques.push(
    {name: "🔥", id: "ataque-fuego"},
    {name: "🔥", id: "ataque-fuego"},
    {name: "🔥", id: "ataque-fuego"},
    {name: "🌱", id: "ataque-tierra"},
    {name: "💧", id: "ataque-agua"}
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
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
    sectionVerMapa.style.display = "none"

    unirseAlJuego()
}

function unirseAlJuego() {

    fetch("http://localhost:4000/create")
        .then((res) => {
            if (res.ok) {
                res.text()
                .then((data) => {
                    console.log(data)
                    jugadorId = data
                })
            }
        })
}

function seleccionarMascota() {
    
    if (nombreJugador.value === "") {
        alert("Ingresa tu nombre!")
        return
    }
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
    
    seleccionarMokepon(mascotaJugador, nombreJugador.value)
    extraerAtaque(mascotaJugador)
    seccionMascotas.style.display = "none"
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador, nombreJugador) {
    console.log(jugadorId, "jugadorId")
    console.log(nombreJugador, "nombreJugador")
    fetch(`http://localhost:4000/mokepon/${jugadorId}/${nombreJugador}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaque(mascotaJugador) {
    let ataques 
    for (let i = 0 ; i < mokepones.length ; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    console.log(ataques, "ataques")
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
                boton.disabled = true
            } else if (e.target.innerText == "💧") {
                ataqueJugador.push("Agua!")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("Tierra!")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }

            ataqueAleatorioEnemigo()
        })
    })
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = Math.floor(Math.random() * (max - min + 1) + min)
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('Fuego!');
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('Agua!');
    } else {
        ataqueEnemigo.push('Tierra!');
    }
    console.log(ataqueEnemigo);
    iniciarPelea()
}

function iniciarPelea() {
    console.log(ataqueJugador.length, "el lengggg")
    if (ataqueJugador.length === 5) {
        combate()
    }
}
function seleccionarMascotaRival(enemigo) {
    spanMascotaRival.innerHTML = enemigo.nombre
    ataqueMokeponesEnemigo = enemigo.ataques
    
    spanVidas.innerHTML = vidasMascota
    spanVidasRival.innerHTML = vidasEnemigo
    sectionVerMapa.style.display = "flex"  

    secuenciaAtaque()
}

function combate() {
    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            indexRivales(i) 
            resultado = "Vaya... Ha sido un empate!"
            crearMensaje()
        } else if ((ataqueJugador[i] === "Fuego!" && ataqueEnemigo[i] === "Tierra!") || (ataqueJugador[i] === "Agua!" && ataqueEnemigo[i] === "Fuego!") || (ataqueJugador[i] === "Tierra!" && ataqueEnemigo[i] === "Agua!")) {
            indexRivales(i) 
            resultado = "Que buena suerte! Haz ganado!"
            victorias++
            spanVidas.innerHTML = victorias
            crearMensaje()
        } else {
            indexRivales(i)
            resultado = "Será para la próxima... Haz perdido"
            derrotas++
            spanVidasRival.innerHTML = derrotas
            crearMensaje()
        }
        
    }

    revisarVidas()
}

function indexRivales(index) {
    indexJugador = ataqueJugador[index]
    indexEnemigo = ataqueEnemigo[index]
}

function revisarVidas() {
    if (victorias === derrotas) {
        crearMensajeFinal("Ha sido un empate!")
    } else if (victorias > derrotas) {
        crearMensajeFinal("Genial! Haz ganado")
    } else {
        crearMensajeFinal("Que mal, Haz perdido!")
    }
}

function crearMensaje() {
    let parrafo = document.createElement("p")
    let parrafoDos = document.createElement("p")
    parrafo.innerHTML = indexJugador
    ataqueMascota.appendChild(parrafo)
    parrafoDos.innerHTML = indexEnemigo
    ataqueMascotaRival.appendChild(parrafoDos)
    mensajes.innerHTML = resultado
}

function crearMensajeFinal(mensaje) {
    mensajes.innerHTML = mensaje
    botonReinicio.style.display = "block"
}

function reinicioVideojuego() {
    location.reload()
}

function pintarCanva() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.clientWidth, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintar()
    hipodogeEnemigo.pintar()
    capipepoEnemigo.pintar()
    ratigueyaEnemigo.pintar()

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(ratigueyaEnemigo)
        revisarColision(capipepoEnemigo)
    }
}

function moverMokeponDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverMokeponArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverMokeponIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverMokeponAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function presionTecla(e) {
    switch (e.key) {
        case "ArrowUp": 
            moverMokeponArriba()
            break;
        case "ArrowDown":
            moverMokeponAbajo()
            break;
        case "ArrowLeft": 
            moverMokeponIzquierda()
            break;
        case "ArrowRight":
            moverMokeponDerecha()
            break;
        default:
            break;
    }
}

function obtenerObjetoMascota() {
    for (let i = 0 ; i < mokepones.length ; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y 
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo) 
        {
        return 
    }
    seleccionarMascotaRival(enemigo)
    detenerMovimiento()
    clearInterval(intervalo)
    seccionAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota()
    intervalo = setInterval(pintarCanva, 50)

    window.addEventListener("keydown", presionTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

window.addEventListener("load", iniciarJuego)