<?php
/*
 * this script should run daily short after midnight to create a data.json out of database for daily tasks
 */

// create db connection
include "../api/config/database.php";
$database = new Database();
$db = $database->getConnection();

include "classes.php";

/*
 * creates a new dataset for one task run with all jobs
 * data_array:  resulting array of datasets
 * t: task to add (with all connected jobs)
 * time: time to create for this date
 * now: today datetime
 */
function createData(&$data_array, $t, $time, $now)
{
    foreach($t->jobs as $job)
    {
        $data = new Data();
        $data->task_id = $t->id;
        $data->task_name = $t->name;
        $data->job_id = $job->id;
        $data->job_name = $job->name;
        $data->text = $job->text;
        $data->time = $now->format("Y-m-d") . " " . $time;
        $data->type = $job->type;
        $data_array['data'][] = $data;
    }
}

/*
 * creates an array of times between time from startdate and enddate by mode
 * startdate: time to start
 * enddate: time to stop
 * mode: every 1, 2, or 3 hours
 * now: today datetime
 */
function createTimeArray($startdate, $enddate, $mode, $now)
{
    $time_array = array();

    // if enddate = now
    if($enddate->format("Y-m-d") == $now->format("Y-m-d"))
    {
        $workingtime = new DateTime($now->format("Y-m-d") . " " . $startdate->format("H:i:s"));
    
        do{
            $time_array[] = $workingtime->format("H:i:s");
            $workingtime->add(new DateInterval("PT" . $mode . "H"));
        }while($workingtime < $enddate);
    }
    // every standard case
    else
    {
        $workingtime = new DateTime($now->format("Y-m-d") . " " . $startdate->format("H:i:s"));
        $timeend = new Datetime($now->format("Y-m-d") . " " . $enddate->format("H:i:s"));
        
        do{
            $time_array[] = $workingtime->format("H:i:s");
            $workingtime->add(new DateInterval("PT" . $mode . "H"));
        }while($workingtime < $timeend);
    }

    return $time_array;
}

// get all relevant tasks
$task_result = $db->prepare("SELECT * FROM task");
$task_result->execute();

$data_array['data'] = array();
$now = new DateTime();

// foreach task
while($task = $task_result->fetch())
{
    $t = new Task();
    $t->id = $task['id'];
    $t->name = $task['name'];
    $t->startdate = $task['startdate'];
    $t->enddate = $task['enddate'];
    $t->date_recurrency = $task['date_recurrency'];
    $t->time_recurrency = $task['time_recurrency'];
    $t->jobs = array();

    // get all jobs of task
    $job_result = $db->prepare("SELECT * FROM job WHERE id in (SELECT job_id FROM task_job WHERE task_id = " . $task['id'] . ")");
    $job_result->execute();

    // foreach job
    while($job = $job_result->fetch())
    {
        $j = new Job();
        $j->id = $job['id'];
        $j->name = $job['name'];
        $j->type = $job['type'];
        $j->text = $job['text'];

        $t->jobs[] = $j;
    }

    // create tasks for today
    $startdate = new DateTime($t->startdate);
    $enddate = new DateTime($t->enddate);
    if( $now < $startdate || $now > $enddate )
    {
        continue;
    }

    /*
    date_recurrency
    0...exact day
    1...same day of week every week
    2...every day
    */
    switch($t->date_recurrency)
    {
        case 0: 
            if($now->format('Y-m-d') != $startdate->format('Y-m-d'))
            {
                continue;
            }
            break;
        case 1: 
            if($now->format('N') != $startdate->format('N')) 
            {
                continue; 
            }
            break;
    }

    /*
    time_recurrency
    0...exact time
    1...every hour from time
    2...every 2 hours from time
    3...every 3 hours from time
    */
    switch($t->time_recurrency)
    {
        case 0:
            $time = $startdate->format("H:i:s");
            createData($data_array, $t, $time, $now);
            break;
        case 1:
            $time_array = createTimeArray($startdate, $enddate, 1, $now);
            foreach($time_array as $time)
            {
                createData($data_array, $t, $time, $now);
            }
            break;
        case 2:
            $time_array = createTimeArray($startdate, $enddate, 2, $now);
            foreach($time_array as $time)
            {
                createData($data_array, $t, $time, $now);
            }
            break;
        case 3:
            $time_array = createTimeArray($startdate, $enddate, 3, $now);
            foreach($time_array as $time)
            {
                createData($data_array, $t, $time, $now);
            }
            break;
    }
}

// save to database
foreach($data_array['data'] as &$data)
{
    $stmt = $db->prepare("INSERT INTO data SET task_id=:task_id, task_name=:task_name, time=:time, job_id=:job_id, job_name=:job_name, text=:text, type=:type");
    $stmt->bindParam(":task_id", $data->task_id);
    $stmt->bindParam(":task_name", $data->task_name);
    $stmt->bindParam(":time", $data->time);
    $stmt->bindParam(":job_id", $data->job_id);
    $stmt->bindParam(":job_name", $data->job_name);
    $stmt->bindParam(":text", $data->text);
    $stmt->bindParam(":type", $data->type);
    if($stmt->execute())
    {
        $data->id=$db->lastInsertId();
    }
}
