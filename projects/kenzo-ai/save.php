<?php
$json = json_decode(file_get_contents("php://input"));
$json = json_encode($json, JSON_PRETTY_PRINT);

file_put_contents('data.json', $json);
echo json_encode(file_get_contents("php://input"));
?>
