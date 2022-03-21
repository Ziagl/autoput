<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
include_once '../config/helper.php';
include_once '../config/database.php';
include_once '../objects/task.php';
 include_once '../token/validatetoken.php';
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare task object
$task = new Task($db);
 
// set ID property of record to read
$task->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of task to be edited
$task->readOne();
 
if($task->id!=null){
    // create array
    $task_arr = array(
        
"id" => $task->id,
"name" => html_entity_decode($task->name),
"duedate" => $task->duedate,
"duetime" => $task->duetime,
"enddate" => $task->enddate,
"endtime" => $task->endtime,
"date_recurrency" => html_entity_decode($task->date_recurrency),
"time_recurrency" => html_entity_decode($task->time_recurrency)
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
   echo json_encode(array("status" => "success", "code" => 1,"message"=> "task found","document"=> $task_arr));
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user task does not exist
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "task does not exist.","document"=> ""));
}
?>
