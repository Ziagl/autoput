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
 
// instantiate data object
include_once '../objects/data.php';
 include_once '../token/validatetoken.php';
$database = new Database();
$db = $database->getConnection();
 
$data = new Data($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(!isEmpty($data->task_id)
&&!isEmpty($data->task_name)
&&!isEmpty($data->time)
&&!isEmpty($data->job_id)
&&!isEmpty($data->job_name)
&&!isEmpty($data->text)
&&!isEmpty($data->type)){
 
    // set data property values
	 
if(!isEmpty($data->task_id)) { 
$data->task_id = $data->task_id;
} else { 
$data->task_id = '';
}
if(!isEmpty($data->task_name)) { 
$data->task_name = $data->task_name;
} else { 
$data->task_name = '';
}
if(!isEmpty($data->time)) { 
$data->time = $data->time;
} else { 
$data->time = '';
}
if(!isEmpty($data->job_id)) { 
$data->job_id = $data->job_id;
} else { 
$data->job_id = '';
}
if(!isEmpty($data->job_name)) { 
$data->job_name = $data->job_name;
} else { 
$data->job_name = '';
}
if(!isEmpty($data->text)) { 
$data->text = $data->text;
} else { 
$data->text = '';
}
if(!isEmpty($data->type)) { 
$data->type = $data->type;
} else { 
$data->type = '';
}
$data->value = $data->value;
 	$lastInsertedId=$data->create();
    // create the data
    if($lastInsertedId!=0){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("status" => "success", "code" => 1,"message"=> "Created Successfully","document"=> $lastInsertedId));
    }
 
    // if unable to create the data, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
		echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create data","document"=> ""));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
	echo json_encode(array("status" => "error", "code" => 0,"message"=> "Unable to create data. Data is incomplete.","document"=> ""));
}
?>
