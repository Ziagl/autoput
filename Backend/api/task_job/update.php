<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/helper.php';
include_once '../config/database.php';
include_once '../objects/task_job.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare task_job object
$task_job = new Task_Job($db);
 
// get id of task_job to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of task_job to be edited
$task_job->id = $data->id;

if(
!isEmpty($data->task_id)
&&!isEmpty($data->job_id)
){
// set task_job property values

if(!isEmpty($data->task_id)) { 
$task_job->task_id = $data->task_id;
} else { 
$task_job->task_id = '';
}
if(!isEmpty($data->job_id)) { 
$task_job->job_id = $data->job_id;
} else { 
$task_job->job_id = '';
}
 
// update the task_job
if($task_job->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the task_job, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update task_job","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update task_job. Data is incomplete.","document"=> ""));
}
?>
