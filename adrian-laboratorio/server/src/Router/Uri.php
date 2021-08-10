<?php

class Uri{

    var $uri;
    var $method;
    var $fnc;
    var $matches;
    protected $request;
    protected $response;

    function __construct($uri,$method,$fnc) {
        $this->uri    = $uri;
        $this->method = $method;
        $this->fnc    = $fnc;
    }

    public function math($url):bool{

        $path = preg_replace('#:([\w]+)#', '([^/]+)', $this->uri);
        $regex = "#^$path$#i";
        if(!preg_match($regex, $url,$matches)){
            return false;
        }
        if($this->method != $_SERVER['REQUEST_METHOD'] && $this->method != "ANY"){
            return false;
        }
        array_shift($matches);
        $this->matches = $matches;
        return true;
    }
    private function execFunction(){
        $this->parseRequest();
        $this->response = call_user_func_array($this->fnc, $this->matches);

    }
    private function parseRequest(){
        //$reflectionFunct = new ReflectionMethod($this->fnc);
        $this->request   = new Request($this->request);
        $this->matches[] = $this->request;
    }
    public function call(){
        try {

            $this->request = $_REQUEST;
            $this->execFunction();
            $this->printResponse();

        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    private function printResponse(){
        if(is_string($this->response)){
            echo $this->response;
        }else if(is_object($this->response) || is_array($this->response)){
            $res = new Response();
            echo $res->json($this->response);
        }

    }
}