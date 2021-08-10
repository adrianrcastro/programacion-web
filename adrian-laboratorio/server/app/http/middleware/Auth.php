<?php


class Auth
{

    /**
     * Auth constructor.
     */
    public function __construct()
    {
    }

    private static $token = null;

    public static function setToken($token){
        self::$token = $token;
    }
    public static function getToken(){
        return self::$token;
    }
    private static function destroy(){
        self::$token = null;
    }

    function login($user)
    {
        $access_token = $user['token'];
        $name = $user['name'];
        $pass = md5($user['pass']);
        $app = new User();

        $selected = $app->where('name', '=', $name)
                        ->where('pass', '=', $pass);

        $data = $selected->first();

        if ($data == null) {
            return new Response(DefaultMessages::USER_NOT_EXIST);
        }

        $selected->update(compact('access_token'));

        $id       = $data->id;
        $roles_id = $data->roles_id;

        $response = new Response(DefaultMessages::WELCOME);
        $response->setData(compact('id','roles_id','name','access_token'));

        return $response;
    }

    function logout()
    {
        $app = new User();
        $fill = 'access_token';
        $app->where($fill, '=', self::getToken())
            ->update([$fill => '']);

        self::destroy();

        return new Response(DefaultMessages::EXIT);

    }

    static function user()
    {
        $app = new User();
        $app = $app->where('access_token', '=',self::getToken())
            ->first();
        return $app;
    }

    static function check()
    {
        $app = new User();
        $app = $app->where('access_token', '=', self::getToken())
                    ->first();
        return $app != null;
    }

    static function init()
    {
        Route::post('/login', function (Request $request) {
            $app = new Auth();
            $name = $request->name;
            $pass = $request->pass;
            $token = md5(time() . $name . $pass);
            return $app->login(compact('token', 'name', 'pass'));
        });

        Route::post('/logout/:token', function ($token) {
            $app = new Auth();
            self::setToken($token);
            return $app->logout();
        });

    }
}