<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/helper.php';
include_once '../config/database.php';
include_once '../objects/job.php';
 include_once '../token/validatetoken.php';
// instantiate database and job object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$job = new Job($db);

$data = json_decode(file_get_contents("php://input"));
$orAnd = isset($_GET['orAnd']) ? $_GET['orAnd'] : "OR";

$job->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$job->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query job
$stmt = $job->searchByColumn($data,$orAnd);

$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //job array
    $job_arr=array();
	$job_arr["pageno"]=$job->pageNo;
	$job_arr["pagesize"]=$job->no_of_records_per_page;
    $job_arr["total_count"]=$job->search_record_count($data,$orAnd);
    $job_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $job_item=array(
            
"id" => $id,
"name" => html_entity_decode($name),
"type" => $type,
"text" => $text
        );
 
        array_push($job_arr["records"], $job_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show job data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "job found","document"=> $job_arr));
    
}else{
 // no job found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no job found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No job found.","document"=> ""));
    
}
 


