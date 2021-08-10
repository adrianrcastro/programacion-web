<?php


class Connection
{
    private function mysql()
    {

        $CONTROLLER = 'mysql';
        $SERVER = 'localhost';
        $DATABASE = 'Laboratorio';
        $PORT = '3306';
        $USER = 'kg';
        $PASSWORD = '27056028';
        $CHARSET = 'utf8mb4';

        $URL = "{$CONTROLLER}:host={$SERVER}:{$PORT};"
            . "dbname={$DATABASE};charset={$CHARSET}";

        return new \PDO($URL, $USER, $PASSWORD);
    }

    private function postgre()
    {

        $db = parse_url(getenv('BDD_POSTGRE'));

        return new PDO("pgsql:" . sprintf(
                "host=%s;port=%s;user=%s;password=%s;dbname=%s",
                $db["host"],
                $db["port"],
                $db["user"],
                $db["pass"],
                ltrim($db["path"], "/")
            ));

    }

    public function connect()
    {
        try {
            return $this->postgre();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
}