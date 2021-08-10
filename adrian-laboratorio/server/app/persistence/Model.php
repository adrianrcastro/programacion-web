<?php


class Model extends Crud
{
    private $className;
    private $exclude = [
        "className",
        "table",
        "connection",
        "wheres",
        "sql",
        "exclude",
        "safe"
    ];
    private $safe;

    public function __construct($table, $className, $properties = null, $safe = []) {
        parent::__construct($table);
        $this->className = $className;
        $this->safe = $safe;

        if (empty($properties))
            return;

        foreach ($properties as $key => $value) {
            $this->key = $value;
        }

    }

    protected function getAttributes() {
        $variables = get_class_vars($this->className);
        $attributes = [];

        foreach ($variables as $key => $value) {
            if (!in_array($key, $this->exclude)) {
                $attributes[] = $key;
            }
        }

        return $attributes;
    }

    protected function parse($obj = null) {
        try {
            $attributes = $this->getAttributes();
            $finalObject = [];
            if ($obj == null) {
                foreach ($attributes as $index => $key) {
                    if (isset($this->{$key})) {
                        if (!in_array($key, $this->safe))
                            $finalObject[$key] = $this->{$key};
                        else
                            $finalObject[$key] = md5($this->{$key});
                    }
                }
                return $finalObject;
            }
            //correct the attributes that are received from the model
            foreach ($attributes as $index => $key) {
                if (isset($obj[$key])) {
                    if (!in_array($key, $this->safe))
                        $finalObject[$key] = $obj[$key];
                    else
                        $finalObject[$key] = md5($obj[$key]);
                }
            }
            return $finalObject;
        } catch (Exception $exc) {
            throw new Exception("Error in " . $this->className . ".parse() => " . $exc->getMessage());
        }
    }

    public function fill($obj) {
        try {
            $attributes = $this->getAttributes();
            foreach ($attributes as $index => $key) {
                if (isset($obj[$key]))
                    $this->{$key} = $obj[$key];
            }
        } catch (Exception $exc) {
            throw new Exception("Error in " . $this->className . ". fill(obj)" . $exc->getMessage());
        }
    }

    public function insert($obj = null) {
        $obj = $this->parse($obj);
        return parent::insert($obj);
    }

    public function update($obj) {
        $obj = $this->parse($obj);
        return parent::update($obj);
    }

    public function __get($attributes) {
        return $this->{$attributes};
    }

    public function __Set($attribute, $value) {
        $this->{$attribute} = $value;
    }
}