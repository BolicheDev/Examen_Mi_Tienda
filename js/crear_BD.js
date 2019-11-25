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