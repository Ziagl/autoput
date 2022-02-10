<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/helper.php';
include_once '../config/database.php';
include_once '../objects/user.php';
 include_once '../token/validatetoken.php';
// instantiate database and user object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));
$orAnd = isset($_GET['orAnd']) ? $_GET['orAnd'] : "OR";

$user->pageNo = isset($_GET['pageno']) ? $_GET['pageno'] : 1;
$user->no_of_records_per_page = isset($_GET['pagesize']) ? $_GET['pagesize'] : 30;

// query user
$stmt = $user->searchByColumn($data,$orAnd);

$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    //user array
    $user_arr=array();
	$user_arr["pageno"]=$user->pageNo;
	$user_arr["pagesize"]=$user->no_of_records_per_page;
    $user_arr["total_count"]=$user->search_record_count($data,$orAnd);
    $user_arr["records"]=array();
 
    // retrieve our table contents
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $user_item=array(
            
"id" => $id,
"username" => html_entity_decode($username),
"password" => html_entity_decode($password)
        );
 
        array_push($user_arr["records"], $user_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show user data in json format
	echo json_encode(array("status" => "success", "code" => 1,"message"=> "user found","document"=> $user_arr));
    
}else{
 // no user found will be here

    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no user found
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "No user found.","document"=> ""));
    
}
 


