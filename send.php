<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if (file_exists(__DIR__ . '/.env.local')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__, '.env.local');
    $dotenv->load();
}

$allowed_domains = [
    $_ENV['ALLOWED_DOMAIN_1'],
    $_ENV['ALLOWED_DOMAIN_2'],
    $_ENV['ALLOWED_DOMAIN_3'],
];

$origin = $_SERVER['HTTP_ORIGIN'];
if (in_array($origin, $allowed_domains)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true");
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('Content-Security-Policy: default-src \'self\'');
} else {
    header('HTTP/1.1 403 Access Forbidden');
    exit('Origin not allowed');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 204 No Content');
    exit;
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Unsupported request method.']);
    exit;
}

$name = htmlspecialchars($_POST['name'] ?? '', ENT_QUOTES, 'UTF-8');
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$company = htmlspecialchars($_POST['company'] ?? '', ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($_POST['phone'] ?? '', ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($_POST['message'] ?? '', ENT_QUOTES, 'UTF-8');
$token = htmlspecialchars($_POST['token'] ?? '', ENT_QUOTES, 'UTF-8');

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
    exit;
}

if (!isset($_POST['consentimiento'])) {
    echo json_encode(['success' => false, 'message' => 'You must accept the privacy policy.']);
    exit;
}

if (!$token) {
    echo json_encode(['success' => false, 'message' => 'Hmm... Are you a robot?']);
    exit;
}

$recaptcha_url = "https://www.google.com/recaptcha/api/siteverify";
$recaptcha_params = http_build_query([
    'secret' => $_ENV['VUE_APP_RECAPTCHA_SECRET_KEY'],
    'response' => $token
]);

$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'content' => $recaptcha_params
    ]
]);
$recaptcha_response = file_get_contents($recaptcha_url, false, $context);
$recaptcha_result = json_decode($recaptcha_response);

if (!$recaptcha_result->success || ($recaptcha_result->score ?? 0) < 0.5) {
    echo json_encode(['success' => false, 'message' => 'Verification failed.']);
    exit;
}

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();

    $recipient = $_ENV['ENVIRONMENT'] === 'local' ? 'hello@test.com' : $_ENV['MAIL_RECIPIENT'];
    $sanitizedSubject = htmlspecialchars('FORMULARIO WEB | Nuevo mensaje');
    $sanitizedBody = "Nombre: " . htmlspecialchars($name) . "<br>Email: " . htmlspecialchars($email) . "<br>Empresa: " . htmlspecialchars($company) . "<br>Teléfono: " . htmlspecialchars($phone) . "<br>Mensaje: " . htmlspecialchars($message);

    if ($_ENV['ENVIRONMENT'] === 'local') {
        $mail->Host = 'mailhog';
        $mail->SMTPAuth = false;
        $mail->SMTPSecure = false;
        $mail->Port = 1025;
    } else {
        $mail->Host = $_ENV['RESEND_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['RESEND_USER'];
        $mail->Password = $_ENV['RESEND_PASSWORD'];
        $mail->SMTPSecure = $_ENV['RESEND_SECURITY'];
        $mail->Port = intval($_ENV['RESEND_PORT']);
    }

    $mail->setFrom('noreply@yourdomain.com', 'Web Form');
    $mail->addReplyTo($email, $name);
    $mail->addAddress($recipient);
    $mail->isHTML(true);
    $mail->Subject = $sanitizedSubject;
    $mail->Body = $sanitizedBody;
    
    $mail->send();
    echo json_encode(['success' => true, 'message' => '¡El formulario ha sido enviado correctamente!🥳🎉']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => "😖Hubo un problema al enviar el formulario: " . $e->getMessage()]);
}
?>