<?php


class RoleController
{

    private $role;

    /**
     * RoleController constructor.
     */
    public function __construct()
    {
        $this->role = new Role();
    }

    public function all():Response{
        $app = $this->role->get();
        if($app == null)
            return new Response(DefaultMessages::NOT_RESULT);

        $response =  new Response(DefaultMessages::RIGHT);
        $response->setData($app);
        return $response;
    }
}