<?php


class Examen extends Model
{
    protected $table = 'examenes';
    protected $id;
    protected $nombre;
    protected $descripcion;
    protected $resultado;
    protected $estado;
    protected $clientes_id;

    /**
     * Examen constructor.
     * @param $properties
     */
    public function __construct($properties = null)
    {
        parent::__construct($this->table, Examen::class, $properties);
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
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre): void
    {
        $this->nombre = $nombre;
    }

    /**
     * @return mixed
     */
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * @param mixed $descripcion
     */
    public function setDescripcion($descripcion): void
    {
        $this->descripcion = $descripcion;
    }

    /**
     * @return mixed
     */
    public function getResultado()
    {
        return $this->resultado;
    }

    /**
     * @param mixed $resultado
     */
    public function setResultado($resultado): void
    {
        $this->resultado = $resultado;
    }

    /**
     * @return mixed
     */
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * @param mixed $estado
     */
    public function setEstado($estado): void
    {
        $this->estado = $estado;
    }

    /**
     * @return mixed
     */
    public function getClientesId()
    {
        return $this->clientes_id;
    }

    /**
     * @param mixed $clientes_id
     */
    public function setClientesId($clientes_id): void
    {
        $this->clientes_id = $clientes_id;
    }




}