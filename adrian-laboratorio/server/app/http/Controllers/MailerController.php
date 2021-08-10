<?php


class MailerController extends Mailer
{

    private function setReport($idClient, $idExam): bool
    {

        $exam = (new Examen())
            ->where('id', '=', $idExam)
            ->where('clientes_id', '=', $idClient)
            ->first();

        if ($exam == null)
            false;

        $client = (new Cliente())
            ->where('id', '=', $idClient)
            ->first();

        $uri = getenv('HOST');
        $uri = str_replace('index.php', "reportPdf/$idClient/$idExam", $uri);
        $this->setUri($uri);
        $this->setClientName($client->nombre);
        $this->setClientAddress($client->correo);
        $this->htmlRender($idExam, $exam->nombre, $exam->descripcion, $exam->resultado);

        return true;
    }

    public function getPdf($idClient, $idExam): void
    {
        $this->Boostrap();
        $this->setReport($idClient, $idExam);
        $this->pdfRender();
    }

    public function viewReport($idClient, $idExam)
    {

        $this->Boostrap();

        $ans = $this->setReport($idClient, $idExam);

        if (!$ans) {
            return 'El documento no se está disponible';
        }

        return $this->getHtml();
    }

    public function setMail($idClient, $idExam) : Response
    {

        $this->basicStyle();
        $ans = $this->setReport($idClient, $idExam);
        if (!$ans) {
            return new Response(DefaultMessages::WARNING_EMAIL);
        }

        $this->sendMail();

        return new Response(DefaultMessages::SUCCESS_EMAIL);

    }

}