<?php


class Crud
{
    protected $table;
    protected $connection;
    protected $wheres = '';
    protected $sql = null;
    private $nWheres = 0;

    public function __construct($table = null) {
        $this->connection = (new Connection())->connect();
        $this->table = $table;
    }

    public function get() {
        try {
            $this->sql = "SELECT * FROM {$this->table} {$this->wheres}";
            $sth = $this->connection->prepare($this->sql);
            $sth->execute();
            return $sth->fetchAll(PDO::FETCH_OBJ);
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function first() {
        $list = $this->get();

        if (count($list) > 0)
            return $list[0];

        return null;
    }

    public function insert($obj = null) {
        try {
            $fields = implode("`, `", array_keys($obj));
            $values = ":" . implode(", :", array_keys($obj));
            $this->sql = "INSERT INTO {$this->table} (`{$fields}`) VALUES ({$values}) ";
            $this->run($obj);
            return $this->connection->lastInsertId();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function update($obj) {
        try {

            $fields = '';
            foreach ($obj as $key => $value) {
                $fields .= "$key=:$key ,";
            }
            $fields = rtrim($fields, ',');
            $this->sql = "UPDATE {$this->table} SET {$fields} {$this->wheres}";

            return $this->run($obj);

        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function delete() {
        try {
            $this->sql = "DELETE FROM {$this->table} {$this->wheres}";
            $rowsAffected = $this->run();
            return $rowsAffected;
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function where($key, $condition, $value) {

        $this->nWheres +=1;
        $this->wheres .= $this->nWheres>1? "AND" : "WHERE";
        $this->wheres .= " $key $condition " . (is_string($value) ? "'$value'" : $value) . " ";

        return $this;
    }

    public function orWhere($key, $condition, $value) {
        $this->nWheres +=1;
        $this->wheres .= $this->nWheres>1? "OR" : "WHERE";
        $this->wheres .= " $key $condition " . (is_string($value) ? "'$value'" : $value) . " ";
        return $this;
    }

    private function run($obj = null) {
        $sth = $this->connection->prepare($this->sql);
        if ($obj !== null) {
            foreach ($obj as $key => $value) {
                if (empty($value))
                    $value = null;
                $sth->bindValue(":$key", $value);
            }
        }
        $sth->execute();
        $this->resetValues();
        return $sth->rowCount();
    }

    public function resetValues() {
        $this->wheres = "";
        $this->nWheres = 0;
        $this->sql = null;
    }
}