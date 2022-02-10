<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/helper.php';
include_once '../config/database.php';
include_once '../objects/task.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare task object
$task = new Task($db);
 
// get id of task to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of task to be edited
$task->id = $data->id;

if(
!isEmpty($data->name)
&&!isEmpty($data->date_recurrency)
&&!isEmpty($data->time_recurrency)
){
// set task property values

if(!isEmpty($data->name)) { 
$task->name = $data->name;
} else { 
$task->name = '';
}
$task->duedate = $data->duedate;
if(!isEmpty($data->date_recurrency)) { 
$task->date_recurrency = $data->date_recurrency;
} else { 
$task->date_recurrency = '';
}
if(!isEmpty($data->time_recurrency)) { 
$task->time_recurrency = $data->time_recurrency;
} else { 
$task->time_recurrency = '';
}
 
// update the task
if($task->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "Updated Successfully","document"=> ""));
}
 
// if unable to update the task, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update task","document"=> ""));
    
}
}
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to update task. Data is incomplete.","document"=> ""));
}
?>
