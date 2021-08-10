<?php

Auth::init();

Route::middleware('Session')->group(function () {

    Route::middleware('Administrador')->group(function () {
        include_once 'constraintRoutes/Administrador.php';
    });
    Route::middleware('AtencionCliente')->group(function (){
        include_once 'constraintRoutes/AtencionCliente.php';
    });
    Route::middleware('Enfermero')->group(function (){
        include_once 'constraintRoutes/Enfermero.php';
    });
    Route::middleware('AtencionClienteEnfermero')->group(function (){
        include_once 'constraintRoutes/AtencionClienteEnfermero.php';
    });

});







