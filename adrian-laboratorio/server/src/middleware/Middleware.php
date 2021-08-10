<?php


class Middleware
{

    private $callBack;

    /**
     * IMiddleware constructor.
     * @param $callBack
     */
    public function __construct($callBack)
    {
        $this->callBack = new $callBack();
    }

    public function group($next){
        $this->callBack->handle(new Request($_REQUEST),$next);
    }


}