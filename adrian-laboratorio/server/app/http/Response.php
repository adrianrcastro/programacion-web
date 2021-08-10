<?php


class Response
{
    public $code;
    public $message;
    public $data;

    public function __construct($code = null, $message = null, $data = null) {
        //get default response
        if (isset($code) && empty($message)) {
            $response = DefaultMessages::getMessage($code);
            $this->code = $response->code;
            $this->message = $response->message;
            $this->data = $response->data;

            return;
        }
        if (is_string($code)) {
            $temp = DefaultMessages::getMessage($code);
            $code = $temp->$code;
        }
        $this->code = $code;
        $this->message = $message;
        $this->data = $data;
    }

    public function json($obj = null) {
        header('Content-Type: application/json');
        if(is_array($obj) || is_object($obj)){
            return json_encode($obj);
        }
        return json_encode($this);
    }

    function getCode() {
        return $this->code;
    }

    function getMessage() {
        return $this->message;
    }

    function getData() {
        return $this->data;
    }

    function setCode($code) {
        $this->code = $code;
    }

    function setMessage($message) {
        $this->message = $message;
    }

    function setData($data) {
        $this->data = $data;
    }
}