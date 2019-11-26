'use strict'

window.onload = inciar;

var arrGlo = {
    "miBd": {},
    "conn": "",
    "imagen": ""
};

function inciar() {
    crearBD();
    añadir_funciones_botones();
    //cambiar_formulario();
    comprobar_si_existe()
}

function añadir_funciones_botones() {
    document.getElementById("foto").addEventListener("change", guardar_imagen);
    document.getElementById("crear").addEventListener("click", crear_coche);
}

function crear_coche() {
    var escuderia = document.getElementById("escuderia").value;
    var descripcion = document.getElementById("descripcion").value;
    var precio = document.getElementById("precio").value;

    if (escuderia.length > 0 && descripcion.length > 0 && precio > 0 &&
        arrGlo.imagen != "") {
        var obj_coche = {
            "escuderia": escuderia,
            "descripcion": descripcion,
            "precio": precio,
            "imagen": arrGlo.imagen
        };
        añadir_coche(obj_coche);
    }
}

function añadir_carrito() {
    var longitud = document.getElementById("carrito").childNodes.length - 1;

    var clon = this.cloneNode(true);
    clon.setAttribute("name", "coche");

    var array_coches = document.getElementsByName("coche");
    console.log(longitud);
    var existe = false;

    for (let x = 0; x < longitud; x++) {
        if (array_coches[x].dataset.coche == clon.dataset.coche) {
            existe = true;
        }
    }

    if (existe == false) {
        var span = document.createElement("span");
        span.setAttribute("id", "span-" + clon.dataset.coche);
        span.innerHTML = 1;
        clon.append(span);
        document.getElementById("carrito").appendChild(clon);
    } else {
        var cantidad = document.getElementById("span-" + clon.dataset.coche).innerHTML;
        document.getElementById("span-" + clon.dataset.coche).innerHTML = Number(cantidad) + 1;
    }

}

function guardar_imagen() {
    var file = document.getElementById("foto").files[0];
    var reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function() {
        arrGlo.imagen = reader.result;
        //var b64 = reader.result;
        // .replace(/^data:.+;base64,/, '')
        /*var imagen = document.createElement("img");
        imagen.setAttribute("src", b64);
        document.body.append(imagen);*/
    }
}