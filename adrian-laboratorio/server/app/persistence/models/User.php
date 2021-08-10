<?php


class User extends Model
{

    protected $table = "users";
    protected $id;
    protected $name;
    protected $pass;
    protected $access_token;
    protected $roles_id;

    public function __construct($properties = null)
    {
        $safe = ["pass"];
        parent::__construct($this->table, User::class,  $properties , $safe);

    }

    /**
     * @return string
     */
    public function getTable(): string
    {
        return $this->table;
    }

    /**
     * @param string $table
     */
    public function setTable(string $table): void
    {
        $this->table = $table;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name): void
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getPass()
    {
        return $this->pass;
    }

    /**
     * @param mixed $pass
     */
    public function setPass($pass): void
    {
        $this->pass = $pass;
    }

    /**
     * @return mixed
     */
    public function getAccessToken()
    {
        return $this->access_token;
    }

    /**
     * @param mixed $access_token
     */
    public function setAccessToken($access_token): void
    {
        $this->access_token = $access_token;
    }

    /**
     * @return mixed
     */
    public function getRolesId()
    {
        return $this->roles_id;
    }

    /**
     * @param mixed $roles_id
     */
    public function setRolesId($roles_id): void
    {
        $this->roles_id = $roles_id;
    }



}