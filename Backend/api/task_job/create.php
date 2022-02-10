<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/helper.php';
// get database connection
include_once '../config/database.php';
 
// instantiate task_job object
include_once '../objects/task_job.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$task_job = new Task_Job($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!isEmpty($data->task_id)
&&!isEmpty($data->job_id)){
 
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
 	$lastInsertedId=$task_job->create();
    // create the task_job
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the task_job, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create task_job","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create task_job. Data is incomplete.","document"=> ""));
}
?>
