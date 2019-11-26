'use strict'

function crearBD() {
    arrGlo.miBd.indexedDB = window.indexedDB;
    arrGlo.miBd.IDBKeyRange = window.IDBKeyRange;
    arrGlo.miBd.IDBKeyTransaction = window.IDBKeyTransaction;

    arrGlo.conn = arrGlo.miBd.indexedDB.open("MiTienda");

    arrGlo.conn.onupgradeneeded = function() {
        this.result.createObjectStore("Coches", { keyPath: "idCoche", autoIncrement: true });
    }
}

function añadir_coche(obj) {
    arrGlo.conn = arrGlo.miBd.indexedDB.open("MiTienda");
    arrGlo.conn.onsuccess = function() {
        this.result.transaction("Coches", "readwrite").objectStore("Coches").add(obj);
    };
}

function comprobar_si_existe() {
    arrGlo.conn = arrGlo.miBd.indexedDB.open("MiTienda");

    arrGlo.conn.onsuccess = function() {
        this.result.transaction("Coches", "readwrite").objectStore("Coches").count().onsuccess = function() {
            if (this.result > 0) {
                document.getElementById("formulario").classList.add("oculto");
                document.getElementById("compras").classList.remove("oculto");
                meter_coches();
            }
        };
    }
}

function meter_coches() {
    arrGlo.conn = arrGlo.miBd.indexedDB.open("MiTienda");

    arrGlo.conn.onsuccess = function() {
        this.result.transaction("Coches", "readwrite").objectStore("Coches").openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                console.log(cursor);
                var div = document.createElement("div");
                div.setAttribute("data-coche", cursor.key);
                var imagen = document.createElement("img");
                imagen.setAttribute("src", cursor.value.imagen);
                div.append(imagen);
                div.addEventListener("click", añadir_carrito);
                document.getElementById("compras").append(div);
                cursor.continue();
            } else {
                console.log('Ya se han metido todos los coches.');
            }
        }
    }
}