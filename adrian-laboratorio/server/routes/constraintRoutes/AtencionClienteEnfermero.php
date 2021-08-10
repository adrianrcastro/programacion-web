<?php

Route::get('/examenes',function(){
    return (new ExamenController())->get();
});
Route::get('/examenes/:estado',function(String $estado){
    return (new ExamenController())->getByState($estado);
});
Route::get('/examenes/:idCliente',function(String $idCliente){
    return (new ExamenController())->getByClient($idCliente);
});
Route::post('/sendMail/:idClient/:idExam',function($idClient,$idExam){
    return (new MailerController())->setMail($idClient,$idExam);
});