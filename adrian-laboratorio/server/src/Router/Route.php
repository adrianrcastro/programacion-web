<?php


class Route
{

    private static $uris = [];

    public static function add($method,$uri,$fnc = null){
        Route::$uris [] = new Uri(self::parseUri($uri),$method,$fnc);
    }
    public static function get($uri,$fnc = null){
        return Route::add('GET',$uri,$fnc);
    }
    public static function post($uri,$fnc = null){
        return Route::add('POST',$uri,$fnc);
    }
    public static function put($uri,$fnc = null){
        return Route::add('PUT',$uri,$fnc);
    }
    public static function delete($uri,$fnc = null){
        return Route::add('DELETE',$uri,$fnc);
    }
    public static function any($uri,$fnc = null){
        return Route::add('ANY',$uri,$fnc);
    }
    private static function parseUri($uri){
        $uri = trim($uri,'/');
        $uri = (strlen($uri)>0)? $uri : '/';
        return $uri;
    }
    public static function submit(){
        $method = $_SERVER['REQUEST_METHOD'];
        $uri    = isset($_GET['uri'])? $_GET['uri']:'';
        $uri    = self::parseUri($uri);

        // check if the uri is registered

        foreach(Route::$uris as $key => $recordUri){
            if($recordUri->math($uri)){
                return $recordUri->call();
            }
        }

        //displays 404 error message
        header("Content-Type: text/html");
        echo 'La uri (<a href="' . $uri . '">' . $uri . '</a>) no se encuentra registrada en el método ' . $method . '.';
    }

    public static function middleware(String $contraint){
        return new Middleware($contraint);
    }

}