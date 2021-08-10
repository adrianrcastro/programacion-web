<?php
Route::get('/users',function(){
    return ((new UserController())->get());
});
Route::post('/newAcc', function (Request $request) {

    $app = new UserController();
    return $app->insert([
        "name" => $request->name,
        "pass" => $request->pass,
        "roles_id" => $request->roles_id
    ]);
});

Route::delete('/deleteUser/:id',function($id){
    return (new UserController())->delete($id);
});
Route::post('/updateUserRole',function(Request $request){
    return (new UserController())->changeRole($request);
});
Route::get('/roles',function(){
    return (new RoleController())->all();
});
