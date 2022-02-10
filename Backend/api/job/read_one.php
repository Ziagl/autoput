<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
include_once '../config/helper.php';
include_once '../config/database.php';
include_once '../objects/job.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare job object
$job = new Job($db);
 
// set ID property of record to read
$job->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of job to be edited
$job->readOne();
 
if($job->id!=null){
    // create array
    $job_arr = array(
        
"id" => $job->id,
"name" => html_entity_decode($job->name),
"type" => $job->type,
"text" => $job->text,
"value" => html_entity_decode($job->value)
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "job found","document"=> $job_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user job does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "job does not exist.","document"=> ""));
}
?>
