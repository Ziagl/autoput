<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$dir = getcwd() . '/';
$imgDir = 'img/';

// get data to be edited
$data = json_decode(file_get_contents("php://input"), true);

$img = base64_decode($data['image']);
$filename = $data['filename'];//uniqid() . '.jpg';
$file = $dir . "../" . $imgDir . $filename;
$success = file_put_contents($file, $img);

if($success)
{
    exit($imgDir . $filename);
}
else
{
    exit("error");
}