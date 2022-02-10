<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/helper.php';
include_once '../config/database.php';
include_once '../objects/task_job.php';
 include_once '../token/validatetoken.php';
// instantiate database and task_job object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$task_job = new Task_Job($db);

$task_job->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$task_job->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;
$task_job->job_id = isset($_GET['job_id']) ? $_GET['job_id'] : die();
// read task_job will be here

// query task_job
$stmt = $task_job->readByjob_id();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //task_job array
    $task_job_arr=array();
	$task_job_arr["pageno"]=$task_job->pageNo;
	$task_job_arr["pagesize"]=$task_job->no_of_records_per_page;
    $task_job_arr["total_count"]=$task_job->total_record_count();
    $task_job_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $task_job_item=array(
            
"name" => html_entity_decode($name),
"task_id" => $task_id,
"name" => html_entity_decode($name),
"job_id" => $job_id
        );
 
        array_push($task_job_arr["records"], $task_job_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show task_job data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "task_job found","document"=> $task_job_arr));
    
}else{
 // no task_job found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no task_job found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No task_job found.","document"=> ""));
    
}
 


