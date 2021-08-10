<?php

Route::get('/reportView/:idClient/:idExam',function($idClient,$idExam){
    return (new MailerController())->viewReport($idClient,$idExam);
});
Route::get('/reportPdf/:idClient/:idExam',function($idClient,$idExam){
    return (new MailerController())->getPdf($idClient,$idExam);
});

