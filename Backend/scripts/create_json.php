<?php
/*
 * this script should run daily short after midnight to create a data.json out of database for daily tasks
 */

// create db connection
include "../api/config/database.php";
$database = new Database();
$db = $database->getConnection();

include "classes.php";

// get all relevant tasks
$task_result = $db->prepare("SELECT  * FROM task");
$task_result->execute();

$json['tasks'] = array();

// foreach task
while($task = $task_result->fetch())
{
    $t = new Task();
    $t->name = $task['name'];
    $t->duedate = $task['duedate'];
    $t->jobs = array();

    // get all jobs of task
    $job_result = $db->prepare("SELECT * FROM job WHERE id in (SELECT job_id FROM task_job WHERE task_id = " . $task['id'] . ")");
    $job_result->execute();

    // foreach job
    while($job = $job_result->fetch())
    {
        $j = new Job();
        $j->name = $job['name'];
        $j->type = $job['type'];
        $j->text = $job['text'];

        $t->jobs[] = $j;
    }

    $json['tasks'][] = $t;
}

// save json
$fp = fopen('../data.json', 'w');
fwrite($fp, json_encode($json));
fclose($fp);