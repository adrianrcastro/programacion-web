<?php


class UserController
{
    public function get() :Response{
        $userModel = new User();
        $list = $userModel->where('roles_id','!=','1')->get(); // se pueden listar todos menos el admin
        $rowCount = count($list);
        $success  = ($rowCount>0);
        $response = new Response($success? DefaultMessages::RIGHT:DefaultMessages::ERROR);
        $response->setData($list);
        return $response;
    }

    public function insert(Array $user) :Response{
        if($user['roles_id']<=1) // solo puede existir un administrador
            return new Response(DefaultMessages::ERROR);
        $userModel = new User();
        $selected  = $userModel->where('name','=',$user['name'])->first();

        if($selected != null){
            return new Response(DefaultMessages::USER_NOT_AVAILABLE);
        }
        $id = $userModel->insert($user);
        $success = ($id > 0);
        $response = new Response($success? DefaultMessages::SUCCESSFUL_INSERTION:DefaultMessages::ERROR);
        $response->setData($id);
        return $response;
    }


    public function delete(String $id):Response{

        $app = new User();
        $app = $app->where('id', '=', $id);
        $data = $app->first();

        if($data->roles_id<=1) // se evita que un superUsuario sea eliminado
            return new Response(DefaultMessages::ERROR);

        $app = $app->delete();

        $success = ($app>0);
        $response = new Response($success? DefaultMessages::SUCCESSFULL_REMOVAL:DefaultMessages::ERROR);
        $response->setData($app);
        return $response;

    }
    public function changeRole($request):Response{
        if(!$request->id | !$request->roles_id)
            return new Response(DefaultMessages::ERROR);

        $app = (new Role())->where('id','=',$request->roles_id)->first();

        if($app == null)
            return new Response(DefaultMessages::NOt_EXIST_ROL);

        $app = new User();
        $app = $app->where('id','=',$request->id)
                    ->where('roles_id','!=','1')
                    ->update([
                        'roles_id'=>$request->roles_id
                    ]);
        $response = new Response(DefaultMessages::SUCCESSFUL_UPDATE);
        $response->setData($app);
        return $response;
    }
}