<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/helper.php';
include_once '../config/database.php';
include_once '../objects/task.php';
 include_once '../token/validatetoken.php';
// instantiate database and task object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$task = new Task($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$task->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$task->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query task
$stmt = $task->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //task array
    $task_arr=array();
	$task_arr["pageno"]=$task->pageNo;
	$task_arr["pagesize"]=$task->no_of_records_per_page;
    $task_arr["total_count"]=$task->total_record_count();
    $task_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $task_item=array(
            
"id" => $id,
"name" => html_entity_decode($name),
"startdate" => $startdate,
"enddate" => $enddate,
"date_recurrency" => $date_recurrency,
"time_recurrency" => $time_recurrency
        );
 
        array_push($task_arr["records"], $task_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show task data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "task found","document"=> $task_arr));
    
}else{
 // no task found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no task found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No task found.","document"=> ""));
    
}
 


