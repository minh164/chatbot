<?php
//$variable = 1; file_put_contents('php://stderr', print_r($variable, TRUE));
// parameters
$hubVerifyToken = 'chatbot';
$accessToken =   "EAAH17oX3IIIBAAIDNngmB8FSiZB5I43LswJO5gty40efd6BSV72HhqojNdpACllH1vna5JZBDVkhxxaNaZBLHQgDPdLlG7kw7KSZCLtqyI8ZBvfUd5tMSUiRt9oQNcVNNhIZCQ9U7KdOtNe8JawiiY2LJJTYl8ocfPmmqO156sILLhq1hJZAmZAZB";

$input = json_decode(file_get_contents('php://input'), true);

$senderId = $input['entry'][0]['messaging'][0]['sender']['id'];
$messageText = $input['entry'][0]['messaging'][0]['message']['text'];
$abc = file_get_contents('php://input');
file_put_contents('php://input', print_r($abc, TRUE));



/*
// check token at setup
if ($_REQUEST['hub_verify_token'] === $hubVerifyToken) {
    echo $_REQUEST['hub_challenge'];
    exit;
} else {echo 'deo ket noi đc';}

// handle bot's anwser
$input = json_decode(file_get_contents('php://input'), true);

$senderId = $input['entry'][0]['messaging'][0]['sender']['id'];
$messageText = $input['entry'][0]['messaging'][0]['message']['text'];
$response = null;

//set Message
if($messageText == "hi") {
    $answer = "Hello";
}

//send message to facebook bot
$response = [
    'recipient' => [ 'id' => $senderId ],
    'message' => [ 'text' => $answer ]
];

$ch = curl_init('https://graph.facebook.com/v2.6/me/messages?access_token='.$accessToken);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($response));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
if(!empty($input)){
    $result = curl_exec($ch);
}
curl_close($ch);*/
