<?php
Route::get('/clients',function(){
    return (new ClienteController())->all();
});
Route::post('/newClient',function(Request $request){
    $app = new ClienteController();
    return $app->insert([
        'cedula'=> $request->cedula,
        'nombre'=> $request->nombre,
        'apellido'=> $request->apellido,
        'correo'=> $request->correo
    ]);
});
Route::post('/client-update',function(Request $request){
    $app = new ClienteController();
    return $app->update([
        'id'=> $request->id,
        'cedula'=> $request->cedula,
        'nombre'=> $request->nombre,
        'apellido'=> $request->apellido,
        'correo'=> $request->correo
    ]);
});
Route::post('/submitExam',function(Request $request){
   $app = new ExamenController();
   return $app->insert([
       'nombre'=> $request->nombre,
       'descripcion'=> $request->descripcion,
       'clientes_id'=> $request->clientes_id
   ]);
});