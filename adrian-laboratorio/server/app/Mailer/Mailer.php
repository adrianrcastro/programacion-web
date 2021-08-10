<?php

use PHPMailer\PHPMailer\PHPMailer as PhpMailer;
use PHPMailer\PHPMailer\SMTP as SMTP;
use Dompdf\Dompdf as Dompdf;

class Mailer
{

    private $html;
    private $clientAddress;
    private $clientName;
    private $uri = "";
    private $style = "";

    /**
     * @return mixed
     */
    public function getHtml()
    {
        return $this->html;
    }

    /**
     * @param mixed $html
     */
    public function setHtml($html): void
    {
        $this->html = $html;
    }

    /**
     * @return mixed
     */
    public function getClientAddress()
    {
        return $this->clientAddress;
    }

    /**
     * @param mixed $clientAddress
     */
    public function setClientAddress($clientAddress): void
    {
        $this->clientAddress = $clientAddress;
    }

    /**
     * @return mixed
     */
    public function getClientName()
    {
        return $this->clientName;
    }

    /**
     * @param mixed $clientName
     */
    public function setClientName($clientName): void
    {
        $this->clientName = $clientName;
    }

    /**
     * @return mixed
     */
    public function getUri()
    {
        return $this->uri;
    }

    /**
     * @param mixed $uri
     */
    public function setUri($uri): void
    {
        $this->uri = $uri;
    }

    /**
     * @return string
     */
    public function getStyle(): string
    {
        return $this->style;
    }

    /**
     * @param string $style
     */
    public function setStyle(string $style): void
    {
        $this->style = $style;
    }

    public function Boostrap()
    {
        $boostrap = (string)file_get_contents('https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css');
        $this->setStyle($boostrap);
    }

    public function basicStyle()
    {
        $style = "
                th,td{
                border-bottom: 1px solid black;
                padding: .4rem;
            }
            table{
                margin-bottom: 1rem;
            }
        ";
        $this->setStyle($style);
    }


    public function htmlRender(string $id, string $title, string $description, string $results): void
    {
        $template = (string)file_get_contents(PATCH_VIEWS . 'Examen.php');
        $template = str_replace('%style%', $this->getStyle(), $template);
        $template = str_replace('%codigo_examen%', $id, $template);
        $template = str_replace('%cliente_nombre%', $this->getClientName(), $template);
        $template = str_replace('%nombre_examen%', $title, $template);
        $template = str_replace('%descripcion_examen%', $description, $template);
        $template = str_replace('%resultados_examen%', $results, $template);
        $template = str_replace('%link%', $this->getUri(), $template);
        $this->setHtml($template);
    }

    public function pdfRender()
    {
        $dompdf = new Dompdf();
        $dompdf->loadHtml($this->getHtml());
        $dompdf->setPaper('A4', 'landscape');
        $dompdf->render();
        $dompdf->stream();
    }

    public function sendMail(): bool
    {

        $mail = new PHPMailer(true);
        $subject = 'Examen del laboratorio';

        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_OFF;
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = getenv('USER_SMTP');
            $mail->Password = getenv('PASS_SMTP');
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            //Recipients
            $mail->setFrom(getenv('USER_SMTP'), 'laboratorio');
            $mail->addCC(getenv('USER_SMTP'));
            $mail->addAddress($this->getClientAddress(), $this->getClientName());

            //Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $this->getHtml();
            $mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

}