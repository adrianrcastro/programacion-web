<?php


class ClienteController
{


    /**
     * ClienteController constructor.
     */
    public function __construct()
    {
    }

    public function insert($values) :Response
    {
        $cliente = new Cliente();
        $selected = $cliente->where('cedula', '=', $values['cedula'])
            ->orWhere('correo', '=', $values['correo'])
            ->first();
        if ($selected != null)
            return new Response(DefaultMessages::CLIENTE_EXIST);
        $id = $cliente->insert($values);

        $response = new Response($id ? DefaultMessages::SUCCESSFUL_INSERTION : DefaultMessages::ERROR);
        $response->setData($id);
        return $response;
    }

    public function update($cliente) :Response
    {
        $app = new Cliente();

        $app->where('id', '!=', $cliente['id']);
        $emails = $app->where('correo', '=', $cliente['correo'])->get() != null;

        $app->resetValues();
        $app->where('id', '!=', $cliente['id']);
        $idDocuments = $app->where('cedula', '=', $cliente['cedula'])->get() != null;

        if ($emails) {
            return new Response(DefaultMessages::EMAIL_USED);
        } elseif ($idDocuments) {
            return new Response(DefaultMessages::ID_CARD_USED);
        }

        $app->resetValues();

        $update = $app->where('id', '=', $cliente['id']);
        $update = $update->update($cliente);

        $success = ($update > 0);
        $response = new Response($success ? DefaultMessages::SUCCESSFUL_UPDATE : DefaultMessages::WITHOUT_CHANGES);
        $response->setData($update);
        return $response;
    }

    public function all() : Response
    {
        $list = (new Cliente())->get();

        if ($list == null)
            return new Response(DefaultMessages::NOT_RESULT);

        $response = new Response(1, DefaultMessages::RIGHT);
        $response->setData($list);
        return $response;

    }

}