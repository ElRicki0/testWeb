<?php
/**
 * chat.php - Backend para conectar con GitHub Models Inference API (GPT-4.1)
 * Implementa manejo de errores y validaciones.
 */

// Establecer siempre salida JSON
header('Content-Type: application/json; charset=utf-8');


$githubToken = getenv('GITHUB_PAT') ?: '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';
// -----------------------------------

// Validar token
if (empty($githubToken)) {
    http_response_code(500);
    exit;
    echo json_encode(["error" => "GitHub PAT no configurado.§"]);
}

// Leer y validar entrada JSON
$rawInput = file_get_contents('php://input');
if (empty($rawInput)) {
    http_response_code(400);
    echo json_encode(["error" => "Cuerpo de solicitud vacío.§"]);
    exit;
}

$inputData = json_decode($rawInput, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["error" => "JSON inválido: " . json_last_error_msg()]);
    exit;
}

$userPrompt = trim($inputData['prompt'] ?? '');
if ($userPrompt === '') {
    http_response_code(400);
    echo json_encode(["error" => "El campo 'prompt' es obligatorio.§"]);
    exit;
}


$apiUrl = 'https://models.github.ai/inference/chat/completions';
$payload = [
    'model'    => 'openai/gpt-4.1',
    'messages' => [
        ['role' => 'system', 'content' => 'Eres un asistente de uso multiple para Pymes (Pequeñas y Medianas Empresas) las cosas retornalas sin formato en texto plano por favor .'],
        ['role' => 'user',   'content' => $userPrompt]
    ],
    'max_tokens'  => 200,
    'temperature' => 0.7
];

// Headers para GitHub Models inference
$headers = [
    'Authorization: Bearer ' . $githubToken,
    'Accept: application/vnd.github+json',
    'X-GitHub-Api-Version: 2022-11-28',
    'Content-Type: application/json'
];

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
// Timeout para evitar bloqueos prolongados
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$curlErrNo = curl_errno($ch);
$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Manejo de errores de cURL
if ($curlErrNo) {
    http_response_code(502);
    echo json_encode(["error" => "Error en cURL (#$curlErrNo)."]);
    exit;
}

// Verificar estado HTTP
if ($httpStatus < 200 || $httpStatus >= 300) {
    http_response_code(502);
    echo json_encode(["error" => "GitHub Models API responded with status $httpStatus.", "details" => trim($response)]);
    exit;
}

// Parsear respuesta JSON
$decoded = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(502);
    echo json_encode(["error" => "JSON inválido de GitHub: " . json_last_error_msg()]);
    exit;
}

// Extraer contenido de la respuesta
$replyText = $decoded['choices'][0]['message']['content'] ?? null;
if ($replyText === null) {
    http_response_code(502);
    echo json_encode(["error" => "No se encontró 'choices[0].message.content'.", "raw" => $decoded]);
    exit;
}

// Devolver respuesta limpia
echo json_encode(["reply" => trim($replyText)]);
exit;
