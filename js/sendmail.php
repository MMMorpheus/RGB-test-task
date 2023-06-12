<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../mailer/src/PHPMailer.php';
require '../mailer/src/Exception.php';

$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->setLanguage('ru', '../mailer/language/');
$mail->IsHTML(true);

// От кого
$mail->setFrom('test@test.mail', 'Заявка с сайта');
// Кому
$mail->addAddress('contact.khokhlov@gmail.com');
// Тема
$mail->Subject = 'Новая заявка!';

// Тело письма
$body = '<h1>Свежая зявка с сайта</h1>';
if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя: </strong> '.$_POST['name']'</p>';
}
if(trim(!empty($_POST['tel']))){
    $body.='<p><strong>Имя: </strong> '.$_POST['tel']'</p>';
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong>Имя: </strong> '.$_POST['email']'</p>';
}

$mail->Body = $body;

// Отправка

if(!$mail->send()) {
    $message = 'Ошибка!';
} else {
    $message = 'Заявка ушла!'
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response)