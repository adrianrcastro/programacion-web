<?php


class DefaultMessages
{
    const RIGHT = "CORRECTO";
    const ERROR = "ERROR";
    const SUCCESSFUL_INSERTION = "INSERSION EXITOSA";
    const SUCCESSFUL_UPDATE = "ACTUALIZACION EXITOSA";
    const SUCCESSFULL_REMOVAL = "ELIMINACION EXITOSA";
    const USER_NOT_AVAILABLE = "USUARIO NO DISPONIBLE";
    const USER_SUCCESS = "USUARIO REGISTRADO EXITOSAMENTE";
    const USER_NOT_EXIST = "USUARIO NO EXISTE";
    const NOT_PERMIT = "NO PERMITIDO";
    const WELCOME = "SALUDO";
    const EXIT = "SALIDA";
    const CLIENTE_EXIST = "";
    const CLIENTE_NOT_EXIST = "CLIENTE NO EXISTE";
    const NOT_RESULT = "SIN DATOS PARA MOSTRAR";
    const DATA_USED = "DATOS EN USO";
    const EMAIL_USED = "EMAIL EN USO";
    const ID_CARD_USED = "CEDULA EN USO";
    const WITHOUT_CHANGES= "SIN CAMBIOS";
    const SUCCESS_EMAIL = "CORREO ENVIADO";
    const WARNING_EMAIL = "NO SE PUDO ENVIAR EL CORREO";
    const NOt_EXIST_ROL = "EL ROL NO EXISTE";

    public static function getMessage($code)
    {
        switch ($code) {
            // success
            case DefaultMessages::SUCCESS_EMAIL:
                return new Response(1,"Correo enviado exitosamente");
            case DefaultMessages::RIGHT:
                return new Response(1, "Se ha realizado la operación exitosamente");
            case DefaultMessages::SUCCESSFUL_INSERTION:
                return new Response(1, "Se ha hecho el registro con éxito");
            case DefaultMessages::SUCCESSFUL_UPDATE:
                return new Response(1, "Se ha actualizado el registro exitosamente");
            case DefaultMessages::SUCCESSFULL_REMOVAL:
                return new Response(1, "Registro eliminado");
            case DefaultMessages::USER_SUCCESS:
                return new Response(1, "usuario registrado exitosamente");
            case DefaultMessages::WELCOME:
                return new Response(1, "Bienvenido");
            case DefaultMessages::EXIT:
                return new Response(1, "Ha salido");
            //problems
            case DefaultMessages::ERROR:
                return new Response(-1, "Se ha presentado un error al realizar la operación");
            case DefaultMessages::USER_NOT_AVAILABLE:
                return new Response(-1, "usuario en uso");
            case DefaultMessages::USER_NOT_EXIST:
                return new Response(-1, "los datos no concuerdan con nuestros registros");
            case DefaultMessages::NOT_PERMIT:
                return new Response(-1, "no permitido");
            case DefaultMessages::CLIENTE_EXIST:
                return new Response(-1,"El usuario ya está registrado, en caso contrario la cedula o el correo estan en uso");
            case DefaultMessages::CLIENTE_NOT_EXIST:
                return new Response(-1,"El cliente no existe");
            case DefaultMessages::NOT_RESULT:
                return new Response(-1,"sin coincidencias");
            case DefaultMessages::DATA_USED:
                return new Response(-1,"los valores ingresados estan en uso por otra cuenta");
            case DefaultMessages::EMAIL_USED:
                return new Response(-1,"correo electrónico no disponible");
            case DefaultMessages::ID_CARD_USED:
                return new Response(-1,"Identificación no disponible");
            case DefaultMessages::WITHOUT_CHANGES:
                return new Response(-1,"Sin cambios");
            case DefaultMessages::WARNING_EMAIL:
                return new Response(-1,"No se pudo enviar el correo");
            case DefaultMessages::NOt_EXIST_ROL:
                return new Response(-1,"El rol no existe");
        }
    }
}