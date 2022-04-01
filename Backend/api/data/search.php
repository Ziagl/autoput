<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/helper.php';
include_once '../config/database.php';
include_once '../objects/data.php';
 include_once '../token/validatetoken.php';
// instantiate database and data object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$data = new Data($db);

$searchKey = isset($_GET['key']) ? $_GET['key'] : die();
$data->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$data->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query data
$stmt = $data->search($searchKey);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //data array
    $data_arr=array();
	$data_arr["pageno"]=$data->pageNo;
	$data_arr["pagesize"]=$data->no_of_records_per_page;
    $data_arr["total_count"]=$data->total_record_count();
    $data_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $data_item=array(
            
"id" => $id,
"task_id" => $task_id,
"task_name" => $task_name,
"time" => $time,
"job_id" => $job_id,
"job_name" => $job_name,
"text" => $text,
"type" => $type,
"value" => $value
        );
 
        array_push($data_arr["records"], $data_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show data data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "data found","document"=> $data_arr));
    
}else{
 // no data found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no data found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No data found.","document"=> ""));
    
}
 


