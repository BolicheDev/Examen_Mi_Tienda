'use strict'

window.onload = inciar;

var arrGlo = {
    "miBd": {},
    "conn": ""
};

function inciar() {
    crearBD();
}


function visual() {
    var file = document.getElementById("foto").files[0],
        reader = new FileReader();
    reader.onloadend = function() {
        var b64 = reader.result;
        // .replace(/^data:.+;base64,/, '')
        console.log(b64);
        var imagen = document.createElement("img");
        imagen.setAttribute("src", b64);
        document.body.append(imagen);
    }
    reader.readAsDataURL(file);

}