<?php

Route::post('/examenInsertResults',function(Request $request){
    return (new ExamenController())->insertResults($request);
});
