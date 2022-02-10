<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
include_once '../config/helper.php';
include_once '../config/database.php';
include_once '../objects/task_job.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare task_job object
$task_job = new Task_Job($db);
 
// set ID property of record to read
$task_job->task_id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of task_job to be edited
$task_job->readOne();
 
if($task_job->task_id!=null){
    // create array
    $task_job_arr = array(
        
"task_id" => $task_job->task_id,
"job_id" => $task_job->job_id
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "task_job found","document"=> $task_job_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user task_job does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "task_job does not exist.","document"=> ""));
}
?>
