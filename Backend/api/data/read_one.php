<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
include_once '../config/helper.php';
include_once '../config/database.php';
include_once '../objects/data.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare data object
$data = new Data($db);
 
// set ID property of record to read
$data->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of data to be edited
$data->readOne();
 
if($data->id!=null){
    // create array
    $data_arr = array(
        
"id" => $data->id,
"task_id" => $data->task_id,
"task_name" => $data->task_name,
"time" => $data->time,
"job_id" => $data->job_id,
"job_name" => $data->job_name,
"text" => $data->text,
"type" => $data->type,
"value" => $data->value
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "data found","document"=> $data_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user data does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "data does not exist.","document"=> ""));
}
?>
