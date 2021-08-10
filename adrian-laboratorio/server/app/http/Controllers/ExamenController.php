<?php


class ExamenController
{
    public function insert(array $examen): Response
    {
        $id = (new Examen())->insert($examen);
        $response = new Response($id >= 1 ?
                DefaultMessages::SUCCESSFUL_INSERTION :
                DefaultMessages::ERROR);
        $response->setData($id);
        return $response;
    }
    public function get():Response{
        $app = new Examen();
        return $this->response($app->get());
    }
    public function getByState(String $state):Response{
        $app = $this->getBy('estado',$state)->get();
        return $this->response($app);
    }
    public function getByClient(String $id):Response{
        $app = $this->getBy('clientes_id',$id);
        return $this->response($app->get());
    }
    public function insertResults($request):Response{

        if(!$request->id | !$request->resultado)
            return new Response(DefaultMessages::ERROR);

        $app  = new Examen();
        $rows = $app->where('id','=',$request->id)
                    ->where('estado','=','0')
                    ->update([
                        'estado'=>'1',
                        'resultado'=>$request->resultado
                    ]);
        $response = new Response($rows>0?
            DefaultMessages::SUCCESSFUL_UPDATE :
            DefaultMessages::WITHOUT_CHANGES
        );

        $response->setData($rows);
        return $response;
    }

    private function response($app):Response{
        $response = new Response($app != null?
            DefaultMessages::RIGHT:DefaultMessages::NOT_RESULT
        );
        $response->setData($app);
        return $response;
    }
    private function getBy(String $key, String $value){
        $app = new Examen();
        return $app->where($key,'=',$value);
    }
}